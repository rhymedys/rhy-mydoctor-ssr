
#!/bin/sh
#chkconfig: 2345 20 80
#description:Server reboot.Execute auto.sh

cd /usr/local/web-server/my_doctor_ssr;
npm run start;