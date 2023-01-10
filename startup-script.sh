sudo cat >/etc/supervisor/conf.d/node-app.conf << EOF
[program:nodeapp]
directory=/home/vitiennam/EngSTS
command=npm run server
autostart=true
autorestart=true
user=nodeapp
environment=HOME="/home/nodeapp",USER="nodeapp",NODE_ENV="production"
stdout_logfile=syslog
stderr_logfile=syslog
EOF

supervisorctl reread
supervisorctl update