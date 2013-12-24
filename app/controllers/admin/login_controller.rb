class Admin::LoginController < AdminController

  def signin
    user_login unless request.get? 
  end

  def login_observer
    render_xhr(default_xhr)
  end

  def signout
    user_logout(params[:logout])
    render_xhr(default_xhr)
  end

end
