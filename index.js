const {consumer, producer} = require('./kafka');

consumer()

let number = 0;
let timerId = setInterval(() =>{
    number++;
    producer(number)
        .then((data)=>console.log(data))
        .catch((data)=>console.log(data));
    }
, 2000);

setTimeout(() => { clearInterval(timerId); console.log('STOP'); }, 10000);