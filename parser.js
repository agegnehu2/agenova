class Parser {
  parse(tokens) {
    const ast = [];
    let i = 0;

    while (i < tokens.length) {
      let token = tokens[i];

      // 1. Handle PRINT statement (e.g., print x)
      if (token.type === "PRINT") {
        // The next token holds the value to be printed
        let nextToken = tokens[i + 1]; 
        
        ast.push({
          type: "PrintStatement",
          value: nextToken ? nextToken.value : null,
          valueType: nextToken ? nextToken.type : null // To identify if it's a STRING or IDENTIFIER
        });
        
        i += 2; // Move pointer by 2 since we consumed 'print' and the value
      }
      
      // 2. Handle LET statement (e.g., let x = 5)
      else if (token.type === "LET") {
        let idToken = tokens[i + 1];      // Variable name (e.g., x)
        let assignToken = tokens[i + 2];  // Assignment operator (=)
        let valToken = tokens[i + 3];     // Value to store (e.g., 5)

        ast.push({
          type: "VariableDeclaration",
          name: idToken ? idToken.value : null,
          value: valToken ? valToken.value : null,
          valueType: valToken ? valToken.type : null // To identify if it's a NUMBER or STRING
        });
        
        i += 4; // Move pointer by 4 since we consumed all 4 tokens
      } 
      
      // Prevent infinite loops by advancing the pointer if an unknown token is met
      else {
        i++; 
      }
    }

    return ast;
  }
}

