AnthillRails3::Application.routes.draw do

  namespace :admin do
    root :to => "login#signin", :lang => :us

    match '/login(/signin)/us'                => 'login#signin'
    match '/login/signout/:lang'              => 'login#signout'
    match '/languages/:action/:lang(/:id)'    => 'languages#:action'
    match '/error_logs/:action/:lang(/:id)'   => 'error_logs#:action'
    match '/user_logs/:action/:lang(/:id)'    => 'user_logs#:action'
    match '/tools/:action/:lang(/:id)'        => 'tools#:action'
    match '/categories/:action/:lang(/:id)'   => 'categories#:action'
    match '/users/:action/:lang(/:id)'        => 'users#:action'
    match '/user_groups/:action/:lang(/:id)'  => 'user_groups#:action'
    match '/websites/:action/:lang(/:id)'     => 'websites#:action'

  end

  
end
