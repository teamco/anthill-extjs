require 'digest/sha2'

class User < ActiveRecord::Base
  belongs_to  :item
  has_many    :user_logs
  has_many    :login_infos
  has_many    :item_connections,  :as => :connectable

  def self.list(opts)
    user_map = []
    unless opts[:id].nil?
      parent = Item.find_by_id(opts[:id])
      parent.children.each do |x|
        user_map << {
          :login => x.user.login
        }.merge(x.default_list)
      end unless parent.nil?
    end
    {
      :list => Item.sort(user_map, opts),
      :item => parent
    }
  end

  def self.generate_login_errors
    {
      :default => "Please retype the user name and password, or sign up if you haven't already done so",
      :access  => "User is not authorized to access this tool",
      :login   => "The user name or password is incorrect",
      :exist   => "User does not exist",
      :group   => "User does not connected to User Groups"
    }
  end

  def self.generate_uid(hash)
    user = self.find_user(hash)
    user.update_attribute(:uid, user.generate_password(rand(Time.now.to_i))) unless user.nil?
  end

  def self.set_login_info(opts)
    LoginInfo.create({
      :user_id          => self.find_by_item_id(opts[:item_id]).id,
      :user_session_id  => opts[:session_id],
      :user_agent       => opts[:user_agent],
      :user_ip          => opts[:user_ip],
      :data             => opts[:data]
    })
  end

  def self.loggedin?(user)
    user = User.find_by_item_id(user[:user_id])
    user.nil? ? false : user
  end

  def self.do_login(opts)
    login_error = User.generate_login_errors[:login]
    unless opts.nil?
      user = self.check_login(opts[:name])
      return user.check_password(opts[:password]) unless user.nil?
    end
    {:error => login_error}
  end

  def self.check_login(uname)
    login = uname.replace(CGI::escapeHTML(uname))
    self.find_by_login(login)
  end

  def self.find_user(user)
    User.find_by_item_id(user[:user_id]) unless user.nil?
  end

  def self.get_login(user)
    User.find_user(user).nil? ? nil : user
  end

  def generate_password(pwd)
    Digest::SHA2.hexdigest("#{self.salt}-#{pwd}")
  end

  def available_groups
    groups  = []
    info    = []
    ugroups = Tool.group_ids('user_groups')
    self.item.conn_to.each{|x| groups << x.connectable if ugroups.include?(x.connectable_id)}
    groups.delete_if{|x|!x.canbused?}.each do |x|
      info << {
        :name     => x.shared.title,
        :group_id => x.id
      }
    end
    info
  end

  def check_password(pwd)
    login_errors = User.generate_login_errors
    if self.generate_password(pwd) == self.password
      return self.user_data(login_errors)
    end
    {:error => login_errors[:login]}
  end

  def user_data(login_errors)
    unless self.item.nil?
      current_groups = self.available_groups
      unless current_groups.empty?
        return {
          :user_id    => self.item_id,
          :user_group => current_groups,
          :user_name  => self.login
        }
      else
        login_error = login_errors[:group]
      end
    else
      login_error = login_errors[:exist]
    end unless self.nil?
    {:error => login_error} unless login_error.nil?
  end
end