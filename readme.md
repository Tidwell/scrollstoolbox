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


 features
-never buy
-never sell
-current users list (login time)
-include quantity/price shared settings
-other price sources!!!!!!!!!!!!!!!!! (TOMORROW!)
-change colors (0 red, 1-2 orange, 3 green, 4+ blue)

-api
-private option on account
-admin option on account

-settings saving



For the Trade Assistant:
Being able to append text to the buy/sell message
Setting the order of cards in text (not sure how they're ordered now)
Exporting to CSV and/or having a publically viewable list
Filtering option for cards with price above/below certain price (E.g. I want to sell all cards worth more than 350g, regardless of rarity)
Custom buy sell list apart from rarity (Like above, but using checkboxes rather than gold)
Being able to save WTB / WTS settings

Trade Assistant / Collection
Rarity filter
Column sorting by Number Owned, Price, Always Buy, Buy Price Override, Always Sell, Sell Price Override



ALPHA
-loading indicators

-solve throttle/db save race condition
-send salt down (store on socket), password is sent over socket md5+salt
-login/register modal popups
-frontload card data in main (still necessary?)

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