// Jenkinsfile
pipeline {
    agent any // Hoặc chỉ định một label cho một agent cụ thể: agent { label 'your-node-agent' }

    environment {
        NODE_VERSION = 'NodeJS_22'
                // Đặt biến môi trường cho Playwright
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\browsers"
    }

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
                    npx playwright install --with-deps chromium
                    npm install --save-dev @cucumber/cucumber
                    echo "📦 Node.js version:"
                    node -v
                    echo "📦 NPM version:"
                    npm -v
                    echo "📦 Cucumber version:"
                    npx cucumber-js --version
                '''
            }
        }
        stage('Run Tests...') {
            steps {
                powershell '''
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