class CreateProperties < ActiveRecord::Migration
  def self.up
    create_table :properties do |t|
      t.boolean    :visible,     :default => true
      t.boolean    :active,      :default => true
      t.boolean    :published,   :default => true

      t.references :propertable, :polymorphic => true
      t.timestamps
    end
  end

  def self.down
    drop_table :properties
  end
end
