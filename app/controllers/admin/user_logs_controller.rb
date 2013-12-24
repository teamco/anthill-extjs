class Admin::UserLogsController < AdminController

  def list
    expander = [
      {:id => 'status',         :type => 'string'},
      {:id => 'domain',         :type => 'string'},
      {:id => 'method',         :type => 'string'},
      {:id => 'url',            :type => 'string'},
      {:id => 'user_params',    :type => 'string'},
      {:id => 'user_session',   :type => 'string'},
      {:id => 'query_string',   :type => 'string'},
      {:id => 'http_accept',    :type => 'string'},
      {:id => 'format',         :type => 'string'},
      {:id => 'ssl',            :type => 'boolean'},
      {:id => 'xhr',            :type => 'boolean'},
      {:id => 'referer',        :type => 'string'},
      {:id => 'http_user_agent',:type => 'string'},
      {:id => 'server_software',:type => 'string'},
      {:id => 'content_type',   :type => 'string'},
    ]
    data = grid_reader({
      :log    => true,
      :data   => UserLog.list(params),
      :extend => {
        :expander => true,
        :tpl      => grid_expander(expander)
      },
      :autoexpand => 'request_uri',
      :group_by   => 'created_at',
      :hidden => expander,
      :fields => [
        {:id => 'id',           :type => 'number',     :header => 'ID',           :width => 40},
        {:id => 'user_id',      :type => 'string',     :header => 'Author'},
        {:id => 'session_id',   :type => 'string',     :header => 'Session ID',   :width => 210},
        {:id => 'remote_addr',  :type => 'string',     :header => 'Remote IP',    :width => 70},
        {:id => 'request_uri',  :type => 'string',     :header => 'Request URI'},
        {:id => 'created_at',   :type => 'datecolumn', :hidden => true},
        {:id => 'updated_at',   :type => 'datecolumn', :header => 'Last Updated', :width => 120}
      ]
    })
    render_xhr(data)
  end

  def show
    data      = {}
    expander  = []
    error_log = ErrorLog.find_by_id(params[:id])
    unless error_log.nil?
      user_log = error_log.user_log
      unless user_log.nil?
        data = {
          :user_id          => user_log.user.try(:login),
          :session_id       => user_log.session_id,
          :status           => user_log.status,
          :updated_at       => user_log.updated_at.strftime("%Y %b %d %I:%M:%S %p"),
        }
        body = [
          {:id => 'remote_address',   :value => user_log.remote_addr},
          {:id => 'request_uri',      :value => user_log.request_uri},
          {:id => 'domain',           :value => user_log.domain},
          {:id => 'method',           :value => user_log.method},
          {:id => 'url',              :value => user_log.url},
          {:id => 'user_params',      :value => Item.json_pre(user_log.user_params)},
          {:id => 'user_session',     :value => Item.json_pre(user_log.user_session)},
          {:id => 'query_string',     :value => user_log.query_string},
          {:id => 'http_accept',      :value => user_log.http_accept},
          {:id => 'format',           :value => Item.json_pre(user_log.format)},
          {:id => 'ssl',              :value => user_log.ssl},
          {:id => 'xhr',              :value => user_log.xhr},
          {:id => 'referer',          :value => user_log.referer},
          {:id => 'http_user_agent',  :value => user_log.http_user_agent},
          {:id => 'server_software',  :value => user_log.server_software},
          {:id => 'content_type',     :value => user_log.content_type}
        ]
        body.each do |x|
          expander << "<li style='margin:5px 0'><span style=\"font-weight:bold\">#{x[:id].humanize}:</span> #{x[:value]}</li>"
        end
        data[:body] = "<ul style='padding:10px'>#{expander.join('')}</ul>"
      end
    end
    render_xhr({:data => data})
  end

end
