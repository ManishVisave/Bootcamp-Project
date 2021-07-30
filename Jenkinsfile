pipeline {
  agent any
  stages {
    stage('Pulling From Github'){
      steps {
        git branch: 'main', credentialsId: 'Github', url: 'https://github.com/ManishVisave/Bootcamp-Project'
      }
    }
    stage('Building Property Service Image') {
      steps { 
        //sh 'aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 731152596599.dkr.ecr.ap-south-1.amazonaws.com'
        sh 'docker build -t property_service property_service/'
        sh 'docker tag property_service:latest 731152596599.dkr.ecr.ap-south-1.amazonaws.com/property:latest'
      }
    }

    stage('Building User Service Image') {
      steps { 
        //sh 'aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 731152596599.dkr.ecr.ap-south-1.amazonaws.com'
        sh 'docker build -t user_service user_service/'
        sh 'docker tag user_service:latest 731152596599.dkr.ecr.ap-south-1.amazonaws.com/user:latest'
      }
    }

    stage('ECR Push') {
      steps { 
        sh 'docker push 731152596599.dkr.ecr.ap-south-1.amazonaws.com/user:latest'
        sh 'docker push 731152596599.dkr.ecr.ap-south-1.amazonaws.com/property:latest'
      }
    }



  }
}