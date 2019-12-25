const M = require('./markov.js');
const fs = require('fs');
const m = new M(1);

fs.readFile('./alice_oz.txt', 'utf-8', (err, data) => {
	if (err) throw err;

	m.trainCorpus(data);
	console.log(m.generateSentence());
});