class Lexer {
  tokenize(code) {
    const lines = code.split("\n");
    const tokens = [];

    for (let line of lines) {
      line = line.trim();

      // 1. Handle 'print' statement
      if (line.startsWith("print")) {
        tokens.push({ type: "PRINT", value: "print" });
        let valueStr = line.substring(6).trim();
        if (valueStr.startsWith('"') && valueStr.endsWith('"')) {
          tokens.push({ type: "STRING", value: valueStr.replace(/"/g, "") });
        } else {
          tokens.push({ type: "IDENTIFIER", value: valueStr }); 
        }
      }
      
      // 2. Handle 'let' statement
      else if (line.startsWith("let")) {
        const parts = line.split(/\s+/); 
        if (parts[0] === "let") tokens.push({ type: "LET", value: "let" });
        if (parts[1]) tokens.push({ type: "IDENTIFIER", value: parts[1] }); 
        if (parts[2] === "=") tokens.push({ type: "ASSIGNMENT", value: "=" }); 
        if (parts[3]) {
          const isNum = !isNaN(parts[3]);
          tokens.push({ 
            type: isNum ? "NUMBER" : "STRING", 
            value: parts[3].replace(/"/g, "") 
          });
        }
      }

      // 3. Handle 'repeat' statement (v0.3 - የሰራኸው እንዳለ አለ)
      else if (line.startsWith("repeat")) {
        const parts = line.split(/\s+/);
        if (parts[0] === "repeat") tokens.push({ type: "REPEAT", value: "repeat" });
        if (parts[1]) {
          const isNum = !isNaN(parts[1]);
          tokens.push({ type: isNum ? "NUMBER" : "IDENTIFIER", value: parts[1] });
        }
      }

      // 4. Handle 'if' statement (v0.4 - አዲሱ ባህሪ)
      else if (line.startsWith("if")) {
        const parts = line.split(/\s+/);
        if (parts[0] === "if") tokens.push({ type: "IF", value: "if" });
        if (parts[1]) tokens.push({ type: "IDENTIFIER", value: parts[1] });
      }
    }
    return tokens;
  }
}
