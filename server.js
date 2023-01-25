require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');

// SECTION - Serve Public
app.use(express.static('public'));

// SECTION - Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// SECTION - Views Endpoints
app.use('/', routes.views);

app.listen(PORT, () => console.log(`Application listening on ${PORT}..`));