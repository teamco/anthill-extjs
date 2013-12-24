class Website < ActiveRecord::Base
  belongs_to  :item
  has_many    :item_connections,  :as => :connectable

  def self.list(opts)
    user_map = []
    unless opts[:id].nil?
      parent = Item.find_by_id(opts[:id])
      parent.children.each do |x|
        site = x.website
        user_map << {
          :ip     => site.domain_ip,
          :domain => site.domain_name
        }.merge(x.default_list)
      end unless parent.nil?
    end
    {
      :list => Item.sort(user_map, opts),
      :item => parent
    }
  end
end
