class Lexer {
  tokenize(code) {
    const lines = code.split("\n");
    const tokens = [];

    for (let line of lines) {
      line = line.trim();

      // 1. Handle 'print' statement (e.g., print x or print "Hello")
      if (line.startsWith("print")) {
        tokens.push({ type: "PRINT", value: "print" });
        
        let valueStr = line.substring(6).trim();
        
        // Check if it's a literal String in quotes
        if (valueStr.startsWith('"') && valueStr.endsWith('"')) {
          tokens.push({ type: "STRING", value: valueStr.replace(/"/g, "") });
        } else {
          // If not in quotes, treat it as a Variable name (Identifier)
          tokens.push({ type: "IDENTIFIER", value: valueStr }); 
        }
      }
      
      // 2. Handle 'let' statement (e.g., let x = 5)
      else if (line.startsWith("let")) {
        const parts = line.split(/\s+/); 
        
        if (parts[0] === "let") {
          tokens.push({ type: "LET", value: "let" });
        }
        if (parts[1]) {
          tokens.push({ type: "IDENTIFIER", value: parts[1] }); 
        }
        if (parts[2] === "=") {
          tokens.push({ type: "ASSIGNMENT", value: "=" }); 
        }
        if (parts[3]) {
          const isNum = !isNaN(parts[3]);
          tokens.push({ 
            type: isNum ? "NUMBER" : "STRING", 
            value: parts[3].replace(/"/g, "") 
          });
        }
      }

      // 3. Handle 'repeat' statement (e.g., repeat 3)
      else if (line.startsWith("repeat")) {
        const parts = line.split(/\s+/);
        
        if (parts[0] === "repeat") {
          tokens.push({ type: "REPEAT", value: "repeat" });
        }
        if (parts[1]) {
          const isNum = !isNaN(parts[1]);
          tokens.push({ 
            type: isNum ? "NUMBER" : "IDENTIFIER", 
            value: parts[1] 
          });
        }
      }
    }

    return tokens;
  }
}

