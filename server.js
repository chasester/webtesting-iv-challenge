// code away!
// implement your API here
const express = require('express'); // built in node.js module to handle http traffic
//const hostname = 'localhost'; // the local computer where the server is running
const port = 5000; // a port we'll use to watch for traffic
const server = express();
server.use(express.json());
//server.use(logger);

var data = [ //some lucky numbers yay
    1,3,5,7,11,13,17,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97
]

//server.use('/', (req, res) => { res.send(`api is up and running <br/>${process.env.MOTD}`)});

server.listen(port, () => {
    // start watching for connections on the port specified
    console.log(`Server running at http://localhost:${port}/`);
  });
server.get("/numbers",(req,res) => {res.status(200).json({data: data})})

server.post("/numbers", (req,res) => {if(req.body.number && !isNaN(req.body.number)){data.push(req.body.number); return res.status(201).json({data: data}); } return res.status(400).json({data: data})})

server.delete('/numbers', (req,res) => {if(req.body.number && !isNaN(req.body.number)){ let d = data.filter(x=> x===req.body.number); data = data.filter(x=> !d.includes(x)); return res.status(202).json({data:data})} return res.status(400).json({data: data}) })

function logger(req,res,next)
{
console.log(`${req.method} is being used at ${req.url} at ${Date.now()}`);
next();
}

module.exports = server;