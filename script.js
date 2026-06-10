// script.js - Connecting Lexer, Parser, and Runtime to the Browser UI

function runCode() {
    // 1. Get elements from your HTML using the correct IDs
    const codeInput = document.getElementById("code-input").value;
    const outputElement = document.getElementById("output-screen");

    try {
        // 2. Run the Lexer to break code into tokens
        const lexer = new Lexer();
        const tokens = lexer.tokenize(codeInput);

        // 3. Run the Parser to structure tokens into an AST
        const parser = new Parser();
        const ast = parser.parse(tokens);

        // 4. Run the Runtime engine to execute the AST and get the output
        const runtime = new Runtime();
        const result = runtime.execute(ast);

        // 5. Display the final result in the browser
        outputElement.textContent = result;

    } catch (error) {
        // Catch and display any engine errors clearly
        outputElement.textContent = "Execution Error: " + error.message;
    }
}

// Attach the runCode function to the button click event
document.getElementById("run-btn").addEventListener("click", runCode);
