class Parser {
  parse(tokens) {
    const ast = [];
    let i = 0;

    while (i < tokens.length) {
      let token = tokens[i];

      // 1. Handle PRINT statement (e.g., print x)
      if (token.type === "PRINT") {
        let nextToken = tokens[i + 1]; 
        
        ast.push({
          type: "PrintStatement",
          value: nextToken ? nextToken.value : null,
          valueType: nextToken ? nextToken.type : null
        });
        
        i += 2; 
      }
      
      // 2. Handle LET statement (e.g., let x = 5)
      else if (token.type === "LET") {
        let idToken = tokens[i + 1];      
        let assignToken = tokens[i + 2];  
        let valToken = tokens[i + 3];     

        ast.push({
          type: "VariableDeclaration",
          name: idToken ? idToken.value : null,
          value: valToken ? valToken.value : null,
          valueType: valToken ? valToken.type : null
        });
        
        i += 4; 
      } 

      // 3. Handle REPEAT statement (e.g., repeat 3)
      else if (token.type === "REPEAT") {
        let countToken = tokens[i + 1]; // Holds the number or variable name

        ast.push({
          type: "RepeatStatement",
          count: countToken ? countToken.value : null,
          countType: countToken ? countToken.type : null // NUMBER or IDENTIFIER
        });

        i += 2; // Move pointer by 2 since we consumed 'repeat' and the count
      }
      
      // Prevent infinite loops
      else {
        i++; 
      }
    }

    return ast;
  }
}
