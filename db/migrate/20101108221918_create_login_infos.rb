class CreateLoginInfos < ActiveRecord::Migration
  def self.up
    create_table :login_infos do |t|
      t.integer :user_id
      t.string  :user_agent
      t.string  :user_ip
      t.string  :user_session_id
      t.text    :data
      t.timestamps
    end
  end

  def self.down
    drop_table :login_infos
  end
end
