
module.exports = function () {
    return {
        frameworks: ['jasmine'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-ui-router/build/angular-ui-router.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'application/app.js',
            'application/home/homeModule.js',
            'application/order/orderModule.js',
            'application/**/*.js'
        ],
        autoWatch: true,
        browsers: ['Chrome']
    };
};
