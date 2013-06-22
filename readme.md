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
-solve throttle/db save race condition
-send salt down (store on socket), password is sent over socket md5+salt
-icon checkboxes for factions
-login/register modal popups (w/ page exit warning)
-styles, logo, copy, etc

-always buy/always sell ui integration
-3-column view
-exclude
-options to not show 3x
-option to change () prefix/suffix
-buy/sell # override

-saving options
-trade assistant table columns show/hide (option, saveable)
-show/hide columns-per-page options