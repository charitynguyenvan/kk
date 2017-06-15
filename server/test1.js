// import { t2aa } from './test2'
var t2aa = require('./test2')

t2aa.t2aa()
console.log('fsfs');


const t1aa = () => {
  console.log('t1aa')
}

const t1bb = () => {
  console.log('t1bb')
}

module.exports = {
  t1aa,
  t1bb
}
