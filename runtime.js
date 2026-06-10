// runtime.js - AgeNova v0.5 Runtime Engine with Math & Else execution

class Runtime {
    constructor() {
        this.variables = {};
        this.output = [];
    }

    execute(ast) {
        this.output = []; // Reset output for fresh run

        for (let node of ast) {
            if (node.type === 'VAR_ASSIGN') {
                // If it's a Math Operation (e.g., let x = 5 + 3)
                if (node.value && node.value.type === 'MATH') {
                    const mathNode = node.value;
                    let leftVal = mathNode.isVarLeft ? this.variables[mathNode.left] : mathNode.left;
                    let rightVal = mathNode.isVarRight ? this.variables[mathNode.right] : mathNode.right;

                    // Convert to numbers just in case
                    leftVal = Number(leftVal);
                    rightVal = Number(rightVal);

                    let calcResult = 0;
                    if (mathNode.op === 'PLUS') {
                        calcResult = leftVal + rightVal;
                    } else if (mathNode.op === 'MINUS') {
                        calcResult = leftVal - rightVal;
                    }
                    this.variables[node.name] = calcResult;
                } else {
                    // Regular assignment
                    this.variables[node.name] = node.value;
                }
            } 
            else if (node.type === 'PRINT') {
                if (node.isVar) {
                    this.output.push(this.variables[node.value] !== undefined ? this.variables[node.value] : "Undefined Variable");
                } else {
                    this.output.push(node.value);
                }
            } 
            else if (node.type === 'IF') {
                let condVal = this.variables[node.condition];
                // Check if condition is string "true" or boolean true
                if (condVal === "true" || condVal === true) {
                    for (let subNode of node.body) {
                        if (subNode.type === 'PRINT') {
                            this.output.push(subNode.isVar ? this.variables[subNode.value] : subNode.value);
                        }
                    }
                } else {
                    // Execute ELSE block if condition is false
                    for (let subNode of node.elseBody) {
                        if (subNode.type === 'PRINT') {
                            this.output.push(subNode.isVar ? this.variables[subNode.value] : subNode.value);
                        }
                    }
                }
            } 
            else if (node.type === 'REPEAT') {
                let count = node.isVar ? this.variables[node.count] : node.count;
                count = parseInt(count);

                for (let k = 0; k < count; k++) {
                    for (let subNode of node.body) {
                        if (subNode.type === 'PRINT') {
                            this.output.push(subNode.isVar ? this.variables[subNode.value] : subNode.value);
                        }
                    }
                }
            }
        }
        return this.output.join('\n');
    }
}

