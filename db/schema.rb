# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20101108221918) do

  create_table "error_logs", :force => true do |t|
    t.integer  "user_log_id"
    t.string   "error_type"
    t.integer  "error_status"
    t.string   "error_title"
    t.text     "error_body",   :limit => 1048576
    t.boolean  "is_fixed",                        :default => false
    t.datetime "created_at",                                         :null => false
    t.datetime "updated_at",                                         :null => false
  end

  create_table "item_connections", :id => false, :force => true do |t|
    t.integer  "item_id"
    t.boolean  "up_connect",       :default => true, :null => false
    t.boolean  "up_list",          :default => true, :null => false
    t.boolean  "up_read",          :default => true, :null => false
    t.boolean  "up_create",        :default => true, :null => false
    t.boolean  "up_write",         :default => true, :null => false
    t.boolean  "up_remove",        :default => true, :null => false
    t.integer  "connectable_id"
    t.string   "connectable_type"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
  end

  create_table "items", :force => true do |t|
    t.integer "parent_id"
    t.integer "lft"
    t.integer "rgt"
    t.integer "language_id"
    t.integer "tool_id"
    t.integer "user_id"
    t.integer "lock_id"
    t.integer "website_id"
  end

  create_table "languages", :force => true do |t|
    t.integer "item_id"
    t.string  "lang_dialect"
    t.string  "short_name",   :limit => 2
    t.string  "alignment",    :limit => 20,  :default => "left"
    t.string  "direction",    :limit => 3,   :default => "ltr"
    t.string  "char_set",     :limit => 100, :default => "utf-8"
    t.boolean "lang_default",                :default => false
  end

  create_table "login_infos", :force => true do |t|
    t.integer  "user_id"
    t.string   "user_agent"
    t.string   "user_ip"
    t.string   "user_session_id"
    t.text     "data"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  create_table "properties", :force => true do |t|
    t.boolean  "visible",          :default => true
    t.boolean  "active",           :default => true
    t.boolean  "published",        :default => true
    t.integer  "propertable_id"
    t.string   "propertable_type"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
  end

  create_table "sessions", :force => true do |t|
    t.string   "session_id", :null => false
    t.text     "data"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "shared_items", :force => true do |t|
    t.string  "title"
    t.text    "description"
    t.text    "meta_description"
    t.text    "meta_keywords"
    t.integer "shareable_id"
    t.string  "shareable_type"
  end

  create_table "tools", :force => true do |t|
    t.integer "item_id"
    t.string  "tool_type", :default => "items"
  end

  create_table "user_logs", :force => true do |t|
    t.integer  "user_id"
    t.string   "remote_addr"
    t.string   "session_id"
    t.integer  "status"
    t.string   "method"
    t.string   "controller"
    t.string   "action"
    t.string   "language",        :limit => 2
    t.integer  "item_id"
    t.string   "domain"
    t.string   "request_uri"
    t.string   "url"
    t.string   "protocol"
    t.string   "host"
    t.string   "port"
    t.text     "user_params",     :limit => 1048576
    t.text     "user_session"
    t.string   "query_string"
    t.string   "http_accept"
    t.string   "format"
    t.boolean  "ssl"
    t.boolean  "xhr"
    t.string   "referer"
    t.string   "http_user_agent"
    t.string   "server_software"
    t.string   "content_type"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
  end

  create_table "users", :force => true do |t|
    t.integer "item_id"
    t.string  "login"
    t.string  "password", :default => "1baea99324cd312afaaa65bcb7f1afbb11ac36321c5e199ea5de34267ade52db", :null => false
    t.string  "salt",     :default => "59d990e587275b38b2f9f2d9b2e214ddcb10a2d0e4ce83495b6a0d159f8fd317", :null => false
    t.string  "uid"
    t.integer "timeout"
  end

  create_table "websites", :force => true do |t|
    t.integer "item_id"
    t.string  "domain_name"
    t.string  "domain_ip"
  end

end
