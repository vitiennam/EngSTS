
useradd -m -d /home/nodeapp nodeapp
chown -R nodeapp:nodeapp /opt/app
sudo cat >/etc/supervisor/conf.d/node-app.conf << EOF
[program:nodeapp]
directory=/opt/app/EngSTS
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

# ------------------------- Systemctl
sudo nano /lib/systemd/system/engs_env.service

[Unit]
Description=engs_env. - making your environment variables rad
Documentation=https://example.com
After=network.target

[Service]
Environment=NODE_PORT=80
Type=simple
User=vitiennam
WorkingDirectory=/opt/app/EngSTS/
ExecStart=sudo node server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target