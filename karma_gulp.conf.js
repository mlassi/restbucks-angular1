
module.exports = function () {
    return {
        frameworks: ['jasmine'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-ui-router/build/angular-ui-router.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-bootstrap/ui-bootstrap-tpls.js',
            'application/app.js',
            'application/home/homeModule.js',
            'application/**/*.js'
        ],
        autoWatch: true,
        browsers: ['Chrome']
    };
};
