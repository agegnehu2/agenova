function runCode(){

const code =
document.getElementById("code").value;

const output =
document.getElementById("output");

const lines = code.split("\n");

let result = "";

for(let line of lines){

line = line.trim();

if(line.startsWith("print ")){

let text =
line.substring(6).replaceAll('"',"");

result += text + "\n";

}

}

output.textContent = result;

}
