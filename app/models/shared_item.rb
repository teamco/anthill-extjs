class SharedItem < ActiveRecord::Base
  belongs_to :shareable, :polymorphic => true
end
