#!/bin/bash
cp Dockerfile ../Dockerfile
cd ..
docker build -t app:app .