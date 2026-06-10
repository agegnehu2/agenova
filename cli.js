const fs = require("fs");

const file = process.argv[2];

if (!file) {
  console.log("Usage: node cli.js <file.age>");
  process.exit(1);
}

const code = fs.readFileSync(file, "utf8");

const lines = code.split("\n");

for (let line of lines) {

  line = line.trim();

  if (line.startsWith("print ")) {

    const text =
      line.substring(6).replaceAll('"', '');

    console.log(text);

  }

}
