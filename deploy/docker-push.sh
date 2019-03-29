#!/bin/bash
sudo docker login --username=正天大学士 --password=ZZT06118115 registry.cn-hangzhou.aliyuncs.com
sudo docker tag blog/server:latest registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_server:1.0
sudo docker push registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_app:1.0
sudo docker tag blog/nginx:latest registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0
sudo docker push registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0
sudo docker tag blog/mysql:latest registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_mysql:1.0
sudo docker push registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_mysql:1.0

