class Compiler {

  compile(ast) {

    let jsCode = "";

    for (let node of ast) {

      if (node.type === "PrintStatement") {

        jsCode +=
          "console.log(" +
          node.value +
          ");\n";

      }

    }

    return jsCode;

  }

}
