pipeline {
  agent any
  stages {
    stage('Pulling From Github'){
      steps {
        git branch: 'main', credentialsId: 'ssh-key', url: 'git@github.com:ManishVisave/Bootcamp-Project.git'
      }
    }
    stage('Building Property Service Image') {
      steps { 
        // sh 'admin  ALL=(ALL) NOPASSWD:ALL'
        
        //sh 'aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 731152596599.dkr.ecr.ap-south-1.amazonaws.com'
        sh 'sudo docker build -t property_service property_service/'
        sh 'sudo docker tag property_service:latest 731152596599.dkr.ecr.ap-south-1.amazonaws.com/property:latest'
      }
    }

    stage('Building User Service Image') {
      steps { 
        
        // sh '%admin  ALL=(ALL) NOPASSWD:ALL'
        //sh 'aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 731152596599.dkr.ecr.ap-south-1.amazonaws.com'
        sh 'sudo docker build -t user_service user_service/'
        sh 'sudo docker tag user_service:latest 731152596599.dkr.ecr.ap-south-1.amazonaws.com/user:latest'
      }
    }

    stage('ECR Push') {
      steps { 
        sh 'sudo aws ecr get-login-password --region ap-south-1 | sudo docker login --username AWS --password-stdin 731152596599.dkr.ecr.ap-south-1.amazonaws.com'
        sh 'sudo docker push 731152596599.dkr.ecr.ap-south-1.amazonaws.com/user:latest'
        sh 'sudo docker push 731152596599.dkr.ecr.ap-south-1.amazonaws.com/property:latest'
      }
    }

    stage('Deploying') {
      steps { 
        sh 'kubectl apply -f kubernetes_files/'
      }
    }

    



  }
}