#!/bin/bash
sudo docker login --username=正天大学士 --password=ZZT06118115 registry.cn-hangzhou.aliyuncs.com
sudo docker pull registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_server:1.0
sudo docker pull registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0
sudo docker pull registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_mysql:1.0
sudo docker tag registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_server:1.0 blog/server:latest
sudo docker tag registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0 blog/nginx:latest
sudo docker tag registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_mysql:1.0 blog/mysql:latest

