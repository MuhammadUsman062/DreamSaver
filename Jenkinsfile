pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock'  // Mount Docker socket
        }
    }
    environment {
        DOCKER_IMAGE = 'dreamsaver_image'  // Use lowercase name as Docker requires
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
                sh 'docker --version'  // Ensure Docker is available
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}", "-f ./Dockerfile .")
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // Stop and remove existing container if it exists
                    sh """
                        if docker ps -a --filter "name=${CONTAINER_NAME}" | grep -q ${CONTAINER_NAME}; then
                            docker stop ${CONTAINER_NAME}
                            docker rm ${CONTAINER_NAME}
                        fi
                    """

                    // Run the container
                    sh "docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}"

                    // Verify container is running
                    sh """
                        if ! docker ps --filter "name=${CONTAINER_NAME}" | grep -q ${CONTAINER_NAME}; then
                            echo "Container failed to start. Showing logs:"
                            docker logs ${CONTAINER_NAME}
                            exit 1
                        fi
                    """
                }
            }
        }

        stage('Verify Access') {
            steps {
                script {
                    // Validate port is open
                    sh """
                        if ! sudo netstat -tuln | grep -q ':3000'; then
                            echo "Port 3000 is not open. Check container and firewall settings."
                            exit 1
                        fi
                    """
                    echo "Web application should be accessible at http://<EC2-public-IP>:3000"
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    sh "docker rmi ${DOCKER_IMAGE} || true"  // Clean up image if needed
                }
            }
        }
    }
}
