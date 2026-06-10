class Runtime {
  execute(ast) {
    let output = "";
    const variables = {}; // Memory block to store variable names and values

    for (let i = 0; i < ast.length; i++) {
      let node = ast[i];

      // 1. Handle PRINT Statement
      if (node.type === "PrintStatement") {
        let valueToPrint = node.value;

        if (node.valueType === "IDENTIFIER") {
          if (variables[node.value] !== undefined) {
            valueToPrint = variables[node.value]; // Fetch from memory
          } else {
            valueToPrint = `ReferenceError: ${node.value} is not defined`;
          }
        }
        output += valueToPrint + "\n";
      } 
      
      // 2. Handle LET Statement (Variable Declaration)
      else if (node.type === "VariableDeclaration") {
        variables[node.name] = node.value;
      }

      // 3. Handle REPEAT Statement (v0.3 Feature)
      else if (node.type === "RepeatStatement") {
        let loopCount = 0;

        // Determine if the loop count is a number or a variable reference
        if (node.countType === "NUMBER") {
          loopCount = parseInt(node.count, 10);
        } else if (node.countType === "IDENTIFIER") {
          if (variables[node.count] !== undefined) {
            loopCount = parseInt(variables[node.count], 10); // Fetch count from memory
          } else {
            output += `ReferenceError: Loop counter variable '${node.count}' is not defined\n`;
            continue;
          }
        }

        // The very next statement in the AST is the block to be repeated
        let nextNode = ast[i + 1];
        
        if (nextNode && nextNode.type === "PrintStatement") {
          let valueToPrint = nextNode.value;

          // If the inside print uses a variable
          if (nextNode.valueType === "IDENTIFIER") {
            if (variables[nextNode.value] !== undefined) {
              valueToPrint = variables[nextNode.value];
            } else {
              valueToPrint = `ReferenceError: ${nextNode.value} is not defined`;
            }
          }

          // Run the loop to repeat the print statement
          for (let j = 0; j < loopCount; j++) {
            output += valueToPrint + "\n";
          }

          i++; // Skip the next node in the main loop since we already executed it here
        }
      }
    }

    return output;
  }
}

