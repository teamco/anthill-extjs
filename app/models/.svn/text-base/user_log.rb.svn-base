class UserLog < ActiveRecord::Base
  belongs_to  :user
  has_one     :error_log

  def self.list(opts)
    log_map = []
    start   = (opts[:start]||0).to_i
    size    = (opts[:limit]||25).to_i
    page    = ((start/size).to_i)+1
    sort    = "#{opts[:sort]} #{opts[:dir]}"
    sort    = sort.strip.length>0 ? sort : 'created_at DESC'
    logs    = UserLog.paginate :page => page, :per_page => size, :order => sort

    logs.each do |x|
      log_map << {
        :id               => x.id,
        :user_id          => x.user.try(:login),
        :remote_addr      => x.remote_addr,
        :session_id       => x.session_id,
        :status           => x.status,
        :method           => x.method,
        :controller       => x.controller,
        :action           => x.action,
        :language         => x.language,
        :item_id          => x.item_id,
        :domain           => x.domain,
        :request_uri      => x.request_uri,
        :url              => x.url,
        :protocol         => x.protocol,
        :host             => x.host,
        :port             => x.port,
        :user_params      => Item.json_pre(x.user_params),
        :user_session     => Item.json_pre(x.user_session),
        :query_string     => x.query_string,
        :http_accept      => x.http_accept,
        :format           => Item.json_pre(x.format),
        :ssl              => x.ssl,
        :xhr              => x.xhr,
        :referer          => x.referer,
        :http_user_agent  => x.http_user_agent,
        :server_software  => x.server_software,
        :content_type     => x.content_type,
        :created_at       => x.updated_at.strftime("%Y %b %d"),
        :updated_at       => x.updated_at.strftime("%Y %b %d %I:%M:%S %p"),
      }
    end unless logs.empty?
    {
      :list  => Item.sort(log_map, opts),
      :total => logs.total_entries,
      :item  => Item.find_by_id(opts[:id])
    }
  end

  def self.except(opts={})
    log_except = [
      {:controller => 'user_logs', :action => 'list'},
      {:controller => 'error_logs',:action => 'list'},
      {:controller => 'error_logs',:action => 'handler'}
    ]    
    log_except.each do |x|
      return false if (x[:action] == opts[:action] || opts[:action].nil?) if (x[:controller] == opts[:controller])
    end || true
  end

end