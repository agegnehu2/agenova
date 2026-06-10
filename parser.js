class Parser {
  parse(tokens) {
    const ast = [];
    let i = 0;

    while (i < tokens.length) {
      let token = tokens[i];

      // 1. Handle PRINT statement
      if (token.type === "PRINT") {
        let nextToken = tokens[i + 1]; 
        
        ast.push({
          type: "PrintStatement",
          value: nextToken ? nextToken.value : null,
          valueType: nextToken ? nextToken.type : null
        });
        
        i += 2; 
      }
      
      // 2. Handle LET statement
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

      // 3. Handle REPEAT statement
      else if (token.type === "REPEAT") {
        let countToken = tokens[i + 1];

        ast.push({
          type: "RepeatStatement",
          count: countToken ? countToken.value : null,
          countType: countToken ? countToken.type : null
        });

        i += 2;
      }

      // 4. Handle IF statement (v0.4 - አዲሱ መዋቅር)
      else if (token.type === "IF") {
        let conditionToken = tokens[i + 1]; // Holds the condition variable name

        ast.push({
          type: "IfStatement",
          condition: conditionToken ? conditionToken.value : null,
          conditionType: conditionToken ? conditionToken.type : null
        });

        i += 2; // Move pointer by 2 since we consumed 'if' and the condition
      }
      
      // Prevent infinite loops
      else {
        i++; 
      }
    }

    return ast;
  }
}
