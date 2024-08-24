const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const express = require('express');

let app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

fs.readFile('cart.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading items.json:', err);
    }
    cart = JSON.parse(data);
});

fs.readFile('starters.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading items.json:', err);
    }
    starters = JSON.parse(data);
});

fs.readFile('s&b.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading items.json:', err);
    }
    sbs = JSON.parse(data);
});

fs.readFile('mains.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading items.json:', err);
    }
    mains = JSON.parse(data);
});

fs.readFile('desserts.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading items.json:', err);
    }
    desserts = JSON.parse(data);
});

app.get('/', (req, res) => {
    res.redirect('homepage');
})

app.get('/homepage', (req, res) => {
    res.render('homepage');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/menu', (req, res) => {
    res.render('menu');
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
    res.render('item-detail', item);
})

app.post('/cart', (req, res) => {
    const totalPrice = parseInt(req.body.quantity) * parseInt(req.body.price);
    let newObj = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        quantity: req.body.quantity,
        totalPrice: totalPrice
    }
    cart.push(newObj);
    const cartJson = JSON.stringify(cart);
    fs.writeFileSync('cart.json', cartJson);
    res.redirect('item-added');
});

app.get("/item-added", (req, res) => {
    res.render('item-added');
});

app.get("/checkout", (req, res) => {
    console.log(cart);
    res.render('checkout', cart);
});

module.exports = app;

app.listen(4001);