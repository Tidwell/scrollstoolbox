To build:
grunt build

To test deploy:
change env.js to be 'stage' in scrollstoolbox-server and restart server

To deploy:
git subtree push --prefix dist origin site
ssh to prod, git pull

If server needs restart
Look for the process on port 9000 using:
netstat -tulpn
kill #PID
nohup node app &


ALPHA
-import messages and all mod stuff cleaned up
MOD
---error response
---okay responses
---cleanup mod
---submit
SITE
---import message? (shared eventListener between socket and route?)
---copy for how to use mod
	--register account & set in game name (in game name prompt from organizer)
	--download & install modloader
	--go to mods, click checkbox
	--goto collections, click sync
	--tada!
	--synced flag - first option?

-loading indicators


-solve throttle/db save race condition
-send salt down (store on socket), password is sent over socket md5+salt
-login/register modal popups
-frontload card data in main


DURING ALPHA/POST-LAUNCH
-fix multi-sign-in
-exclude, exclude threshhold?
-options to not show 3x
-always/never sell quantity option
-add starter decks
-change help to dropdown top or right for tablet (or just help home?)
-phone reduced size nav
-nav hiding
-enter collection prompt (switches tab-order)
-3-column view
-save data when registering
-option to change () prefix/suffix
-buy/sell # override
-page exit warnings
-saving options
-switch pricing source & options
-trade assistant table columns show/hide (option, saveable)
-show/hide columns-per-page options
-stay logged in via localStorage
-discrepancy from scrollsguide API card count
-extended character support
-local storage cache data (md5 to check if need new data - page speed ++++++)