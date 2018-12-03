const Frugal = require('./src/index.js').Fragual_2U;
const random = Math.random;

function sample(){
	var f = new Frugal(0.5, 80);
	for(let i=0;i<100;i++){
		f.insert(streamProducer());
	}
	console.log(f.estimater());
}

function streamProducer(){
	return parseInt(60 + 140*random())
}

sample();