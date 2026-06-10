function runCode(){

const code = document.getElementById("code").value;
const output = document.getElementById("output");

const lines = code.split("\n");

let result = "";
let vars = {};

for(let line of lines){

line = line.trim();

if(line.startsWith("let ")){

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

}

output.textContent = result;

}
