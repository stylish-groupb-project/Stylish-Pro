const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const path = require('path');
const cors = require('cors');
const product_router = require('./Router/product_router');
const user_router = require('./Router/user_router');
const order_router = require('./Router/order_router');
const chatBot_router = require('./Router/chatBot_router');
const monitor_router = require('./Router/monitor_router');
app.use(cors());
app.use(express.json());

app.use('/api/1.0/products',product_router);
app.use('/api/1.0/user',user_router);
app.use('/api/1.0/order',order_router);
app.use('/api/1.0/chatBot',chatBot_router);
app.use('/api/1.0/monitor',monitor_router);

// app.use('/static',express.static(__dirname+'/static'));
// test
app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.use("/admin", express.static("admin"));

app.get('/api/admin/checkout.html', (req, res) => {
    console.log(path.join(__dirname, 'Backend','View', 'html','checkout.html'));
    res.sendFile(path.join(__dirname, 'Backend','View', 'html','checkout.html'));
});

// app.get('/admin/dashboard.html', (req, res) => {
//     console.log(path.join(__dirname,'View', 'html','dashboard.html'));
//     res.sendFile(path.join(__dirname,'View', 'html','dashboard.html'));
// });
  

app.get('/api/1.0/test', (req, res) => {
    res.send('Hello');
});

app.get('/.well-known/pki-validation/753A3038A7992A7112828484D232D6CA.txt', (req, res) => {
    console.log("well-know!");
    const file= path.join(__dirname,'static','753A3038A7992A7112828484D232D6CA.txt');
    console.log(file);
    res.sendFile(file);
});

app.listen(3000, () => {
    console.log(`Server is running`);
});