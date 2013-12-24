class CreateItemConnections < ActiveRecord::Migration
  def self.up
    create_table :item_connections, :id => false do |t|
      t.integer :item_id
      t.boolean :up_connect,    :default => true, :null => false
      t.boolean :up_list,       :default => true, :null => false
      t.boolean :up_read,       :default => true, :null => false
      t.boolean :up_create,     :default => true, :null => false
      t.boolean :up_write,      :default => true, :null => false
      t.boolean :up_remove,     :default => true, :null => false
      
      t.references :connectable, :polymorphic => true
      t.timestamps
    end
  end

  def self.down
    drop_table :item_connections
  end
end
