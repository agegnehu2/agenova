// parser.js - AgeNova v0.5 Parser supporting Math & Else structures

class Parser {
    parse(tokens) {
        const ast = [];
        let i = 0;

        while (i < tokens.length) {
            let token = tokens[i];

            if (token.type === 'NEWLINE') {
                i++;
                continue;
            }

            if (token.type === 'KEYWORD') {
                if (token.value === 'let') {
                    const id = tokens[i + 1].value;
                    const assign = tokens[i + 2];
                    const valToken = tokens[i + 3];

                    // Check for Math Operations (e.g., let x = 5 + 3)
                    if (tokens[i + 4] && (tokens[i + 4].type === 'PLUS' || tokens[i + 4].type === 'MINUS')) {
                        const op = tokens[i + 4].type;
                        const nextVal = tokens[i + 5];
                        ast.push({
                            type: 'VAR_ASSIGN',
                            name: id,
                            value: {
                                type: 'MATH',
                                left: valToken.value,
                                op: op,
                                right: nextVal.value,
                                isVarLeft: valToken.type === 'IDENTIFIER',
                                isVarRight: nextVal.type === 'IDENTIFIER'
                            }
                        });
                        i += 6;
                    } else {
                        // Standard assignment
                        ast.push({
                            type: 'VAR_ASSIGN',
                            name: id,
                            value: valToken.value,
                            valType: valToken.type
                        });
                        i += 4;
                    }
                } 
                else if (token.value === 'print') {
                    ast.push({ type: 'PRINT', value: tokens[i + 1].value, isVar: tokens[i + 1].type === 'IDENTIFIER' });
                    i += 2;
                } 
                else if (token.value === 'if') {
                    const condition = tokens[i + 1].value;
                    i += 2;
                    if (tokens[i] && tokens[i].type === 'NEWLINE') i++;

                    const ifBody = [];
                    while (i < tokens.length && !(tokens[i].type === 'KEYWORD' && (tokens[i].value === 'else' || tokens[i].value === 'if' || tokens[i].value === 'repeat' || tokens[i].value === 'let'))) {
                        if (tokens[i].type === 'KEYWORD' && tokens[i].value === 'print') {
                            ifBody.push({ type: 'PRINT', value: tokens[i + 1].value, isVar: tokens[i + 1].type === 'IDENTIFIER' });
                            i += 2;
                        } else {
                            i++;
                        }
                    }

                    let elseBody = [];
                    if (i < tokens.length && tokens[i].type === 'KEYWORD' && tokens[i].value === 'else') {
                        i++; // consume 'else'
                        if (tokens[i] && tokens[i].type === 'NEWLINE') i++;
                        while (i < tokens.length && !(tokens[i].type === 'KEYWORD' && (tokens[i].value === 'if' || tokens[i].value === 'repeat' || tokens[i].value === 'let'))) {
                            if (tokens[i].type === 'KEYWORD' && tokens[i].value === 'print') {
                                elseBody.push({ type: 'PRINT', value: tokens[i + 1].value, isVar: tokens[i + 1].type === 'IDENTIFIER' });
                                i += 2;
                            } else {
                                i++;
                            }
                        }
                    }

                    ast.push({ type: 'IF', condition: condition, body: ifBody, elseBody: elseBody });
                } 
                else if (token.value === 'repeat') {
                    const countToken = tokens[i + 1];
                    i += 2;
                    if (tokens[i] && tokens[i].type === 'NEWLINE') i++;

                    const loopBody = [];
                    while (i < tokens.length && !(tokens[i].type === 'KEYWORD' && (tokens[i].value === 'let' || tokens[i].value === 'if' || tokens[i].value === 'repeat'))) {
                        if (tokens[i].type === 'KEYWORD' && tokens[i].value === 'print') {
                            loopBody.push({ type: 'PRINT', value: tokens[i + 1].value, isVar: tokens[i + 1].type === 'IDENTIFIER' });
                            i += 2;
                        } else {
                            i++;
                        }
                    }
                    ast.push({ type: 'REPEAT', count: countToken.value, isVar: countToken.type === 'IDENTIFIER', body: loopBody });
                }
            } else {
                i++;
            }
        }
        return ast;
    }
                              }
                                           
