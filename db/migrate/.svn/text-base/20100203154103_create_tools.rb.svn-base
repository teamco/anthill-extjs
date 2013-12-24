class CreateTools < ActiveRecord::Migration
  def self.up
    create_table :tools do |t|
      t.integer :item_id
      t.string  :tool_type, :default => 'items'
    end
  end

  def self.down
    drop_table :tools
  end
end
