class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.integer :item_id
      t.string  :login
      t.string  :password, :null => false, :default => "1baea99324cd312afaaa65bcb7f1afbb11ac36321c5e199ea5de34267ade52db"
      t.string  :salt, :null => false, :default => "59d990e587275b38b2f9f2d9b2e214ddcb10a2d0e4ce83495b6a0d159f8fd317"
      t.string  :uid
      t.integer :timeout, :default => nil
    end
  end

  def self.down
    drop_table :users
  end
end
