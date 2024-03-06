#!/bin/bash
# clone Odoo directory
DESTINATION=$1
git clone --depth=1 https://github.com/huydh1900/docker_sne

sudo chmod -R 777 $DESTINATION

