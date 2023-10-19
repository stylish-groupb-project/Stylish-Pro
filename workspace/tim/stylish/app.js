const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const product_router = require('./Router/product_router');
app.use(express.json());

app.use('/api/1.0/products',product_router);

app.use('/static',express.static(__dirname+'/static'));
app.use(
    '/apidoc',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.get('/api/1.0', (req, res) => {
    res.send('Hello');
});

app.listen(3000, () => {
    console.log(`Server is running`);
});