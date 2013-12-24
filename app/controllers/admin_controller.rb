class AdminController < ApplicationController
  include CommonLib

  before_filter :check_language
  before_filter :authorize
  before_filter :update_user_log
  
  layout "admin"
  
end