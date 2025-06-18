// Jenkinsfile
pipeline {
    agent any // Hoặc chỉ định một label cho một agent cụ thể: agent { label 'your-node-agent' }

    tools {
        // Đảm bảo tên này khớp với tên cài đặt NodeJS đã cấu hình trong Manage Jenkins -> Tools
        nodejs 'NodeJS_22' // Hoặc phiên bản Node.js của bạn
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', // Thay thế 'main' bằng nhánh mục tiêu của bạn (e.g., 'master', 'develop')
                    credentialsId: 'Git-Token', // Xem Phần 4: Jenkins GitHub Credentials
                    url: 'https://github.com/tdbaoquyen/SGW_Cucumber.git' // Thay thế bằng URL kho lưu trữ của bạn
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install' // Cài đặt các phụ thuộc của dự án (bao gồm @playwright/test, @cucumber/cucumber, ts-node)
                sh 'npx playwright install --with-deps' // Cài đặt các trình duyệt Playwright và các phụ thuộc hệ thống
            }
        }

        stage('Run Cucumber Playwright Tests') {
            steps {
                // Sử dụng script 'cucumber-test' đã định nghĩa trong package.json
                sh 'npm test'
                // Hoặc nếu bạn chạy trực tiếp:
                // sh 'cucumber-js --require-module ts-node/register --require src/**/*.ts --format json:test-results/cucumber-report.json'
            }
        }
    }

    post {
        always {
            // Lưu trữ Báo cáo HTML Playwright (nếu vẫn tạo)
            mail (
                bcc: '', 
                body: '', 
                cc: '', 
                from: '', 
                replyTo: '', 
                subject: 'Jenkins build result', 
                to: 'td.baoquyen@gmail.com'
            )
        //     script {
        //         // Kiểm tra xem thư mục báo cáo có tồn tại không trước khi xuất bản
        //         // Playwright có thể không tạo báo cáo HTML nếu chỉ chạy thông qua Cucumber
        //         // Nếu bạn muốn báo cáo HTML của Playwright, hãy đảm bảo lệnh 'npm test' được chạy song song hoặc Playwright được cấu hình để tạo HTML report khi chạy với Cucumber.
        //         if (fileExists('reports/playwright-report/index.html')) {
        //             publishHTML(target: [
        //                 allowMissing: false,
        //                 alwaysLinkToLastBuild: true,
        //                 keepAll: true,
        //                 reportDir: 'playwright-report',
        //                 reportFiles: 'index.html',
        //                 reportName: 'Playwright HTML Report'
        //             ])
        //         }
        //     }

        //     // Xuất bản Báo cáo Cucumber (Quan trọng!)
        //     // Đường dẫn này phải trỏ đến file JSON mà Cucumber đã tạo (ví dụ: cucumber-report.json)
        //     script {
        //         if (fileExists('reports/cucumber-report.html')) {
        //             cucumber 'reports/cucumber-report.json'
        //         } else {
        //             echo "Cucumber JSON report not found at reports/cucumber-report.json. Please check your Cucumber command."
        //         }
        //     }
        // }
        // success {
        //     // Gửi email khi build thành công
        //     script {
        //         emailext (
        //             to: 'td.baoquyen@gmail.com', // Email người nhận
        //             subject: "Jenkins Build SUCCESS: ${env.JOB_NAME} - #${env.BUILD_NUMBER}",
        //             body: """
        //                 <html>
        //                     <body>
        //                         <p>Build ${env.JOB_NAME} - #${env.BUILD_NUMBER} is completely SUCCESS!</p>
        //                         <p>Check Console Output: <a href="${env.BUILD_URL}console">Console Output</a></p>
        //                         <p>View Cucumber Report: <a href="${env.BUILD_URL}cucumber-html-reports/overview-features.html">Cucumber Report</a></p>
        //                         <p>View Playwright Report: <a href="${env.BUILD_URL}Playwright_HTML_Report">Playwright HTML Report</a></p>
        //                     </body>
        //                 </html>
        //             """,
        //         )
        //     }
            
        // }
        // failure {
        //     // Gửi email khi build thất bại
        //     script {
        //         emailext (
        //             to: 'td.baoquyen@gmail.com', // Email người nhận
        //             subject: "Jenkins Build UN-SUCCESSFUL: ${env.JOB_NAME} - #${env.BUILD_NUMBER}",
        //             body: """
        //                 <html>
        //                     <body>
        //                         <p>Build ${env.JOB_NAME} - #${env.BUILD_NUMBER} is UNSUCCESSFUL!</p>
        //                         <p>Check Console Output: <a href="${env.BUILD_URL}console">Console Output</a></p>
        //                         <p>View Cucumber Report: <a href="${env.BUILD_URL}cucumber-html-reports/overview-features.html">Cucumber Report</a></p>
        //                         <p>View Playwright Report: <a href="${env.BUILD_URL}Playwright_HTML_Report">Playwright HTML Report</a></p>
        //                     </body>
        //                 </html>
        //             """,
        //         )
        //     }
        // }
        // aborted {
        //      // Gửi email khi build bị hủy
        //      script {
        //         emailext (
        //             to: 'td.baoquyen@gmail.com',
        //             subject: "Jenkins Build IS CANCELED: ${env.JOB_NAME} - #${env.BUILD_NUMBER}",
        //             body: """
        //                 <html>
        //                     <body>
        //                         <p>Build ${env.JOB_NAME} - #${env.BUILD_NUMBER} is CANCELED!</p>
        //                         <p>Check Console Output: <a href="${env.BUILD_URL}console">Console Output</a></p>
        //                     </body>
        //                 </html>
        //             """,
        //         )
        //     }
        // }
    }
}