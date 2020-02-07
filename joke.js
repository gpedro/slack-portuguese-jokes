const uniqueRandomArray = require('unique-random-array');
const key = 'data';
const memory = require('memory-cache');
const got = require('got');
const get = () => {
  var joke = uniqueRandomArray(JSON.parse(memory.get(key)))();
  return (!joke) ? get() : joke;
}

const reload = () => {

  console.info('Carregando Jokes ...');
  return got('https://raw.githubusercontent.com/CoolerVoid/portuguese_jokes/master/README.md')
    .then(response => response.body)
    .then(response => response.split('---')[1])
    .then(response => response.split('\n\n'))
    .then(response => {
      memory.put(key, JSON.stringify(response));
      console.info(get());
    })
    .catch(error => {
      console.error('Não foi possível carregar os Jokes', error);
    });
};

exports.reload = reload;
exports.get = get;
