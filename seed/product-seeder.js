var Product = require('../models/product');
var mongoose = require('mongoose');

// var url = process.env.DATABASEURL || "mongodb://localhost:27017/shopping"
// mongoose.connect(url, { useNewUrlParser: true});
mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true});


var products = [
    new Product({
        imagePath: 'https://i.postimg.cc/SK7Rfjdm/agfamatic.jpg',
        title: 'Agfamatic',
        description: 'Vintage Agfamatic, excellent condition, 35mm film',
        price: 118
    }),

    new Product({
        imagePath: 'https://i.postimg.cc/GhHBnLLj/canon-ae1.jpg',
        title: 'Canon AE 1',
        description: 'Vintage Canon Camera, mint condition, 35mm, OEM lens included',
        price: 125
    }),

    new Product({
        imagePath: 'https://i.postimg.cc/VvHd0TRM/kodak-instamatic.jpg',
        title: 'Kodak Instamatic',
        description: 'Rare Vintage Kodak Camera, excellent condition, 35mm',
        price: 150
    }),

    new Product({
        imagePath: 'https://i.postimg.cc/ncgXHyMf/minolta-x0.jpg',
        title: 'Minolta X0',
        description: 'Vintage Minolta Camera, excellent condition, 35mm, OEM lens included',
        price: 135
    }),

    new Product({
        imagePath: 'https://i.postimg.cc/fWH3PtNL/olympus-trip35.jpg',
        title: 'Olympus Trip-35',
        description: 'New Olympus Trip 35 P&C, 10-50mm lens',
        price: 245
    }),

    new Product({
        imagePath: 'https://i.postimg.cc/5ytX01wb/pentax-me.jpg',
        title: 'Pentax ME',
        description: 'Vintage Pentax Camera, excellent condition, 35mm, OEM 28mm lens includes ',
        price: 95
    })

];

var done = 0;

for (var i = 0; i < products.length; i++){
    products[i].save(function(err, result){
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

