const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const express = require('express');
let cart = [];

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
});

app.get('/homepage', (req, res) => {
    res.render(__dirname + '/views/homepage.ejs');
});

app.get('/contact', (req, res) => {
    res.render(__dirname + '/views/contact.ejs');
});

app.get('/about', (req, res) => {
    res.render(__dirname + '/views/about.ejs');
});

app.get('/menu', (req, res) => {
    res.render(__dirname + '/views/menu.ejs');
});

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
});

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
    cart.push(newObj);
    res.redirect('item-added');
});

app.get('/item-added', (req, res) => {
    res.render(__dirname + '/views/item-added.ejs');
});

app.get('/checkout', (req, res) => {
    var totalAmount = 0;
    cart.forEach(item => {
        totalAmount = totalAmount + parseInt(item.totalPrice);
    });
    let subTotal = {
        amount: totalAmount
    }
    res.render(__dirname + '/views/checkout.ejs', { cart, subTotal });
});

app.get('/delete', (req, res) => {
    const id = req.query.id;
    let newCart = [];

    cart.forEach(item => {
        if (item.id != id) {
            newCart.push(item);
        }
    });

    cart = newCart;
    res.redirect('checkout');
});

app.get('/subtract', (req, res) => {
    cart = cart.filter(item => {
        if (item.id == req.query.id) {
            const quantity = parseInt(item.quantity);
            if ((quantity - 1) > 0) {
                item.quantity = quantity - 1;
                item.totalPrice = item.quantity * parseFloat(item.price);
                return true;
            } else {
                return false;
            }
        }
        return true;
    });
    res.redirect('checkout');
});

app.get('/add', (req, res) => {
    cart.forEach(item => {
        if (item.id == req.query.id) {
            item.quantity = parseInt(item.quantity) + 1;
            item.totalPrice = parseInt(item.quantity) * parseInt(item.price);
        }
    })
    res.redirect('checkout');
});

app.get('/billing-details', (req, res) => {
    var totalAmount = 0;
    cart.forEach(item => {
        totalAmount = totalAmount + parseInt(item.totalPrice);
    });
    let subTotal = {
        amount: totalAmount
    }
    res.render(__dirname + '/views/billing-details.ejs', { cart, subTotal });
});

app.get('/order-placed', (req, res) => {
    res.render(__dirname + '/views/order-placed.ejs');
})

app.get('/rating', (req, res) => {
    res.render(__dirname + '/views/rating.ejs');
})

