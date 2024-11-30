pipeline {
    agent {
        docker {
            image 'node:18'
        }
    }
    environment {
        DOCKER_IMAGE = 'DreamSaver'
        GITHUB_REPO = 'https://github.com/MuhammadUsman062/DreamSaver.git'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: "https://github.com/MuhammadUsman062/DreamSaver.git"
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("DreamSaver")
                }
            }
        }
        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 DreamSaver'
            }
        }
    }
}
