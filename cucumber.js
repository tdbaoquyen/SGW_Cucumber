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
            'json:test-results/cucumber-report.json'
        ],
        requireModule: [
            'ts-node/register'
        ],
        parallel: 1
    }
};