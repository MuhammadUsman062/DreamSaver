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
                sh "docker build -t dreamsaver_client_image ."
                 sh "docker run -d -p 3000:3000 dreamsaver_client_image"
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
            
    
    }
}
