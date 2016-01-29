Package.describe({
    name: 'kozette:base',
    version: '0.1.0',
    summary: 'A base package for Kozette',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');

    const packages = [
        'blaze-html-templates',
        'ecmascript',
        'mongo',
        'accounts-password',
        'accounts-ui',
        'check',
        'underscore',
        'force-ssl',
        'momentjs:moment',
        'jagi:astronomy',
        'jagi:astronomy-validators',
        'jagi:astronomy-timestamp-behavior',
        'semantic:ui',
        'flemay:less-autoprefixer'
    ];

    api.use(packages);
    api.imply(packages);

    api.addFiles('lib/modules/kozette.public.init.js', ['client', 'server']);
    api.addFiles('lib/external/linkify.min.js', 'client');
    api.addFiles('lib/external/linkify-html.min.js', 'client');
    api.addFiles('lib/external/linkify-jquery.min.js', 'client');

    api.export(['Kozette']);
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('kozette:base');
});
