pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    environment {
        DOCKER_IMAGE = 'DreamSaver'
        GITHUB_REPO = 'https://github.com/MuhammadUsman062/DreamSaver.git'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: env.GITHUB_REPO
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}", ".")
                }
            }
        }
        stage('Verify Docker') {
            steps {
                sh 'docker --version'
            }
        }
        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name dreamsaver_container DreamSaver'
            }
        }
    }
}
