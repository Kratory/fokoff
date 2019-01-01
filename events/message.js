module.exports = (client, message) => {
    const config = require("../config.json");

    /* ---------------------- ROLES ---------------------- */
	const hwid = message.guild.roles.find(role => role.name === "HWID");

    if(!hwid) return console.log("<!>Failed finding HWID role");
    /* ---------------------- ROLES ---------------------- */

    // Ignore other bots, and self.
    if(message.author.bot) return undefined;

    // Ignore messages not starting with prefix
    if(message.content.indexOf(config.PREFIX) !== 0) return undefined;

    // Ignore messages from non MOD/ADMIN members
    if(!message.member.roles.has(hwid.id)){
        return undefined;
    }

    // Args for commands
    const hargs = message.content.split(' ');

    const args = message.content.slice(config.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    // Command data from client.commands Enmap
    const cmd = client.commands.get(command);
    // If cmd not found
    if(!cmd) return undefined;

    // Run the command
    cmd.run(client, message, args);
}