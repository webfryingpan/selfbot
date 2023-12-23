/**
 * @fileOverview This file contains the MessageModel model and functions for interacting with the messages table.
 * @module message
 */

/**
 * Import Sequelize, DataTypes, and Model modules.
 * @external {Sequelize} https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html
 * @external {DataTypes} https://sequelize.org/master/class/lib/data-types.js~DataTypes.html
 * @external {Model} https://sequelize.org/master/class/lib/model.js~Model.html
 */
import { Sequelize, DataTypes, Model } from "sequelize";

/**
 * Create a new Sequelize instance with the specified database name, username, password, and options.
 * @type {Sequelize}
 */
const sequelize = new Sequelize("selfbot", "root", "password", {
    host: "localhost",
    dialect: "mysql"
});

/**
 * Define the MessageModel model with the specified fields.
 * @extends {Model}
 */
class MessageModel extends Model {}

/**
 * Initialize the MessageModel model with the specified fields and options.
 * @param {Object} sequelize - The Sequelize instance to use.
 * @param {string} tableName - The name of the table to use.
 * @returns {void}
 */
MessageModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        message_id: DataTypes.STRING(25),
        author_id: DataTypes.STRING(25),
        channel_id: DataTypes.STRING(25),
        content: DataTypes.TEXT
    },
    { sequelize, tableName: "messages" }
);

/**
 * Truncate all messages from the messages table.
 * @async
 * @returns {Promise<void>}
 */
async function truncateMessages() {
    try {
        await MessageModel.destroy({ truncate: true });
        console.log("Messages truncated successfully.");
    } catch (error) {
        console.error("Error truncating messages:", error);
        throw error;
    }
}

/**
 * Insert a new message into the messages table.
 * @async
 * @param {Object} object - The message object to insert.
 * @returns {Promise<void>}
 */
async function insertMessage(object) {
    try {
        const message = await MessageModel.create(object);
        console.log("MessageModel inserted successfully:", message.toJSON());
    } catch (error) {
        console.error("Error inserting message:", error);
        throw error;
    }
}

/**
 * Export the insertMessage and truncateMessages functions.
 * @type {Object}
 * @property {Function} insertMessage - The insertMessage function.
 * @property {Function} truncateMessages - The truncateMessages function.
 */
export { insertMessage, truncateMessages };

/**
 * Retrieve all messages from the messages table.
 * @async
 * @returns {Promise<Array<Object>>} - An array of message objects.
 * @todo Implement this function.
 */
/*
async function getMessages() {
    try {
        const messages = await MessageModel.findAll({ raw: true });
        console.log(messages);
        return messages;
    } catch (error) {
        console.error("Error retrieving messages:", error);
        throw error;
    }
}
*/
