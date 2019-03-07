#!/bin/bash
sudo docker login --username=正天大学士 --password=ZZT06118115 registry.cn-hangzhou.aliyuncs.com
sudo docker pull registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_app:1.0
sudo docker pull registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0
sudo docker tag registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_app:1.0 blog/app:latest
sudo docker tag registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0 blog/nginx:latest
