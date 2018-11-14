const ot = require('ot');
const windowList = {} ;

module.exports = (io)=>{

    //brodcasting
    // io.on('connection',(socket)=>{
    //     socket.broadcast.emit('announce', {
    //         message:'New Client  '
    //     });
    //     socket.on('send message',(data)=>{
    //         socket.broadcast.emit('show message',data)
    //     })
    
    // })
    
    io.on('connection',(socket)=>{
        
        let str = 
        `<!DOCTYPE html>
<html>
<head>
<style>
body{font-family:Verdana}
h1{text-align:center;}
</style>
</head>
<body>
<h1>HERE IS THE MAIN EDITOR</h1>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit minus perspiciatis ipsum dolor sit amet consectetur adipisicing quo dignissimos corporis quos sint reiciendis hic totam possimus.</p>
<img src="https://picsum.photos/200/300"/>
<img style="float:right" src="https://picsum.photos/200/300/?random"/>
</body>
<script>
        console.log("hello world!");
</script>
</html>`;
        socket.on('join window',(data)=>{
            if(!windowList[data.window]){
                const socketIOServer = new ot.EditorSocketIOServer(str,[],data.window,(socket,cb)=>{
                    cb(true);
                });
                windowList[data.window] =socketIOServer;

            }
            windowList[data.window].addClient(socket);
            windowList[data.window].setName(socket,data.username);
            socket.window = data.window;
            socket.join(data.window);
        })
        socket.on('signal',(data)=>{
            socket.to(socket.window).emit('signaling_message',{
                type:data.type,
                message:data.message
            })
        })
        socket.on('run',(data)=>{
            socket.broadcast.to(socket.window).emit('run click');
        })
        
        socket.on('send message',(data,user)=>{
            io.to(socket.window).emit('show message',{msg:data,user})
        })
        socket.on('disconnect',()=>{
            io.to(socket.window).emit('user disconnected');
            socket.leave(socket.window);
        })
    })
}




//block different id?