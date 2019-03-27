#!/bin/bash
sudo docker login --username=正天大学士 --password=ZZT06118115 registry.cn-hangzhou.aliyuncs.com
sudo docker tag 5d488677867c registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_app:1.0
sudo docker push registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_app:1.0
sudo docker tag 394434135bae registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0
sudo docker push registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0
sudo docker tag 5346c49e1a44 registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_mysql:1.0
sudo docker push registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_mysql:1.0

