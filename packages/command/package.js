Package.describe({
  name: 'kozette:command',
  version: '0.1.0',
  summary: 'A package handling the command in Kozette',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('kozette:base');

  api.addFiles('lib/modules/kozette.public.command.init.js', ['client', 'server']);
  api.addFiles('lib/modules/kozette.public.command.extend.js', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('kozette:command');
});
