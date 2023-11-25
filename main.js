const {Client} = require("discord.js-selfbot-v13");
const client = new Client({checkUpdate: false});


const fs = require("fs");
const cfg = require("./config.json");
const prefix = "r!run";


client.on("ready", async () => {
    console.log(`${client.user.username} is ready!`);
});
client.login(cfg.token);

client.on("messageCreate", async (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (cfg.reading.toLowerCase() && message.guild.id == cfg.serverID) console.log(returnFormatted(message));
    if (cfg.writing.toLowerCase() && message.guild.id == cfg.serverID) writeOutput(returnFormatted(message));

    if (command == "cfg" && message.author == client.user) {
        configureJSON(args[0], args[1]);
    }
    if (command == "restart" && message.author == client.user) {
        restart();
    }
    if (command == "clear" && message.author == client.user) {
        clearTXT();
    }
});

function returnFormatted(msg) {
    let outputMessage;
    let channel = msg.channel.name;
    if (msg.embeds.length == 1) {
        let title = msg.embeds[0].title;
        let desc = msg.embeds[0].description;
        outputMessage = `title: ${title}. ${desc ? "text: " + desc : ""}  channel: ${channel}.\n`;
    } else {
        let content = msg.content;
        let author = msg.author.username;
        outputMessage = `text: ${content}. channel: ${channel}. author: ${author}.\n`;
    }
    return outputMessage;
}

function writeOutput(data) {
    fs.appendFile("./output.txt", data, (err) => {
        if (err) throw err;
    });
}

function configureJSON(setting, value) {
    fs.readFile("./config.json", (err, data) => {
        if (err) throw err;
        let cfg = JSON.parse(data);
        cfg[setting] = value;
        fs.writeFile("./config.json", JSON.stringify(cfg, null), (err) => {
            if (err) throw err;
            console.log(`Successfully! Current value of ${cfg[setting]}: ${value}.`);
        });
    });
}

function clearTXT() {
    fs.writeFile("./output.txt", "cleared", (err) => {
        if (err) throw err;
    });

}

function restart() {
    console.log("Restarting...");
    process.exit().then(() => {
        client.login(cfg.token);
    });
}