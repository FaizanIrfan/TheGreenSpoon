const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const express = require('express');
var cart = [];

let app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

fs.readFile(path.join(__dirname, 'starters.json'), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading items.json:', err);
    }
    starters = JSON.parse(data);
});

fs.readFile(path.join(__dirname, 's&b.json'), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading items.json:', err);
    }
    sbs = JSON.parse(data);
});

fs.readFile(path.join(__dirname, 'mains.json'), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading items.json:', err);
    }
    mains = JSON.parse(data);
});

fs.readFile(path.join(__dirname, 'desserts.json'), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading items.json:', err);
    }
    desserts = JSON.parse(data);
});

app.get('/', (req, res) => {
    res.redirect('homepage');
})

app.get('/homepage', (req, res) => {
    res.render(__dirname + '/views/homepage.ejs');
})

app.get('/contact', (req, res) => {
    res.render(__dirname + '/views/contact.ejs');
})

app.get('/about', (req, res) => {
    res.render(__dirname + '/views/about.ejs');
})

app.get('/menu', (req, res) => {
    res.render(__dirname + '/views/menu.ejs');
})

app.get('/menu/item', (req, res) => {
    var count = 0;
    starters.forEach(items => {
        if (items.id == req.query.id) {
            item = items;
            count++;
        }
    })
    if (count == 0) {
        sbs.forEach(items => {
            if (items.id == req.query.id) {
                item = items;
                count++;
            }
        })
    }
    if (count == 0) {
        mains.forEach(items => {
            if (items.id == req.query.id) {
                item = items;
                count++;
            }
        })
    }
    if (count == 0) {
        desserts.forEach(items => {
            if (items.id == req.query.id) {
                item = items;
                count++;
            }
        })
    }
    res.render(__dirname + '/views/item-detail.ejs', item);
})

app.post('/cart', (req, res) => {

    let newObj = {};
    var count = 0;
    const totalPrice = parseInt(req.body.quantity) * parseInt(req.body.price);

    starters.forEach(item => {
        if (item.id == req.body.id) {
            newObj = {
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price,
                image: item.image,
                quantity: req.body.quantity,
                totalPrice: totalPrice
            }
            count++;
        }
    })

    if (count == 0) {
        sbs.forEach(item => {
            if (item.id == req.body.id) {
                newObj = {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    image: item.image,
                    quantity: req.body.quantity,
                    totalPrice: totalPrice
                }
                count++;
            }
        })
    }

    if (count == 0) {
        mains.forEach(item => {
            if (item.id == req.body.id) {
                newObj = {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    image: item.image,
                    quantity: req.body.quantity,
                    totalPrice: totalPrice
                }
                count++;
            }
        })
    }

    if (count == 0) {
        desserts.forEach(item => {
            if (item.id == req.body.id) {
                newObj = {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    image: item.image,
                    quantity: req.body.quantity,
                    totalPrice: totalPrice
                }
                count++;
            }
        })
    }

    // let newObj = {
    //     id: req.body.id,
    //     name: req.body.name,
    //     description: req.body.description,
    //     price: req.body.price,
    //     image: req.body.image,
    //     quantity: req.body.quantity,
    //     totalPrice: totalPrice
    // }
    cart.push(newObj);
    JSON.stringify(cart);
    // console.log(cart);
    res.redirect('item-added');
});

app.get("/item-added", (req, res) => {
    res.render(__dirname + '/views/item-added.ejs');
});

app.get("/checkout", (req, res) => {
    console.log(cart);
    res.render(__dirname + '/views/checkout.ejs', cart);
});

module.exports = app;

app.listen(4000);