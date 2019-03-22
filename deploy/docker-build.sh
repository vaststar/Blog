#!/bin/bash
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://0awro2mo.mirror.aliyuncs.com"]
}
EOF
systemctl daemon-reload
systemctl restart docker
docker-compose build
