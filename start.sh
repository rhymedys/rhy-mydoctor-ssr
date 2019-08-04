#!/bin/sh

export PROJECT_PATH=/usr/local/web-server/my_doctor_ssr

export PATH=/root/.tnvm/versions/alinode/v4.7.0/bin:/usr/node/bin:$PATH

echo "node version"
	node -v
echo "npm version" 
	npm -v

start(){
	cd $PROJECT_PATH
	npm run stop
	npm run start
}

start



