#!/bin/bash
sudo docker login --username=正天大学士 registry.cn-hangzhou.aliyuncs.com
sudo docker pull registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_app:1.0
sudo docker tag a8ec9b03e9df registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_app:1.0
sudo docker push registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_app:1.0
sudo docker tag 5b9040fed4cc registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0
sudo docker push registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0
