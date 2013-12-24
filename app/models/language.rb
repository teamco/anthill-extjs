class Language < ActiveRecord::Base
  belongs_to  :item  
  has_many    :item_connections,  :as => :connectable

  def self.list(opts)
    lang_map = []
    unless opts[:id].nil?
      parent = Item.find_by_id(opts[:id])
      parent.children.each do |x|
        lang = x.language
        lang_map << {
          :lang_dialect => lang.lang_dialect,
          :short_name   => lang.short_name,
          :alignment    => lang.alignment.titleize,
          :direction    => lang.direction.upcase,
          :char_set     => lang.char_set.upcase,
          :default      => lang.lang_default
        }.merge(x.default_list)
      end unless parent.nil?
    end
    {
      :list => Item.sort(lang_map, opts),
      :item => parent
    }
  end

  def self.default_lang
    default_lang = Language.find_all_by_lang_default true
    logger.info " >>>>>> #{default_lang[0].item}"
    logger.info " >>>>>> #{default_lang[0].item}"
    default_lang[0] if default_lang[0].item.canbused? if default_lang.length == 1
  end

  def self.current_lang(name)
    current_lang = Language.find_by_short_name name
    current_lang if current_lang.item.canbused? unless current_lang.nil?
  end

end
