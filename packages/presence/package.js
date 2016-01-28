Package.describe({
  name: 'kozette:presence',
  version: '0.1.0',
  summary: 'A package handling the user presence in Kozette',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('kozette:base');

  api.use('differential:event-hooks');

  api.addFiles('lib/modules/presence.init.js', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('kozette:presence');
});
