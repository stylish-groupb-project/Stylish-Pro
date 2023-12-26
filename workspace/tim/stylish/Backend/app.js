const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const path = require('path');
const cors = require('cors');
const http = require('http');
const product_router = require('./Router/product_router');
const user_router = require('./Router/user_router');
const order_router = require('./Router/order_router');
const chatBot_router = require('./Router/chatBot_router');
const monitor_router = require('./Router/monitor_router');
app.use(cors());
app.use(express.json());

app.use('/api/1.0/products', product_router);
app.use('/api/1.0/user', user_router);
app.use('/api/1.0/order', order_router);
app.use('/api/1.0/chatBot', chatBot_router);
app.use('/api/1.0/monitor', monitor_router);

// app.use('/static',express.static(__dirname+'/static'));
// test
app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.use("/admin", express.static("admin"));

app.get('/api/admin/checkout.html', (req, res) => {
    console.log(path.join(__dirname, 'Backend', 'View', 'html', 'checkout.html'));
    res.sendFile(path.join(__dirname, 'Backend', 'View', 'html', 'checkout.html'));
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
    const file = path.join(__dirname, 'static', '753A3038A7992A7112828484D232D6CA.txt');
    console.log(file);
    res.sendFile(file);
});

const server = http.createServer(app);
const io = require("socket.io")(server, {
    path: '/api/socket.io',
    cors: {
        origin: "*",
    },
});
const admins = new Map();  // 存储所有 admin 的 sockets
const users = new Map();
// io.use((socket, next) => {
//     const token = socket.handshake.headers.authorization
//     console.log("socket test token:", token)
//     if (!token || !token.startsWith('Bearer ')) {
//         console.log("No token provided")
//         return { error: 'No token provided' };
//     }
//     try {
//         const accessToken = token.split(' ')[1];
//         const decoded = jwt.verify(accessToken, process.env.SECRET);
//         console.log("Decoded:", decoded)
//         socket.token = decoded;
//         next();
//     } catch (error) {
//         console.log("error:", error)
//         return { error: 'Invalid token' };
//     }
// });

io.on('connection', (socket) => {
    console.log('A user connected with id:', socket.id);
    // const token = socket.token;
    // console.log('Connected client with token:', token);
    socket.on('registerAdmin', () => {
        admins.set(socket.id, socket);
        console.log('Admin connected:', socket.id);
    });
    users.set(socket.id, socket);
    console.log('User connected:', socket.id);

    socket.on('message', async (data) => {
        if (data.to === 'admin') {
            admins.forEach((adminSocket, _) => {
                adminSocket.emit('message', data);
            });
            //TODO: admin offline
        }
        if (data.from === 'admin') {
            let userSocket = users.get(data.to);
            if (userSocket) {
                userSocket.emit('message', data);
            }
        }
        socket.emit('message', data);
    });
    // const data = {
    //     from: 'admin',
    //     to: currUser,
    //     message,
    //   };
    // socket.on("joinRoom", async({ username, roomId }) => {
    //     const user = userJoin(socket.id, username, roomId);
    //     console.log(socket.id);
    //     socket.join(roomId);
    //     console.log("join success");
    //     const connection = await connectionPromise;

    //     try {
    //         const sql = "SELECT * FROM rooms WHERE id = ?"
    //         const [selectResult] = await connection.execute(sql, [user.room]);
    //         if(selectResult.length==0){
    //             const sql1 = "INSERT INTO rooms (id) VALUES (?)";
    //             await connection.execute(sql1, [user.room]);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         console.log('connection release');
    //     }
    // });
    // socket.on("newMessage", async(msg) => {
    //     const user = getCurrentUser(socket.id);
    //     const connection = await connectionPromise;
    //     try {

    //         io.to(msg.roomId).emit("message", formatMessage(decoded.id,pictureResult[0].picture,user.username, msg.message));
    //         console.log(pictureResult[0].email);
    //         console.log(pictureResult[0].name);
    //         const sql4= "SELECT * FROM users WHERE id = ?"
    //         //msg contains receiver data
    //         const [receiver] = await connection.execute(sql4,[msg.id]);
    //         const mailOptions = {
    //             from: 'runeeld23@gmail.com',
    //             to: receiver[0].email,
    //             subject: 'Soon Solve Message',
    //             text: `You got a new message from ${pictureResult[0].name}`
    //         };
    //         await mailer.enqueueMail(mailOptions).catch(console.error);
    //         console.log('enqueue success!');
    //         console.log(`${msg.message},${decoded.id},${msg.id},${user.room}`);
    //         await connection.execute(sql2, [msg.message, decoded.id, msg.id, user.room]);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         console.log('connection release');
    //     }
    // });
    // socket.on('message', async (data) => {
    //     console.log('server receive msg:', data);
    //     await redis.updateCache(`${data.userId}&${data.postId}&title`, data.title)
    //     socket.emit('msgFromServer', { status: true });
    // });

    socket.on('disconnect', () => {
        admins.delete(socket.id);
        users.delete(socket.id);
        console.log('Client disconnected:', socket.id);
    });
});



server.listen(3000, () => {
    console.log(`Server is running`);
});