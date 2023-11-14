name: Industrialisation continue sur le serveur AWS
on: push
jobs:
  Deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - run: |
          jar cvf MonAppli.war *
    - name: copy file via ssh password
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.HOST_DNS }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.EC2_SSH_KEY }}
        port: ${{ secrets.DEPLOY_PORT }}
        source: "MonAppli.war"
        target: "/opt/tomcat/webapps"
