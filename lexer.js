// lexer.js - AgeNova v0.5 Lexer with Math & Else Support

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

            // Match strings in quotes
            const stringMatch = line.match(/^let\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*"([^"]*)"$/);
            if (stringMatch) {
                tokens.push({ type: 'KEYWORD', value: 'let' });
                tokens.push({ type: 'IDENTIFIER', value: stringMatch[1] });
                tokens.push({ type: 'ASSIGN', value: '=' });
                tokens.push({ type: 'STRING', value: stringMatch[2] });
                tokens.push({ type: 'NEWLINE' });
                continue;
            }

            const words = line.split(/\s+/);
            for (let word of words) {
                if (this.keywords.includes(word)) {
                    tokens.push({ type: 'KEYWORD', value: word });
                } else if (word === '=') {
                    tokens.push({ type: 'ASSIGN', value: '=' });
                } else if (word === '+') {
                    tokens.push({ type: 'PLUS', value: '+' });
                } else if (word === '-') {
                    tokens.push({ type: 'MINUS', value: '-' });
                } else if (/^\d+$/.test(word)) {
                    tokens.push({ type: 'NUMBER', value: parseInt(word) });
                } else {
                    tokens.push({ type: 'IDENTIFIER', value: word });
                }
            }
            tokens.push({ type: 'NEWLINE' });
        }
        return tokens;
    }
}
