class Admin::ErrorLogsController < AdminController
  def list
    render_xhr(grid_info)
  end

  def handler
    begin
      log  = UserLog.find_by_session_id request.session_options[:id], :order => 'updated_at DESC'
      data = {
        :log   => log.error_log.nil?,
        :error => false
      }
      ErrorLog.create!({
        :user_log_id  => log.id,
        :error_type   => params[:type],
        :error_status => params[:status],
        :error_title  => params[:title],
        :error_body   => params[:body]
      }) if data[:log]
      render_xhr(data)
    rescue Exception => e
      render_xhr({
          :error => true,
          :name  => controller_name.titleize,
          :msg   => e.to_s
      })
    end
  end

  def fix
    JSON.parse(params[:data]).each do |x|
      log = ErrorLog.find_by_id(x['id'])
      log.update_attribute('is_fixed', !log.is_fixed)
    end unless params[:data].nil?
    render_xhr(grid_info)
  end

  private
  
  def grid_info
    expander = [
      {:id => 'body', :type => 'string', :header => 'Error Description'}
    ]
    data = grid_reader({
      :log     => true,
      :data    => ErrorLog.list(params),
      :buttons => ErrorLog.buttons,
      :extend  => {
        :expander => true,
        :tpl      => grid_expander(expander)
      },
      :group_by   => 'created_at',
#      :hidden => expander,
      :fields => [
        {:id => 'id',         :type => 'number',      :header => 'ID',            :width => 30},
        {:id => 'type',       :type => 'string',      :header => 'Type',          :width => 30},
        {:id => 'status',     :type => 'number',      :width  => 30},
        {:id => 'title',      :type => 'string',      :header => 'Error Message'},
        {:id => 'body',       :type => 'string',      :header => 'Error Description', :hidden => true},
        {:id => 'created_at', :type => 'datecolumn',  :hidden => true},
        {:id => 'updated_at', :type => 'datecolumn',  :header => 'Last Updated',  :width => 120},
        {:id => 'is_fixed',   :type => 'boolean',     :header => 'Fixed?',        :width => 25,     :renderer => 'renderIcon', :align => 'center'}
      ]
    })
    data
  end

end
