let TOKEN_FIREBASE;
switch (process.env.NODE_ENV) {
    case 'production' : {
        TOKEN_FIREBASE = 'AIzaSyDU23a5ieqoH4XsUCHo_Yu2zmMIhttmuAg'
        break
    }
    case 'development' : {
        TOKEN_FIREBASE = 'AIzaSyDU23a5ieqoH4XsUCHo_Yu2zmMIhttmuAg'
        break
    }
}
export {TOKEN_FIREBASE}
