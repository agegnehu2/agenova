class Lexer {

  tokenize(code) {

    const lines = code.split("\n");
    const tokens = [];

    for (let line of lines) {

      line = line.trim();

            // Handle 'print' statement (e.g., print x or print "Hello")
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
      
      }
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
      
      

    }

    return tokens;

  }

}
