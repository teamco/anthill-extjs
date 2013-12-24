class Admin::UsersController < AdminController

  def list
    data = grid_reader({
      :data   => User.list(params),
      :extend => {:expander => false},
      :fields => [
        {:id => 'login', :type => 'string'}
      ]
    })
    render_xhr(data)
  end
end