# Node Express Mongo Shopping Cart
Features:
* User Authentication via Passport
* User Sign Up
* User Sign In/Out
* User Profile With Previous Completed Orders
* Form Validation via CSURF
* Cart Item Addition, Item Removal, Item Checkout
* Session Token via Stripe
* Credit Card Payment/Validation/Fraud Detection via Stripe

![](https://github.com/CLewisMessina/Node_Express_Mongo_Shopping_cart/blob/master/Node_Express_Mongo_Shopping_cart.png)

**Code base:** HTML, CSS (Boostrap 3 CDN), JavaScript

**JS Libraries/Dependencies:**     
    bcrypt-nodejs, connect-flash, connect-mongo, cookie-parser,
    csurf, debug, express, express-handlebars, express-session, express-validator, hbs, http-errors, JQuery (CDN), mongoose, morgan, passport,
    passport-local, stripe

**Code Tools:** MS Visual Studio Code

**Working Example:** https://afternoon-temple-57168.herokuapp.com/ 

**User Notes:** 
* Users must sign-up and be logged in to make purchases. 
* Site demo is set up for 3 hour user sessions before Stripe token expires and new login required.
* Purchases must be made with valid credit card number.
* Demo is set to use test/dummy credit card number: **4242 4242 4242 4242**. 
* Credit Card expiration date must be any month/year in future less than 2100AD.
* Credit Card CVC code may be any random 3 digit code.


## REFACTOR NOTES
Project updates may include:
* Landing page
* Updated interface
