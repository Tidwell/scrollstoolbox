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

fix multi-accounts or non-sync:
db.users.update({inGameName: '******INGAMENAME******'}, {$set: {owned: []}})

db.users.update({inGameName: '******INGAMENAME******'}, {$set: {password: 'changeme1'}})

-----------

Hey there, I just went ahead and reset your password:

Username:
pw:

After logging-in, please reset your password from the account screen.  Please note usernames and passwords are case-sensitive.

If you run into any issues, let me know!

-Tidwell


bugs
-resolve port9000 blocked issue
-resolve https://lastpass.com/ issue
-on sync, table doesn't resort


 features
-never buy
-never sell
-current users list (login time)
-include quantity/price shared settings
-other price sources
-change colors (0 red, 1-2 orange, 3 green, 4+ blue)

-api
-private option on account
-admin option on account

-settings saving

Sorting options for WTS/WTB list
Column Sorting for Always Buy, Buy Price Override, Always Sell, Sell Price Override



-loading indicators
-Exporting to CSV and/or having a publically viewable list

-solve throttle/db save race condition
-send salt down (store on socket), password is sent over socket md5+salt
-frontload card data in main (still necessary?)
-mark untradeable

DURING ALPHA/POST-LAUNCH
-fix multi-sign-in
-options to not show 3x
-always/never sell quantity option
-add starter decks
-change help to dropdown top or right for tablet (or just help home?)
-phone reduced size nav
-nav hiding
-3-column view
-save data when registering
-page exit warnings
-switch pricing source & options
-trade assistant table columns show/hide (option, saveable)
-show/hide columns-per-page options
-extended character support
-local storage cache data (md5 to check if need new data - page speed ++++++)