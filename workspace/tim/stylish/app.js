const express = require('express');
const app = express();

const product_router = require('./Router/product_router');
app.use(express.json());
app.use('/api/1.0/products',product_router);

app.use(express.static(__dirname+'/static'));


app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(3000, () => {
    console.log(`Server is running`);
});