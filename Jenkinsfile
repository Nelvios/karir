pipeline {
    agent {
        node {
            label 'nodejs' 
        }
    }

    environment {
        GIT_REPO_URL = 'git@bcagitlab.intra.bca.co.id:ERP/WEBKARIR/microsite-it.git'
        GIT_REPO_CRED = 'cicd-sshsecret'
        GIT_MAIN = 'master'
        GIT_DEV = 'dev'
        GIT_BUG = 'bug'
        OC_BC_NAME = 'microsite-it'
        OC_DC_NAME = 'microsite-it'
        OC_NAMESPACE = 'microsite-it'
        GITLAB_SRCBRANCH = "${env.gitlabSourceBranch}"
    }

    options {
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout gitLab Branch Triggered') {
            when {
                anyOf {
                    expression {GITLAB_SRCBRANCH == 'master'}
                    expression {GITLAB_SRCBRANCH == 'dev'}
                    expression {GITLAB_SRCBRANCH == 'bug'}
                }
            }
            steps {
                checkout([  
                    $class: 'GitSCM', 
                    branches: [[name: "*/$GITLAB_SRCBRANCH"]], 
                    doGenerateSubmoduleConfigurations: false, 
                    extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: '.']], 
                    submoduleCfg: [], 
                    userRemoteConfigs: [[credentialsId: "$GIT_REPO_CRED", url: "$GIT_REPO_URL"]]
                ])
            }
        }
        stage('Checkout gitLab Tags Triggered') {
            when {
                allOf {
                    expression {GITLAB_SRCBRANCH != 'master'}
                    expression {GITLAB_SRCBRANCH != 'dev'}
                    expression {GITLAB_SRCBRANCH != 'bug'}
                    expression {GITLAB_SRCBRANCH != 'null'}
                }
            }
            steps {
                checkout([  
                    $class: 'GitSCM', 
                    branches: [[name: "$GITLAB_SRCBRANCH"]], 
                    doGenerateSubmoduleConfigurations: false, 
                    extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: '.']], 
                    submoduleCfg: [], 
                    userRemoteConfigs: [[credentialsId: "$GIT_REPO_CRED",refspec: '+refs/tags/*:refs/remotes/origin/tags/*', url: "$GIT_REPO_URL"]]
                ])
            }
        }
        stage('Checkout Openshift Triggered') {
            when {
                expression {
                    return GITLAB_SRCBRANCH == 'null'
                }
            }
            steps {
                checkout([  
                    $class: 'GitSCM', 
                    branches: [[name: "*/master"]], 
                    doGenerateSubmoduleConfigurations: false, 
                    extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: '.']], 
                    submoduleCfg: [], 
                    userRemoteConfigs: [[credentialsId: "$GIT_REPO_CRED", url: "$GIT_REPO_URL"]]
                ])
            }
        }
        stage('Compile and Build Source Code') {
            when {
                anyOf {
                    expression {GITLAB_SRCBRANCH == 'master'}
                    expression {GITLAB_SRCBRANCH == 'dev'}
                    expression {GITLAB_SRCBRANCH == 'bug'}
                    expression {GITLAB_SRCBRANCH == 'null'}
                }
            }
            steps {
                script {
                    sh 'npm install --verbose'
                    sh 'npm run build'
                }
            }
        }
        stage('Build Image Development') {
            when {
                expression {
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                    GIT_BRANCH = sh(returnStdout: true, script: 'git branch -a --contains $GIT_COMMIT | cut -d/ -f3- | tail -1').trim()
                    GIT_TAG = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT').trim()
                    return GIT_BRANCH == GIT_DEV && GIT_TAG == ''
                }
            }
            steps {
                script {
                    sh 'mv dist upload'
                    sh 'oc start-build "$OC_BC_NAME-dev" --from-dir upload --follow'
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                    openshift.withCluster() {
                    openshift.tag("${OC_BC_NAME}-dev:latest", "${OC_BC_NAME}-dev:$GIT_COMMIT")
                    }
                }
            }
        }
        stage('Deploy to Development') {
            when {
                expression {
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                    GIT_BRANCH = sh(returnStdout: true, script: 'git branch -a --contains $GIT_COMMIT | cut -d/ -f3- | tail -1').trim()
                    GIT_TAG = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT').trim()
                    return GIT_BRANCH == GIT_DEV && GIT_TAG == ''
                }
            }
            steps {
                script {
                        openshiftDeploy depCfg: "${OC_DC_NAME}-dev", namespace: "${OC_NAMESPACE}-dev"
                        openshiftVerifyDeployment depCfg: "${OC_DC_NAME}-dev", namespace: "${OC_NAMESPACE}-dev", replicaCount: 1, verifyReplicaCount: true
                    }
            }
        }
        stage('Transfer Image to QA') {
            when {
                expression {
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                    GIT_BRANCH = sh(returnStdout: true, script: 'git branch -r --contains $GIT_COMMIT | cut -d/ -f2- | head -n1').trim()
                    GIT_TAG = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT').trim()
                    TAG_ENV = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT | cut -b 1-2 | tail -1').trim()
                    TAG_VER = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT | cut -b 3- | tail -1').trim()
                    return GIT_BRANCH == GIT_DEV && TAG_ENV == 'QA'
                }
            }
            steps {
                script {
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                    GIT_TAG = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT').trim()
                    TAG_VER = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT | cut -b 3- | tail -1').trim()
                    openshift.withCluster() {
                        def srctoken = readFile "/run/secrets/kubernetes.io/serviceaccount/token"
                        sh "skopeo copy docker://docker-registry-default.devopenshift.gsit.co.id/cicd/${OC_BC_NAME}-dev:${GIT_COMMIT} docker://docker-registry-default.devopenshift.gsit.co.id/cicd/${OC_BC_NAME}-qa:${TAG_VER} --src-creds jenkins:${srctoken} --dest-creds jenkins:${srctoken} --src-tls-verify=false --dest-tls-verify=false"
                        openshift.tag("${OC_BC_NAME}-qa:${TAG_VER}", "${OC_BC_NAME}-qa:latest")
                    }
                }
                
            }
        }
        stage('Deploy to QA') {
            when {
                expression {
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                    GIT_BRANCH = sh(returnStdout: true, script: 'git branch -r --contains $GIT_COMMIT | cut -d/ -f2- | head -n1').trim()
                    GIT_TAG = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT').trim()
                    TAG_ENV = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT | cut -b 1-2 | tail -1').trim()
                    TAG_VER = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT | cut -b 3- | tail -1').trim()
                    return GIT_BRANCH == GIT_DEV && TAG_ENV == 'QA'
                }
            }
            steps {
                script {
                        openshiftDeploy depCfg: "${OC_DC_NAME}-qa", namespace: "${OC_NAMESPACE}-qa"
                        openshiftVerifyDeployment depCfg: "${OC_DC_NAME}-qa", namespace: "${OC_NAMESPACE}-qa", replicaCount: 1, verifyReplicaCount: true
                    }
            }
        }
        stage('Build Image Bug') {
            when {
                expression {
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                    GIT_BRANCH = sh(returnStdout: true, script: 'git branch -a --contains $GIT_COMMIT | cut -d/ -f3- | tail -1').trim()
                    GIT_TAG = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT').trim()
                    return GIT_BRANCH == GIT_BUG && GIT_TAG == ''
                }
            }
            steps {
                script {
                    sh 'oc start-build "$OC_BC_NAME-bug" --from-file="$JAR_PATH" --follow'
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                    openshift.withCluster() {
                    openshift.tag("${OC_BC_NAME}-bug:latest", "${OC_BC_NAME}-bug:$GIT_COMMIT")
                    }
                }
            }
        }
        stage('Deploy to BugFix ') {
            when {
                expression {
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                    GIT_BRANCH = sh(returnStdout: true, script: 'git branch -a --contains $GIT_COMMIT | cut -d/ -f3- | tail -1').trim()
                    GIT_TAG = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT').trim()
                    return GIT_BRANCH == GIT_BUG && GIT_TAG == ''
                }
            }
            steps {
                script {
                        openshiftDeploy depCfg: "${OC_DC_NAME}-bug", namespace: "${OC_NAMESPACE}-bug"
                        openshiftVerifyDeployment depCfg: "${OC_DC_NAME}-bug", namespace: "${OC_NAMESPACE}-bug", replicaCount: 1, verifyReplicaCount: true
                    }
            }
        }
        stage('Build Image Master') {
            when {
                expression {
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                    GIT_BRANCH = sh(returnStdout: true, script: 'git branch -a --contains $GIT_COMMIT | cut -d/ -f3- | tail -1').trim()
                    GIT_TAG = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT').trim()
                    return GIT_BRANCH == GIT_MAIN && GIT_TAG == ''
                }
            }
            steps {
                script {
                    sh 'mv dist upload'
                    sh 'oc start-build "$OC_BC_NAME" --from-dir upload --follow'
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                    openshift.withCluster() {
                    openshift.tag("${OC_BC_NAME}:latest", "${OC_BC_NAME}:$GIT_COMMIT")
                    }
                }
            }
        }
        stage('Deploy to Master Staging') {
            when {
                expression {
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                    GIT_BRANCH = sh(returnStdout: true, script: 'git branch -a --contains $GIT_COMMIT | cut -d/ -f3- | tail -1').trim()
                    GIT_TAG = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT').trim()
                    return GIT_BRANCH == GIT_MAIN && GIT_TAG == ''
                }
            }
            steps {
                script {
                    openshiftDeploy depCfg: "$OC_DC_NAME", namespace: "$OC_NAMESPACE"
                    openshiftVerifyDeployment depCfg: "$OC_DC_NAME", namespace: "$OC_NAMESPACE", replicaCount: 1, verifyReplicaCount: true
                }
            }
        }
        stage('Transfer Image to Production') {
            when {
                expression {
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                    GIT_BRANCH = sh(returnStdout: true, script: 'git branch -r --contains $GIT_COMMIT | cut -d/ -f2- | head -n1').trim()
                    GIT_TAG = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT').trim()
                    TAG_ENV = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT | cut -b 1-3 | tail -1').trim()
                    TAG_VER = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT | cut -b 4- | tail -1').trim()
                    return GIT_BRANCH == GIT_MAIN && TAG_ENV == 'PRD'
                }
            }
            steps {
                timeout(time: 3, unit: 'MINUTES') {
                    retry(5) {
                        script {
                            GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --verify HEAD').trim()
                            GIT_TAG = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT').trim()
                            TAG_VER = sh(returnStdout: true, script: 'git tag --contains $GIT_COMMIT | cut -b 4- | tail -1').trim()
                            openshift.withCluster() {
                                def srctoken = readFile "/run/secrets/kubernetes.io/serviceaccount/token"
                                sh "skopeo copy docker://docker-registry-default.devopenshift.gsit.co.id/cicd/${OC_BC_NAME}:${GIT_COMMIT} docker://docker-registry-default.routeros.ocperp.intra.bca.co.id/${OC_NAMESPACE}/${OC_BC_NAME}:${TAG_VER} --src-creds jenkins:${srctoken} --dest-creds imgpusher:${destoken} --src-tls-verify=false --dest-tls-verify=false"
                            }
                        }
                    }
                }
            }
        }
    }
}
