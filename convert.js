import fs from "fs-extra";
import path from "path";

const SOURCE_PATH = "C:\\Users\\carl\\Downloads\\Vermontopia Slack export Mar 17 2020 - Mar 15 2021";
const OUTPUT_PATH = "C:\\Users\\carl\\Downloads\\vermontopia training.txt";

// const users = JSON.parse(await fs.readFile(path.join(SOURCE_PATH, "user.json")));

const dirs = await fs.readdir(SOURCE_PATH);
const output = fs.createWriteStream(OUTPUT_PATH);
for (const dir of dirs) {
	const stat = await fs.stat(path.join(SOURCE_PATH, dir));
	if (stat.isDirectory()) {
		const files = await fs.readdir(path.join(SOURCE_PATH, dir));
		for (const file of files) {
			const json = JSON.parse(await fs.readFile(path.join(SOURCE_PATH, dir, file), "utf-8"));
			for (const message of json) {
				if (message.subtype !== undefined) continue;
				// if (message.includes("<@")) {
				// 	for (const user of users) {
				// 		message = message.replace(user.id, user.name);
				// 	}
				// }
				output.write(message.text + "\n");
			}
		}
	}
}
output.close();