class Runtime {

  execute(ast) {

    let output = "";

    for (let node of ast) {

      if (node.type === "PrintStatement") {

        output += node.value.replaceAll('"', '') + "\n";

      }

      else if (node.type === "VariableDeclaration") {

        // Variable support coming soon

      }

    }

    return output;

  }

}
