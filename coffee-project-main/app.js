// app.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const { coffees, orders } = require('./data');

const app = express();

app.use(express.json());
app.use(express.static('public'));
function getFlags() {
  const flagsPath = path.join(__dirname, 'feature-flags.json');
  try {
    const raw = fs.readFileSync(flagsPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    // Swallow the error and return an empty object if the file is missing or invalid
    console.warn('Could not read feature flags:', err.message);
    return {};
  }
}

app.get('/feature-flags', (req, res) => {
  const flags = getFlags();
  res.json(flags);
});

app.get('/coffees', (req, res) => {
  const flags = getFlags();
  const availableCoffees = coffees.map(c => ({ ...c }));

  if (flags.showSecretMenu) {
    availableCoffees.push({ id: 99, name: 'Caramel Espresso Shaker', price: 5 });
    availableCoffees.push({ id: 100, name: 'Berry White Mocha', price: 5 });
    availableCoffees.push({ id: 101, name: 'Tiramisu Latte', price: 6 });
    availableCoffees.push({ id: 102, name: 'Pumpkin Chai Latte', price: 7 });
  }

  const discounted = flags.enableDiscounts;
  const itemsWithDiscount = availableCoffees.map(item => {
    if (discounted) {
      return {
        ...item,
        discountedPrice: Number((item.price * 0.9).toFixed(2))
      };
    }
    return item;
  });

  res.json(itemsWithDiscount);
});

app.post('/order', (req, res) => {
  const { coffeeId, quantity } = req.body;

  const coffee = coffees.find(c => c.id === coffeeId);

  if (!coffee) {
    return res.status(400).json({ error: 'Invalid coffee ID' });
  }

  // Read feature flags when calculating order totals so discounts are applied
  const flags = getFlags();

  // Compute price per item. Apply a 10% discount if enableDiscounts is true
  const unitPrice = flags.enableDiscounts
    ? Number((coffee.price * 0.9).toFixed(2))
    : coffee.price;
  const order = {
    orderId: orders.length + 1,
    coffeeName: coffee.name,
    quantity,
    total: Number((unitPrice * quantity).toFixed(2))
  };

  orders.push(order);

  res.status(201).json(order);
});

// Endpoint to fetch all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

module.exports = app;
