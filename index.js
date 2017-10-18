/*jshint esversion: 6, node: true*/
'use strict';

// put your solution in this method
function solution(toPrint, toRead) {

    const startAll = new Date();

    let input;

    while(input = readline()) {

        log(`read ${input}`);

        const match = input.match(/0[xX][\da-fA-F]+/g);

        if(match) {
            match
                .forEach((m) => {

                    const dec = parseInt(m, 16);
                    log(`m is ${m} dec is ${dec}, dec.toString(16).toLowerCase(): ${dec.toString(16).toLowerCase()}`)

                    if('0x' + dec.toString(16).toLowerCase() === m.toLowerCase()) {
                        print(`${m} ${dec}`);
                    }
                });
        }
    }

    log(`Solved ALL in ${new Date() - startAll}`);
}

// run solution without any params for kattis
if (typeof process === 'undefined' || process.release.name !== 'node') {

    solution();
}

// node js internals below -----------------------------------------------------

function init(toPrint, toRead) {

    // replace global functions with ones for node or tests
    // kattis is using 'print' and 'readline' for standard I/O
    if (typeof global !== 'undefined') {
        global.print = toPrint;
        global.readline = toRead;
    }
}

// interactive mode - input from command line
if (typeof process !== 'undefined' && process.argv[2] === 'i') {

    const Readline = require('readline');
    const input = [];

    const inputProcessor = Readline.createInterface({input: process.stdin, output: process.stdout});

    inputProcessor.on('line', (line) => {

        input.push(line);

        if (!line) {
            inputProcessor.close();
        }
    });

    inputProcessor.on('close', () => {

        init(console.log, () => input.shift());

        solution();
    });
}

// input from process params
if (typeof process !== 'undefined' && process.argv[2] && process.argv[2] !== 'i') {

    const input = process.argv[2].split('\\n');
    init(console.log, () => input.shift());

    solution();
}

function log() {

    if (typeof process !== 'undefined' && process.release.name === 'node') {
        console.log.call(this, ...arguments);
    }
}

if (typeof module !== 'undefined') {
    module.exports.solution = solution;
    module.exports.init = init;
}
