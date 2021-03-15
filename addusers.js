import fs from "fs-extra";
import path from "path";

const SOURCE_PATH = "C:\\Users\\carl\\Downloads\\vermontopia\\what is the meaning of life.txt";
const OUTPUT_PATH = "C:\\Users\\carl\\Downloads\\vermontopia\\what is the meaning of life users.txt";
const USERS_PATH = "C:\\Users\\carl\\Downloads\\Vermontopia Slack export Mar 17 2020 - Mar 15 2021\\users.json";

const users = JSON.parse(await fs.readFile(USERS_PATH));

let source = await fs.readFile(SOURCE_PATH, "utf-8");
for (const user of users) {
	source = source.split("<@" + user.id + ">").join("@" + user.name);
}
await fs.writeFile(OUTPUT_PATH, source);
