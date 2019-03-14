function getHistory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
    if (num === "") {
        document.getElementById("output-value").innerText = num;
    } else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}

function getFormattedNumber(num) {
    if (num === "-") {
        return "";
    }
    let n = Number(num);
    return n.toLocaleString("en");
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

let operator = document.getElementsByClassName("operator");
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id === "clear") {
            printOutput("");
            printHistory("");
        } else if (this.id === "backspace") {
            let output = reverseNumberFormat(getOutput().toString());
            if (output) {
                printOutput(output.toString().slice(0,-1));
            }
        } else {
            let output = getOutput();
            let history = getHistory();
            if (output==="" && history!=="") {
                if (isNaN(history[history.length-1])) {
                    console.log("last char is operator");
                    history = history.toString().slice(0,-1);
                }
            }
            if (output!=="" || history!=="") {
                output= output===""?
                    output: reverseNumberFormat(output);
                history=history+output;
                if (this.id === "=") {
                    printOutput(eval(history));
                    printHistory("");
                } else {
                    history += this.id;
                    printHistory(history);
                    printOutput("")
                }
            }

        }
    });
}

let number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        let output = reverseNumberFormat(getOutput());
        if (!isNaN(output)) {
            output += this.id;
            printOutput(output)
        }

    })
}