const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const product_router = require('./Router/product_router');
// const test_router = require('./Router/testR');
app.use(cors());
app.use(express.json());

app.use('/api/1.0/products',product_router);
// app.use('/api/1.0/tests',test_router);

// app.use('/static',express.static(__dirname+'/static'));
app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.get('/api/1.0/test', (req, res) => {
    res.send('Hello');
});
app.get('/test', (req, res) => {
    res.send('Helloo');
});

app.listen(3000, () => {
    console.log(`Server is running`);
});