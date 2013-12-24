class Admin::WebsitesController < AdminController

  def list
    data = grid_reader({
      :data   => Website.list(params),
      :extend => {:expander => false},
      :fields => [
        {:id => 'ip',     :type => 'string'},
        {:id => 'domain', :type => 'string'}
      ]
    })
    render_xhr(data)
  end
end
