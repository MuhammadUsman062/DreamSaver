pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock'  // Mount Docker socket for interaction with Docker
        }
    }
    environment {
        DOCKER_IMAGE = 'dreamsaver_image'  // Updated to a more generic image name
        CONTAINER_NAME = 'dreamsaver_container'
        GITHUB_REPO = 'https://github.com/MuhammadUsman062/DreamSaver.git'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: env.GITHUB_REPO
            }
        }
        stage('Verify Docker') {
            steps {
                sh 'docker --version'  // Verify Docker is available
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image with the name defined in the environment
                    // Ensure that the Dockerfile is at the root or specify the correct path
                    docker.build("${DOCKER_IMAGE}", ".")  // Assuming Dockerfile is in the root of the repository
                }
            }
        }
        
        stage('Run Container') {
            steps {
                script {
                    // Stop and remove the existing container if it exists
                    sh """
                        docker ps -a -q --filter "name=${CONTAINER_NAME}" | grep -q . && docker stop ${CONTAINER_NAME} && docker rm ${CONTAINER_NAME}
                    """
                    // Run the new container with the built image
                    sh "docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}"
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Optionally remove the image after the container is up and running
                    sh "docker rmi ${DOCKER_IMAGE} || true"  // Avoid errors if the image is not found
                }
            }
        }
    }
}
