class Parser {

  parse(tokens) {

    const ast = [];

    for (let token of tokens) {

      if (token.type === "PRINT") {

        ast.push({
          type: "PrintStatement",
          value: token.value
        });

      }

      else if (token.type === "LET") {

        ast.push({
          type: "VariableDeclaration",
          value: token.value
        });

      }

    }

    return ast;

  }

}
