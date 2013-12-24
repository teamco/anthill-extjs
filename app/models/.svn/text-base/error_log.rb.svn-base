class ErrorLog < ActiveRecord::Base
  belongs_to  :user_log

  def self.list(opts)
    start = (opts[:start]||0).to_i
    size  = (opts[:limit]||25).to_i
    page  = ((start/size).to_i)+1
    sort  = "#{opts[:sort]} #{opts[:dir]}"
    sort  = sort.strip.length>0 ? sort : 'created_at DESC'

    logs    = ErrorLog.paginate :page => page, :per_page => size, :order => sort
    log_map = []
    logs.each do |x|
      log_map << {
        :id         => x.id,
        :type       => x.error_type,
        :status     => x.error_status,
        :title      => x.error_title,
        :body       => x.error_body,
        :is_fixed   => x.is_fixed,
        :created_at => x.updated_at.strftime("%Y %b %d"),
        :updated_at => x.updated_at.strftime("%Y %b %d %I:%M:%S %p"),
      }
    end unless logs.empty?
    {
      :list  => Item.sort(log_map, opts),
      :total => logs.total_entries,
      :item  => Item.find_by_id(opts[:id])
    }
  end

  def self.buttons
    [
      {
        :text     => 'Show log',
        :iconCls  => 'icon-log',
        :tooltip  => {
          :title  => self.to_s.titleize,
          :text   => 'Show log are associated to selected error'
        },
        :disabled => true,
        :multiple => false,
        :id       => 'show_user_log',
        :handler  => 'showUserLog',
        :type     => 'button'
      },
      {
        :text     => 'Un/Fix error',
        :iconCls  => 'icon-fix',
        :tooltip  => {
          :title  => self.to_s.titleize,
          :text   => 'Un/Fix selected error(s)'
        },
        :disabled => true,
        :multiple => true,
        :id       => 'fix_error',
        :handler  => 'errorFix',
        :type     => 'button'
      }
    ]
  end

end
