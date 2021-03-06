# Node Express Mongo Shopping Cart

## Features:
* User Authentication via Passport
* User Sign Up
* User Sign In/Out
* User Profile With Previous Completed Orders
* Form Validation via CSURF
* Cart Item Addition, Item Removal, Item Checkout
* Session Token via Stripe
* Credit Card Payment/Validation/Fraud Detection via Stripe

**Code base:** HTML, CSS (Boostrap 3 CDN), JavaScript

**JS Libraries/Dependencies:**     
    bcrypt-nodejs, connect-flash, connect-mongo, cookie-parser,
    csurf, debug, express, express-handlebars, express-session, express-validator, hbs, http-errors, JQuery (CDN), mongoose, morgan, passport,
    passport-local, stripe

**Code Tools:** MS Visual Studio Code

**Landing Page**
![](https://github.com/CLewisMessina/Node_Express_Mongo_Shopping_cart/blob/master/1LandingPg.jpg)


**Sign Up/Sign In Navigation**
![](https://github.com/CLewisMessina/Node_Express_Mongo_Shopping_cart/blob/master/2UserMgt.jpg)
* Users may add items to cart but must sign-up and/or be logged in to make purchases. 


**Sign Up Page**
![](https://github.com/CLewisMessina/Node_Express_Mongo_Shopping_cart/blob/master/3SignUp.png)


**Shopping Cart**
![](https://github.com/CLewisMessina/Node_Express_Mongo_Shopping_cart/blob/master/4Cart.png)
* Users may review items in cart and change quantities.


**Item Removal**
![](https://github.com/CLewisMessina/Node_Express_Mongo_Shopping_cart/blob/master/5RemoveItems.png)


**Checkout Page**
![](https://github.com/CLewisMessina/Node_Express_Mongo_Shopping_cart/blob/master/6Checkout.png)
* Purchases must be made with valid credit card number.
* Demo site code is set to use test/dummy credit card number: **4242 4242 4242 4242**. 
* Credit Card expiration date must be any month/year in future less than 2100AD.
* Credit Card CVC code may be any random 3 digit code.
* Demo site code is set up for 3 hour user sessions before Stripe token expires and new login required


**Succesful Transaction Route and Flash Message**
![](https://github.com/CLewisMessina/Node_Express_Mongo_Shopping_cart/blob/master/7CompletedTrans.jpg)


**Profile Page**
![](https://github.com/CLewisMessina/Node_Express_Mongo_Shopping_cart/blob/master/8ProfileOrders.png)
* Users may see previous orders on User Profile Page.


**Logout Navigation**
![](https://github.com/CLewisMessina/Node_Express_Mongo_Shopping_cart/blob/master/9OrderProfilewLogout.png)
* Signed in users may log out through user management navigation dropdown.

## REFACTOR NOTES
Project updates may include:
* Landing page
* Updated interface
