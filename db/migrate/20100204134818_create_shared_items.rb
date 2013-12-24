class CreateSharedItems < ActiveRecord::Migration
  def self.up
    create_table :shared_items do |t|
      t.string     :title
      t.text       :description
      t.text       :meta_description
      t.text       :meta_keywords

      t.references :shareable, :polymorphic => true
    end
  end

  def self.down
    drop_table :shared_items
  end
end
