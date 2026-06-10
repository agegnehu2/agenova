function runCode(){

const code = document.getElementById("code").value;
const output = document.getElementById("output");

const lines = code.split("\n");

let result = "";
let vars = {};
let functions = {};
for(let i = 0; i < lines.length; i++){

let line = lines[i].trim();

if(line.startsWith("let ")){
else if(line.startsWith("func ")){

const funcName =
line.replace("func","").trim();

functions[funcName] =
lines[i + 1].trim();

}
const parts = line.split("=");

const name =
parts[0].replace("let","").trim();

const value =
parts[1].replaceAll('"',"").trim();

vars[name] = value;

}

else if(line.startsWith("print ")){

let text =
line.substring(6).trim();

text = text.replaceAll('"',"");

if(vars[text]){

result += vars[text] + "\n";

}else{

result += text + "\n";

}

}

else if(line.startsWith("repeat ")){

const count =
parseInt(line.replace("repeat","").trim());

let nextLine =
lines[i + 1].trim();

if(nextLine.startsWith("print ")){

let text =
nextLine.substring(6).replaceAll('"',"");

for(let j = 0; j < count; j++){

result += text + "\n";

}

}

}

}

output.textContent = result;

}
else if(line.startsWith("if ")){

const condition =
line.replace("if","").trim();

const nextLine =
lines[i + 1].trim();

if(condition === "true"){

if(nextLine.startsWith("print ")){

let text =
nextLine.substring(6)
.replaceAll('"',"");

result += text + "\n";

}

}

}
