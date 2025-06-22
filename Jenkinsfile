// Jenkinsfile
pipeline {
    agent any // or setup directly agent: agent { label 'your-node-agent' }

    environment {
        NODE_VERSION = 'NodeJS_22'
        // variable for Playwright path
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\browsers"
    }
//a
    // Trigger configuration for GitHub webhooks
    triggers {
        githubPush()
    }
    tools {
        nodejs 'NodeJS_22'
    }

    stages {
        stage('Checkout Code...') {
            steps {
                checkout scm // Checkout code from repository
            }
        }

        stage('Install Dependencies...') {
            steps {
                bat '''
                    npm install
                    npm install --save-dev @cucumber/cucumber
                    echo "📦 Node.js version:"
                    node -v
                    echo "📦 NPM version:"
                    npm -v
                '''
            }
        }
        
        stage('Install Playwright Browsers...') {
            steps {
                bat '''
                    echo "Setting up Playwright browsers path..."
                    if not exist "%PLAYWRIGHT_BROWSERS_PATH%" mkdir "%PLAYWRIGHT_BROWSERS_PATH%"
                    
                    echo "Installing Playwright browsers..."
                    npx playwright install chromium
                    
                    echo "Verifying installation..."
                    npx playwright install-deps
                    
                    echo "Listing browser directory..."
                    dir "%PLAYWRIGHT_BROWSERS_PATH%" /s
                '''
            }
        }
        stage('Running Cucumber tests...') {
            steps {
                bat '''
                    npx cucumber-js
                '''
            }      
        }

    }
    post {
        always {
            // Send email notification
            mail (
                to: "td.baoquyen@gmail.com",
                subject: "SGW_CUCUMBER - Test Results : ${currentBuild.result}",
                body: """
                    Build Status: ${currentBuild.result}
                    Job: ${JOB_NAME} - #${BUILD_NUMBER}
                    Build URL: ${env.BUILD_URL}
                    Duration: ${currentBuild.durationString}
                    ${currentBuild.result == 'FAILURE' ? 'Test Failed! Please check the logs.' : ''}
                """,
                cc: '',
                bcc: '',
                from: '',
                replyTo: ''
            )
            
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Pipeline execution SUCCESS!'
        }
        
        failure {
            echo 'Pipeline execution FAILED!'
        }
    }
}