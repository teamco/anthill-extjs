class Admin::LanguagesController < AdminController

  def list
    data = grid_reader({
      :data   => Language.list(params),
      :fields => [
        {:id => 'short_name',   :type => 'string', :hidden => true},
        {:id => 'char_set',     :type => 'string'},
        {:id => 'lang_dialect', :type => 'string', :hidden => true},
        {:id => 'alignment',    :type => 'string', :hidden => true},
        {:id => 'direction',    :type => 'string', :hidden => true},
        {:id => 'default',      :type => 'boolean'}
      ]
    })
    render_xhr(data)
  end

  def check
    render_xhr(default_xhr)
  end
  
end
