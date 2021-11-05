const { Transform } = require('stream');

const { task1, task2 } = require('./code');

class CaesarTransform extends Transform {

  constructor(action) {
    super();
    this.action = action;
  }

  _transform(chunk, _, done) {
    let result = '';
    
    switch(this.action) {
      case 'string':
        result = task1(chunk.toString('utf8').trim());
        break;
      case 'array':
        result = task2(chunk.toString('utf8').trim());
        break;
      default:
        console.log('Action not found!');
        process.exit(0);
    }


    this.push(result);
    done();
  }
}

module.exports = CaesarTransform;