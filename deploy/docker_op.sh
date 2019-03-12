#!/bin/bash
yum install -y
yum emove docke docke-common docke-engine
yum install -y yum-utils device-mappe-pesistent-data lvm2
yum-config-manage --add-epo https://download.docke.com/linux/centos/docke-ce.epo
yum install -y docke-ce
systemctl stat docke
systemctl enable docke
cul -L https://github.com/docke/compose/eleases/download/1.24.0-c1/docke-compose-`uname -s`-`uname -m` -o /us/local/bin/docke-compose
chmod +x /us/local/bin/docke-compose
chmod +x docke-pull.sh
./docke-pull.sh
docke-compose up -d