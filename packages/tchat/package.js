Package.describe({
  name: 'kozette:tchat',
  version: '0.1.0',
  summary: 'A package handling the tchat part of Kozette',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('kozette:base');
  api.use('kozette:command');

  api.addFiles('lib/collections/messages.collections.js', ['client', 'server']);
  api.addFiles('lib/collections/messages_pinned.collections.js', ['client', 'server']);

  api.addFiles('lib/publications/tchat.publications.js', 'server');
  api.addFiles('lib/collections/messages.collections.methods.js', 'server');
  api.addFiles('lib/collections/messages_pinned.collections.methods.js', 'server');

  api.addFiles('lib/templates/main.html', 'client');
  api.addFiles('lib/styles/styles.css', 'client');
  api.addFiles('lib/templates/messages/messages.template.html', 'client');
  api.addFiles('lib/templates/messages/messages.template.js', 'client');
  api.addFiles('lib/templates/messages/type/message_basic.html', 'client');
  api.addFiles('lib/templates/messages/type/message_basic.js', 'client');
  api.addFiles('lib/templates/messages/type/message_info.html', 'client');
  api.addFiles('lib/templates/messages/type/message_info.js', 'client');
  api.addFiles('lib/templates/messages/type/message_status.html', 'client');
  api.addFiles('lib/templates/messages/type/message_status.js', 'client');
  api.addFiles('lib/templates/messages/type/message_pinned.html', 'client');
  api.addFiles('lib/templates/messages/type/message_pinned.js', 'client');
  api.addFiles('lib/templates/send/send.template.html', 'client');
  api.addFiles('lib/templates/send/send.template.js', 'client');
  api.addFiles('lib/templates/users/users.template.html', 'client');
  api.addFiles('lib/templates/users/users.template.js', 'client');
  api.addFiles('lib/templates/menu/menu.template.html', 'client');
  api.addFiles('lib/templates/menu/menu.template.js', 'client');
  api.addFiles('lib/templates/help/help.template.html', 'client');
  api.addFiles('lib/templates/help/help.template.js', 'client');
  api.addFiles('lib/external/buzz.min.js', 'client');

  api.export(['Messages', 'Message'], ['client', 'server']);
  api.export(['MessagesPinned', 'MessagePinned'], ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('kozette:tchat');
});
