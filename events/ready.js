
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "--",
    user: "--",
    password: "--",
    database: "--"
});

module.exports = (client) => {
    console.log("Ready to spread mayhem!");

    client.user.setStatus('idle');
    /*setInterval(() => {
            con.query("PLAYER COUNT QUERY ", function(err, result, fields){
                if(err) throw err;
                client.user.setPresence({
                    game:{
                        name: `${result[0].playingCount} Resurrection users`,
                        type: "WATCHING"
                    }
                });
            });
    }, 30000);*/
   
    client.user.setPresence({
        game:{
            name: "666 Resurrection users",
            type: "WATCHING"
        }
    })
}