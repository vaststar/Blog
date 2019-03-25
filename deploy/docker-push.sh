#!/bin/bash
sudo docker login --username=正天大学士 --password=ZZT06118115 registry.cn-hangzhou.aliyuncs.com
sudo docker tag bb541cfb215b registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_app:1.0
sudo docker push registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_app:1.0
sudo docker tag 5d938d423756 registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0
sudo docker push registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0
sudo docker tag 00585e6cf4a8 registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_mysql:1.0
sudo docker push registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_mysql:1.0

