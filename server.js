const express = require('express');

const app = express();
const db = require("./db");

const PersonRouter = require("./routes/PersonRoutes");
app.use('/person',PersonRouter);

const MenuItem = require("./models/MenuItem");
const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.get('/', (req,res) => {
    res.send("This is the express get call");
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("Client Ip is", clientIp);
    res.end();
})



app.post('/menuitem', async (req,res) => {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        console.log("MenuItem created successfully");
        res.status(200).json(response);
    } 
    catch(error){
        console.log("Error creating MenuItem", error);
        res.status(500).json({"error":"Internal Server Error"});
    }
});

app.get('/menuitem', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("MenuItems fetched successfully");
        res.status(200).json(data);
    }
    catch(error){
        console.log("Error fetching MenuItems");
        res.status(500).json({"Error":"Internal Server Error"});
    }
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});