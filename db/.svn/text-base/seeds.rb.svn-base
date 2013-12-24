parent_tool = Item.new
parent_tool.properties.build
parent_tool.build_tool({:tool_type => 'tools'})
parent_tool.shared_items.build({:title=>'Tools configuration'})
parent_tool.save!

category_tool = Item.new
category_tool.properties.build
category_tool.build_tool({:tool_type => 'categories'})
category_tool.shared_items.build({:title=>'Tool groups'})
category_tool.save!
category_tool.move_to_child_of(parent_tool)

system_group = Item.new
system_group.properties.build
system_group.shared_items.build({:title=>'System'})
system_group.save!
system_group.move_to_child_of(category_tool)
parent_tool.item_connections.create!({:item_id => system_group.id})
category_tool.item_connections.create!({:item_id => system_group.id})

control_panel_group = Item.new
control_panel_group.properties.build
control_panel_group.shared_items.build({:title=>'Control Panel'})
control_panel_group.save!
control_panel_group.move_to_child_of(category_tool)

log_group = Item.new
log_group.properties.build
log_group.shared_items.build({:title=>'System Log'})
log_group.save!
log_group.move_to_child_of(category_tool)

data_group = Item.new
data_group.properties.build
data_group.shared_items.build({:title=>'Data Tools'})
data_group.save!
data_group.move_to_child_of(category_tool)

user_tool = Item.new
user_tool.properties.build
user_tool.build_tool({:tool_type => 'users'})
user_tool.shared_items.build({:title=>'Users'})
user_tool.save!
user_tool.move_to_child_of(parent_tool)
user_tool.item_connections.create!({:item_id => system_group.id})

lang_tool = Item.new
lang_tool.properties.build
lang_tool.build_tool({:tool_type => 'languages'})
lang_tool.shared_items.build({:title=>'Languages'})
lang_tool.save!
lang_tool.move_to_child_of(parent_tool)
lang_tool.item_connections.create!({:item_id => control_panel_group.id})

site_tool = Item.new
site_tool.properties.build
site_tool.build_tool({:tool_type => 'websites'})
site_tool.shared_items.build({:title=>'Websites'})
site_tool.save!
site_tool.move_to_child_of(parent_tool)
site_tool.item_connections.create!({:item_id => control_panel_group.id})

user_group = Item.new
user_group.properties.build
user_group.build_tool({:tool_type => 'user_groups'})
user_group.shared_items.build({:title => 'User groups'})
user_group.save!
user_group.move_to_child_of(system_group)
user_group.item_connections.create!({:item_id => system_group.id})

log_tool = Item.new
log_tool.properties.build
log_tool.build_tool({:tool_type => 'user_logs'})
log_tool.shared_items.build({:title=>'User Logs'})
log_tool.save!
log_tool.move_to_child_of(parent_tool)
log_tool.item_connections.create!({:item_id => log_group.id})

error_tool = Item.new
error_tool.properties.build
error_tool.build_tool({:tool_type => 'error_logs'})
error_tool.shared_items.build({:title=>'Error Logs'})
error_tool.save!
error_tool.move_to_child_of(parent_tool)
error_tool.item_connections.create!({:item_id => log_group.id})

admin_group = Item.new
admin_group.properties.build
admin_group.shared_items.build({:title => 'Administrators'})
admin_group.save!
admin_group.move_to_child_of(user_group)

root = Item.new
root.properties.build
root.build_user({:login=>'admin'})
root.shared_items.build({:title => 'Admin'})
root.save!
root.move_to_child_of(user_tool)

lang = Item.new
lang.properties.build
lang.build_language({:lang_dialect => "en-US", :short_name => "us", :lang_default => true})
lang.shared_items.build({:title => 'English-US'})
lang.save!
lang.move_to_child_of(lang_tool)

site = Item.new
site.properties.build
site.build_website({:domain_name => 'localhost', :domain_ip => '127.0.0.1'})
site.shared_items.build({:title => 'Localhost'})
site.save!
site.move_to_child_of(site_tool)

root.item_connections.create!({:item_id => admin_group.id})
root.item_connections.create!({:item_id => user_group.id})
root.item_connections.create!({:item_id => category_tool.id})
root.item_connections.create!({:item_id => site_tool.id})
root.item_connections.create!({:item_id => lang_tool.id})
root.item_connections.create!({:item_id => user_tool.id})
root.item_connections.create!({:item_id => parent_tool.id})
root.item_connections.create!({:item_id => root.id})
root.item_connections.create!({:item_id => lang.id})
root.item_connections.create!({:item_id => site.id})
root.item_connections.create!({:item_id => system_group.id})
root.item_connections.create!({:item_id => data_group.id})
root.item_connections.create!({:item_id => control_panel_group.id})
root.item_connections.create!({:item_id => log_tool.id})
root.item_connections.create!({:item_id => error_tool.id})
root.item_connections.create!({:item_id => log_group.id})

admin_group.item_connections.create!({:item_id => admin_group.id})
admin_group.item_connections.create!({:item_id => user_group.id})
admin_group.item_connections.create!({:item_id => category_tool.id})
admin_group.item_connections.create!({:item_id => site_tool.id})
admin_group.item_connections.create!({:item_id => lang_tool.id})
admin_group.item_connections.create!({:item_id => user_tool.id})
admin_group.item_connections.create!({:item_id => parent_tool.id})
admin_group.item_connections.create!({:item_id => root.id})
admin_group.item_connections.create!({:item_id => lang.id})
admin_group.item_connections.create!({:item_id => site.id})
admin_group.item_connections.create!({:item_id => system_group.id})
admin_group.item_connections.create!({:item_id => data_group.id})
admin_group.item_connections.create!({:item_id => control_panel_group.id})
admin_group.item_connections.create!({:item_id => log_tool.id})
admin_group.item_connections.create!({:item_id => error_tool.id})
admin_group.item_connections.create!({:item_id => log_group.id})

lang_id = lang.language.id
user_id = root.user.id
site_id = site.website.id

parent_tool_id = parent_tool.tool.item_id
user_tool_id = user_tool.tool.item_id
lang_tool_id = lang_tool.tool.item_id
site_tool_id = site_tool.tool.item_id
category_tool_id = category_tool.tool.item_id

parent_tool.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => parent_tool_id, :website_id => site_id})
user_tool.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => parent_tool_id, :website_id => site_id})
lang_tool.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => parent_tool_id, :website_id => site_id})
category_tool.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => parent_tool_id, :website_id => site_id})
site_tool.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => parent_tool_id, :website_id => site_id})
log_tool.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => parent_tool_id, :website_id => site_id})
error_tool.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => parent_tool_id, :website_id => site_id})

admin_group.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => parent_tool_id, :website_id => site_id})
user_group.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => parent_tool_id, :website_id => site_id})

root.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => user_tool_id, :website_id => site_id})
lang.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => lang_tool_id, :website_id => site_id})
site.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => site_tool_id, :website_id => site_id})

system_group.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => category_tool_id, :website_id => site_id})
data_group.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => category_tool_id, :website_id => site_id})
log_group.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => category_tool_id, :website_id => site_id})
control_panel_group.update_attributes({:language_id => lang_id, :user_id => user_id, :tool_id => category_tool_id, :website_id => site_id})