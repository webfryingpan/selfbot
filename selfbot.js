import { Client } from "discord.js-selfbot-v13";
import { insertMessage, truncateMessages } from "./databaseControl.js";
import fs from "fs";

/**
 * SelfBot class representing a Discord selfbot functionality.
 */
class SelfBot {
    /**
     * @param {Object} config - Configuration object.
     */
    constructor(config) {
        this.client = new Client();
        this.config = config;
        this.client.on("ready", () => {
            console.log(`${this.client.user.username} is ready!`);
        });
        this.client.on("messageCreate", (message) => {
            this.handleMessage(message);
        });
    }

    /**
     * Handles incoming messages.
     * @param {Object} message - Discord message object.
     */
    handleMessage(message) {
        const { prefix, writing, reading, server_id, save_to_db } = this.config;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        const guild = message.guild;
        const eligibleId = server_id;

        // Passive commands
        if (!!reading && guild == eligibleId) {
            console.log(this.formatMessage(message));
        }
        if (!!writing && guild == eligibleId) {
            this.writeOutput(this.formatMessage(message));
        }
        if (!!save_to_db && guild == eligibleId) {
            this.saveToDB(message);
        }
        // Custom commands
        if (command === "clear" && message.author === this.client.user) {
            this.clearOutputFile();
        }
        if (command === "truncate" && message.author === this.client.user) {
            truncateMessages();
        }
    }

    saveToDB(msg) {
        insertMessage({
            message_id: msg.id,
            author_id: msg.author.id,
            channel_id: msg.channel.id,
            content: msg.content
        });
    }

    /**
     * Formats a Discord message.
     * @param {Object} msg - Discord message object.
     * @returns {string} - Formatted message string.
     */
    formatMessage(msg) {
        const { channel, author, embeds, content } = msg;
        const channelName = channel?.name || "Direct Message";

        if (embeds.length > 0) {
            const { title, description } = embeds[0];
            return `title: ${title || ""}. description: ${description || ""}. author: ${author.username} channel: ${channelName}\n`;
        } else {
            return `content: ${content || ""}. author: ${author.username} channel: ${channelName}\n`;
        }
    }

    /**
     * Writes output data to a file.
     * @param {string} data - Data to write to the file.
     */
    writeOutput(data) {
        fs.appendFile("./output.txt", data, () => {});
    }

    /**
     * Clears the content of the output file.
     */
    clearOutputFile() {
        fs.writeFile("./output.txt", "", () => {});
    }

    /**
     * Logs in the Discord client using the provided token.
     */
    login() {
        this.client.login(this.config.token);
    }
}

export default SelfBot;