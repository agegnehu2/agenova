// lexer.js - AgeNova v0.5 Advanced Lexer with Full String Support

class Lexer {
    constructor() {
        this.keywords = ["let", "print", "if", "else", "repeat"];
    }

    tokenize(code) {
        const lines = code.split('\n');
        const tokens = [];

        for (let line of lines) {
            line = line.trim();
            if (!line) continue; // Skip empty lines

            let i = 0;
            while (i < line.length) {
                // Skip spaces
                if (/\s/.test(line[i])) {
                    i++;
                    continue;
                }

                // 1. Match Strings in double quotes (e.g., "This is FALSE!")
                if (line[i] === '"') {
                    let start = i;
                    i++; // skip open quote
                    while (i < line.length && line[i] !== '"') {
                        i++;
                    }
                    let end = i;
                    i++; // skip close quote
                    let strValue = line.substring(start + 1, end);
                    tokens.push({ type: 'STRING', value: strValue });
                    continue;
                }

                // 2. Match Math Symbols and Assignment
                if (line[i] === '=') { tokens.push({ type: 'ASSIGN', value: '=' }); i++; continue; }
                if (line[i] === '+') { tokens.push({ type: 'PLUS', value: '+' }); i++; continue; }
                if (line[i] === '-') { tokens.push({ type: 'MINUS', value: '-' }); i++; continue; }

                // 3. Match Numbers
                if (/\d/.test(line[i])) {
                    let start = i;
                    while (i < line.length && /\d/.test(line[i])) i++;
                    let numValue = parseInt(line.substring(start, i));
                    tokens.push({ type: 'NUMBER', value: numValue });
                    continue;
                }

                // 4. Match Keywords and Identifiers (Words)
                if (/[a-zA-Z_]/.test(line[i])) {
                    let start = i;
                    while (i < line.length && /[a-zA-Z0-9_]/.test(line[i])) i++;
                    let word = line.substring(start, i);

                    if (this.keywords.includes(word)) {
                        tokens.push({ type: 'KEYWORD', value: word });
                    } else {
                        tokens.push({ type: 'IDENTIFIER', value: word });
                    }
                    continue;
                }

                // Unknown character fallback
                i++;
            }
            tokens.push({ type: 'NEWLINE' });
        }
        return tokens;
    }
}
