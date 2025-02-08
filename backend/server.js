const express = require('express');
const cors = require('cors');
const connectDB = require('./Database/DBConnection'); 
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/productRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');  
const path = require('path');
const auth = require('./routes/auth');
require('dotenv').config();
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json()); 
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})); 

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/purchases', purchaseRoutes); 
app.use('/auth', auth); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(session({
  secret: process.env.SESSION_SECRET || '4A!b@C3d#E5f$G7h',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 } 
}));