const M = require('./markov.js');
const m = new M(1);

const s1 = 'Yes No';
const s2 = 'Yes Yes No';
m.trainSentence(s1);
m.trainSentence(s2);
console.log(m.generateSentence());
console.log(['Yes', 'No'].slice(0, 1));