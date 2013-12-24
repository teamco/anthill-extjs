class Tool < ActiveRecord::Base
  belongs_to  :item
  has_many    :item_connections,  :as => :connectable

  def self.group_ids(type)
    self.find_by_tool_type(type).item.child_ids
  end

  def self.get_tool_groups(type)
    group_map = []
    groups    = Item.find(self.group_ids(type))
    groups.each do |x|
      group_map << {
        :name       => x.get_title,
        :id         => x.id,
        :controller => x.self_controller,
        :nodes      => x.get_tools
      }
    end unless groups.nil?
    {:get => group_map}
  end

  def self.list(opts)
    tool_map = []
    unless opts[:id].nil?
      parent = Item.find_by_id(opts[:id])
      parent.self_and_childrens.each do |x|
        tool_map << {
          :controller  => x.tool_type,
          :description => x.get_description
        }.merge(x.default_list)
      end unless parent.nil?
    end
    {
      :list => Item.sort(tool_map, opts),
      :item => parent
    }    
  end

end
