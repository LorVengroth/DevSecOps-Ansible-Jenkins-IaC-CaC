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
                            sh -c "chmod +x gradlew && ./gradlew test --tests '*Service*' --tests '*Controller*'"
                    '''
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t product-ui:latest ./product-ui
                    docker build -t product-api:latest ./product-api
                    docker build -t product-nginx:latest ./nginx
                '''
            }
        }

        stage('Docker Container') {
            steps {
                sh '''
                    docker stop product-nginx-container product-ui-container product-api-container product-db-container || true
                    docker rm product-nginx-container product-ui-container product-api-container product-db-container || true

                    docker run -d \
                        --name product-db-container \
                        --network host \
                        -e POSTGRES_DB=product_db \
                        -e POSTGRES_USER=product_user \
                        -e POSTGRES_PASSWORD=local_dev_password \
                        postgres:16-alpine -p 5433

                    # Wait 5 seconds for PostgreSQL to be ready
                    sleep 5

                    docker run -d \
                        --name product-api-container \
                        --network host \
                        product-api:latest

                    docker run -d \
                        --name product-ui-container \
                        --network host \
                        product-ui:latest

                    # nginx port:80
                    docker run -d \
                        --name product-nginx-container \
                        --network host \
                        product-nginx:latest
                '''
            }
        }
    }
}