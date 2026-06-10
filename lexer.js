class Lexer {

  tokenize(code) {

    const lines = code.split("\n");
    const tokens = [];

    for (let line of lines) {

      line = line.trim();

      if (line.startsWith("print")) {
        tokens.push({
          type: "PRINT",
          value: line.substring(6)
        });
      }

      else if (line.startsWith("let")) {
        tokens.push({
          type: "LET",
          value: line.substring(4)
        });
      }

    }

    return tokens;

  }

}
