class LoginInfo < ActiveRecord::Base
  belongs_to :user

  def self.session_data(opts)
    self.find :first,
              :conditions => ['user_agent=? AND user_ip=?', opts.headers["HTTP_USER_AGENT"], opts.remote_ip],
              :order      => 'created_at DESC'
  end
end
