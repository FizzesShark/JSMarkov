const M = require('./markov.js');
const fs = require('fs');
const m = new M(3);

const text = fs.readFileSync('./alice_oz.txt').toString();

m.trainCorpus(text);
console.log(m.generateSentence());