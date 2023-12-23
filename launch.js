import SelfBot from "./selfbot.js";
import cfg from "./config.json" assert { type: "json" };

const selfBot = new SelfBot(cfg);

selfBot.login();
