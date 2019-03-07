#!/bin/bash
sudo docker login --username=正天大学士 registry.cn-hangzhou.aliyuncs.com
sudo docker pull registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_app:1.0
sudo docker pull registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0
sudo docker rename registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_app:1.0 blog/app:1.0
sudo docker rename registry.cn-hangzhou.aliyuncs.com/master_thomas/blog_nginx:1.0 blog/nginx:1.0