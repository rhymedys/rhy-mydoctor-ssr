#!/bin/sh
# chkconfig: 2345 10 90
# description: Node service

export PROJECT_PATH=/usr/local/web-server/my_doctor_ssr

export PATH=/root/.tnvm/versions/alinode/v4.7.0/bin:$PATH

start_operation='start'
stop_operation='stop'
restart_operation='restart'

echo "node version"
	node -v
echo "npm version" 
	npm -v

start(){
	cd $PROJECT_PATH
	npm run start
}

stop(){
	cd $PROJECT_PATH
	npm run stop
}

restart(){
	stop
	start
}

warn(){
	echo
	echo "please input the command which in the list of comman"
	echo "====================================================================="
	echo "service rhy-my-doctor-ssr-7001.sh start"
	echo "service rhy-my-doctor-ssr-7001.sh stop"
	echo "service rhy-my-doctor-ssr-7001.sh restart"
	echo "====================================================================="
}

if [ $1 = $start_operation ]
then
	echo 'starting node service...';
	start
	exit 1
fi

if [ $1 = $stop_operation ]
then
	echo 'stoping node service...';
	stop
	exit 1
fi

if [ $1 = $restart_operation ]
then
	echo 'restarting node service...'
	restart
	exit 1
fi

if [[ $1 != $start_operation && $1 != $stop_operation && $1 != $restart_operation ]]
then
	warn
	exit 1
fi



