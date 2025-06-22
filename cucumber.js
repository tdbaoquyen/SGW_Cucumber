module.exports = {
    default: {
        paths:[
            "features/**/*.feature"
        ],
        require:[
            "features/step_definitions/*.ts",
            "src/configs/hooks.ts"
        ],
        formatOptions: {
            snippetInterface: "async-await"
        },
        format: [
            // 'progress-bar',
            'summary',
            'html:test-results/cucumber-report.html',
            'json:test-results/cucumber-report.json',
            '@cucumber/pretty-formatter',
        ],
        requireModule: [
            'ts-node/register'
        ],
        parallel: 1,
        retry: 0,
        defaultNavigationTimeout: 60000,
        timeout: 100000,
    }
};