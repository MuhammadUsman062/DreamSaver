pipeline {
    agent any
    environment {
        CLIENT_IMAGE = 'dreamsaver_client_image'
        CLIENT_CONTAINER = 'client_container'
        GITHUB_REPO = 'https://github.com/MuhammadUsman062/DreamSaver.git'
        TEST_REPO = 'https://github.com/YourGitHubUser/SeleniumTests.git' 
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/MuhammadUsman062/DreamSaver.git'
            }
        }

        stage('Build Client Image') {
            steps {
                // Build Docker image for the frontend
                sh "docker build -t 'dreamsaver_client_image' ."
            }
        }

        stage('Run Client Container') {
            steps {
                script {
                    // Stop and remove existing container if it exists
                    sh """
                        docker rm -f 'https://github.com/MuhammadUsman062/DreamSaver.git' || true
                    """
                    // Run the frontend container
                    sh """
                        docker run -d -p 3000:3000 --name 'https://github.com/MuhammadUsman062/DreamSaver.git' 'dreamsaver_client_image'
                    """
                    // Verify the container is running
                    sh """
                        docker ps | grep 'client_container' || (echo 'Container not running' && exit 1)
                    """
                }
            }
        }

        // stage('Run Selenium Tests') {
        //     steps {
        //         script {
        //             // Clone the Selenium test repository
        //             git branch: 'main', url: env.TEST_REPO

        //             // Install required Python dependencies
        //             sh 'pip3 install -r requirements.txt'

        //             // Run Selenium tests using Python
        //             sh 'python3 test_home_page.py'
        //             sh 'python3 test_button_presence.py'
        //         }
        //     }
        // }

        stage('Verify Access') {
            steps {
                script {
                    sh """
                        netstat -tuln | grep -q ':3000' || (echo 'Port 3000 not open' && exit 1)
                    """
                    echo "Client application should be accessible at: http://<EC2-public-IP>:3000"
                }
            }
        }
    }
}
