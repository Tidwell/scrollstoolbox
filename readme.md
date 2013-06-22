To build:
grunt build

To test deploy:
change env.js to be 'stage' in scrollstoolbox-server and restart server

To deploy:
git subtree push --prefix dist origin site
ssh to prod, git pull

If server needs restart
Look for the process on port 9000 using: netstat -tulpn
kill #PID
node app &


TODO
-Trade Assistant
-always buy/always sell
-3-column view
-options to not show 3x
-option to change () prefix/suffix
-saving options
