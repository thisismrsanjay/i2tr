const path = require('path');
const express = require('express');
const app =  express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const expressValidator = require('express-validator');
const passport  = require('passport');
const session =  require('express-session');
//just requiring it passes it to middeleware idkh
require('./passport');

const config = require('./config');

const port = 3000;


const mongoose = require('mongoose');
mongoose.connect(config.database,{ useCreateIndex: true,useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('database connected'); 
});


app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
 }))
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    app.locals.user = req.user || null;
    next();
})

//requiring chat functionality
require('./chat.js')(io );



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.locals.errors = null;
app.locals.title = null;
app.use(expressValidator());


const index = require('./routes/index');
const window = require('./routes/window');
app.use('/',index);
app.use('/',window);

app.get('*',(req,res)=>{
    res.render('404',{title:'404 Not Found'});
})




server.listen(process.env.PORT || port,()=>{
    console.log('server started at 3000')
})