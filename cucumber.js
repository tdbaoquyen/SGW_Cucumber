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
            'progress-bar',
            'html:test-results/cucumber-report.html',
            'json:test-results/cucumber-report.json',
            '@cucumber/pretty-formatter',
        ],
        requireModule: [
            'ts-node/register'
        ],
        parallel: 1,
        retry: 0,
        efaultNavigationTimeout: 60000,
        timeout: 10000, // Increase to 10 seconds per step
    }
};