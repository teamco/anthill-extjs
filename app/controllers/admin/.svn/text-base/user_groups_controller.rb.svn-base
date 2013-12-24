class Admin::UserGroupsController < AdminController

  def list
    data = grid_reader({:data => Item.list(params)})
    render_xhr(data)
  end
end
