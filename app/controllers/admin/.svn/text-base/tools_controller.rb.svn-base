class Admin::ToolsController < AdminController

  def list
    expander = [
      {:id => 'description',  :type => 'string'}
    ]
    data = grid_reader({
      :data   => Tool.list(params),
      :extend => {
        :expander => true,
        :tpl      => grid_expander(expander)
      },
      :hidden => expander,
      :fields => [
        {:id => 'controller', :type => 'string'}
      ]
    })
    render_xhr(data)
  end
  
  def tool_groups
    data = Tool.get_tool_groups('categories')
    render_xhr(data)
  end

 end