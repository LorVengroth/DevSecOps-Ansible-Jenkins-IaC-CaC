pipeline {
    agent any

    parameters {
        booleanParam(
            name: 'RUN_TEST',
            defaultValue: true,
            description: 'Check to run tests for Product UI and Product API before building Docker images'
        )
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/LorVengroth/DevSecOps-Ansible-Jenkins-IaC-CaC.git'
            }
        }

        stage('Run Test') {
            when {
                expression { return params.RUN_TEST == true }
            }
            steps {
                script {
                    echo 'Running tests for Product UI and Product API...'
                 
                    sh '''
                        docker run \
                            --rm \
                            -v "$PWD/product-ui":/app \
                            -w /app \
                            node:20-alpine \
                            sh -c "npm install && npm test --if-present"
                    '''

            
                  sh '''
                        docker run \
                            --rm \
                            -v "$PWD/product-api":/app \
                            -w /app \
                            eclipse-temurin:21-jdk-alpine \
                            sh -c "chmod +x gradlew && ./gradlew test"
                    '''
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t product-ui:latest ./product-ui
                    docker build -t product-api:latest ./product-api
                '''
            }
        }

        stage('Docker Container') {
            steps {
                sh '''
                   
                    docker stop product-ui-container product-api-container || true
                    docker rm product-ui-container product-api-container || true

                   
                    docker run -d --name product-api-container -p 8081:8080 product-api:latest

                
                    docker run -d --name product-ui-container -p 3000:80 product-ui:latest
                '''
            }
        }
    }
}