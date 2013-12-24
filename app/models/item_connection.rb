class ItemConnection < ActiveRecord::Base
  belongs_to :connectable, :polymorphic => true
end
