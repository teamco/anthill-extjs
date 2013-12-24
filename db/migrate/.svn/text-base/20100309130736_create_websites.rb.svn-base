class CreateWebsites < ActiveRecord::Migration
  def self.up
    create_table :websites do |t|
      t.integer :item_id
      t.string  :domain_name
      t.string  :domain_ip
    end
  end

  def self.down
    drop_table :websites
  end
end
