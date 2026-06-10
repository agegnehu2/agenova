class Runtime {
  execute(ast) {
    let output = "";
    const variables = {}; // Memory block to store variable names and values

    for (let node of ast) {
      if (node.type === "PrintStatement") {
        let valueToPrint = node.value;

        // If the print statement is referencing a variable name
        if (node.valueType === "IDENTIFIER") {
          if (variables[node.value] !== undefined) {
            valueToPrint = variables[node.value]; // Fetch value from memory
          } else {
            valueToPrint = `ReferenceError: ${node.value} is not defined`;
          }
        }

        output += valueToPrint + "\n";
      } 
      else if (node.type === "VariableDeclaration") {
        // Store the variable name and its assigned value in memory
        variables[node.name] = node.value;
      }
    }

    return output;
  }
}
