function softmax(output) {
    var maximum = output.reduce(function(p,c) { return p>c ? p : c; });
    var nominators = output.map(function(e) { return Math.exp(e - maximum); });
    var denominator = nominators.reduce(function (p, c) { return p + c; });
    var softmax = nominators.map(function(e) { return e / denominator; });

    var maxIndex = 0;
    softmax.reduce(function(p,c,i){if(p<c) {maxIndex=i; return c;} else return p;});
    var result = [];
    for (var i=0; i<output.length; i++)
    {
        if (i==maxIndex)
            result.push(1);
        else
            result.push(0);
    }
    return result;
}

const brain = require('brain.js'),
      mnist = require('mnist');
var net = new brain.NeuralNetwork();
const set = mnist.set(0, 1);
const testSet = set.test;



net.fromJSON(require('./data/mnistTrain'));
var output = net.run(testSet[0].input);

console.log(testSet[0].output);
console.log(softmax(output));
