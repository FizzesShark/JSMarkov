const seps = /[.?!;:]/;
const END_TOKEN = '__END__';

class MarkovChain {
	constructor(n) {
		//	The n in n-gram
		this.n = n;

		//	The array storing all sentence beginnings
		this.start = [];

		//	The dictionary matching n-grams to possible values
		this.Chain = {};
	}

	//	Adding a single sentence to the chain
	trainSentence(string) {
		const words = string.split(' ').filter(s => s !== ' ').filter(s => s !== '');

		//	The sub-section of the sentence we'll be looking at
		const buffer = [];

		if (words.length <= this.n) {
			return;
		}

		this.start.push(words.slice(0, this.n + 1));
		buffer.push(words.slice(0, this.n + 1));
		words.splice(0, this.n);

		for (const w of words) {
			buffer.push(w);
			const key = buffer.slice(0, this.n);
			if (this.Chain.has(key)) {
				this.Chain[key].push(buffer[buffer.length - 1]);
			}
			else {
				this.Chain[key] = [buffer[buffer.length - 1]];
			}

			buffer.slice(1, buffer.length - 1);
		}
		if (this.Chain.has(buffer)) {
			this.Chain[buffer].push(END_TOKEN);
		}
		else {
			this.Chain[buffer] = [END_TOKEN];
		}
	}

	//	Adding a block of text
	trainCorpus(block) {
		const sentences = block.replace(/\n/g, ' ').split(seps).filter(s => s !== '');
		for (const s of sentences) {
			this.trainSentence(s);
		}
	}

	takeRandom(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	generateSentence() {
		const generated = [];
		const toadd = this.takeRandom(this.start);
		generated.push(toadd.join(' '));
		let next = this.takeRandom(this.Chain[toadd]);
		while (next !== END_TOKEN) {
			generated.push(next);
			next = this.takeRandom(this.Chain[toadd]);
			toadd.splice(0, 1).push(next);
		}
		return generated.join(' ');
	}
}