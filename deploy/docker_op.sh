#!/bin/bash
systemctl stop firewalld
systemctl restart network
yum install -y
yum remove docker docker-common docker-engine
yum install -y yum-utils device-mapper-pesistent-data lvm2
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install -y docker-ce
systemctl start docker
systemctl enable docker
curl -L https://github.com/docker/compose/releases/download/1.24.0-rc1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
chmod +x docker-pull.sh
./docker-pull.sh
docker-compose up -d