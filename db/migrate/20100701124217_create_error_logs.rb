class CreateErrorLogs < ActiveRecord::Migration
  def self.up
    create_table :error_logs do |t|
      t.integer     :user_log_id
      t.string      :error_type
      t.integer     :error_status
      t.string      :error_title
      t.text        :error_body,  :limit   => 1048576
      t.boolean     :is_fixed,    :default => false
      t.timestamps
    end
  end

  def self.down
    drop_table :error_logs
  end
end
