class CreateItems < ActiveRecord::Migration
  def self.up
    create_table  :items do |t|
      t.integer   :parent_id
      t.integer   :lft
      t.integer   :rgt

      t.integer   :language_id
      t.integer   :tool_id
      t.integer   :user_id
      t.integer   :lock_id
      t.integer   :website_id
    end
  end

  def self.down
    drop_table :items
  end
end
