const config = require('../config.json');
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "--",
    user: "--",
    password: "--",
    database: "--"
});

exports.run = (client, message, hargs) => {
    
    if(!hargs[0])
        return message.channel.sendCode("asciidoc", `= USAGE =\n\n!hwid lock/unlock/list/get [username]/[resets]\n= lock = HWID LOCKS THE GIVEN USERNAME\n= unlock = HWID UNLOCKS THE GIVEN USERNAME\n= list = DISPLAYS LOCKED USERS/HWID RESETS IF PROVIDED PARAM "resets"\n= get = RETURNS GIVEN USER HWID`);
    
    const option = hargs[0];
    const username = hargs[1];

    switch(option){
        case "lock":
            if(!hargs[1]) return message.channel.send("You need to feed me a username, dumbfuck.");
            
                con.query(`LOCK QUERY`, function(err, result, fields){
                    if(err) throw err;
                    else {
                        if(result.changedRows === 0) return message.channel.send("Username invalid. Try again cunt.");
                        return message.channel.send(`User ${username} locked succesfully.`);
                    }
                });
            
            break;

        case "unlock":
            if(!hargs[1]) return message.channel.send("You need to feed me a username, dumbfuck.");
            
                con.query(`UNLOCK QUERY'`, function(err, result, fields){
                    if(err) throw err;
                    else {
                        if(result.changedRows === 0) return message.channel.send("Username invalid. Try again cunt.");
                        return message.channel.send(`User ${username} unlocked succesfully.`);
                    }
                });
            
            break;

        case "get":
            if(!hargs[1]) return message.channel.send("You need to feed me a username, dumbfuck.");
            
                con.query(`GET HWID QUERY'`, function(err, result, fields){
                    if(err) throw err;
                    return message.channel.sendCode("asciidoc", `${username}\n------------------\n${result.map(r=>`${r.hwid}`).join("\n")}\n------------------`);
                });
            
            break;

        case "list":
            if(hargs[1] !== "resets"){
                
                    con.query("LOCKED USERS QUERY", function(err, result, fields){
                        if(err) throw err;
                        return message.channel.sendCode("asciidoc", `LOCKED USERS\n------------------\n${result.map(r=>`${r.username}`).join("\n")}\n------------------`);
                    });
                 
            }
            else{
               
                    con.query("RESETS BY USER QUERY", function(err, result, fields){
                        if(err) throw err;
                        return message.channel.sendCode("asciidoc", `HWID RESETS\n------------------\n${result.map(r=>`${r.username} :: ${r.hwid_reset_count}`).join("\n")}\n------------------`);
                    });
                
            }
            break;

        /*case "playing":
            con.query("PLAYING USERS QUERY", function(err, result, fields){
                if(err) throw err;
                return message.channel.sendCode("asciidoc", `USERS PLAYING\n------------------\n${result.map(r=>`${r.username}`).join("\n")}\n------------------`);
            });
            break;*/

        default:
            return message.channel.send("Invalid parameter, use !hwid with no aditional parameters to get command help.");
    }
};