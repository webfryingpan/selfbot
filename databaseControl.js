import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize("selfbot", "root", "password", {
    host: "localhost",
    dialect: "mysql"
});

class MessageModel extends Model {}

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

/*
async function getMessages() {
    try {
        const messages = await MessageModel.findAll({ raw: true });
        console.log(messages);
    } catch (error) {
        console.error("Error retrieving messages:", error);
    }
}
*/

async function truncateMessages() {
    try {
        await MessageModel.destroy({ truncate: true });
        console.log("Messages truncated successfully.");
    } catch (error) {
        console.error("Error truncating messages:", error);
    }
}

async function insertMessage(object) {
    try {
        const message = await MessageModel.create(object);
        console.log("MessageModel inserted successfully:", message.toJSON());
    } catch (error) {
        console.error("Error inserting message:", error);
    }
}

export { insertMessage, truncateMessages };