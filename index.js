const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const socket = require("socket.io");

app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use(cors()) ;
app.use(express.json());

app.use("/", userRoute);

const server = app.listen(4000, () => {
  console.log("Server is listening on port", 4000);
});


const io=socket(server)

var userConnection=[];
io.on("connection",(socket)=>{
    socket.on("user_info_signaling_server",(data)=>{
        var other_users=userConnection.filter(p=>p.meeting_id==data.meeting_id)
        userConnection.push({
            connectionId:socket.id,
            user_id:data.current_user_name,
            meeting_id:data.meeting_id
        })
        //console.log("other users",other_users );
        //console.log("current users",userConnection );

        other_users.forEach(user=>{
            socket.to(user.connectionId).emit('other_users_to_inform',{
                other_user_id:data.current_user_name,
                connId:socket.id
            })
        })

        socket.emit("newConnectionInformation",other_users)
    })
})
