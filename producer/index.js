const createTopic = require('./createTopic');

const producer = (number)=> {
    try {
        const kafka = require('kafka-node'),
        Producer = kafka.Producer,
        client = new kafka.KafkaClient(),
        producer = new Producer(client);

        const payloads = [{
            topic : 'topic1',
            messages : number,
            partition : 0
        }]; 
        return new Promise((resolve, reject)=>{
            producer.on('ready', ()=>{
                console.log("producer :: ");
                producer.send(payloads, (err, data)=>{
                    if(err){
                        reject(err);
                    }
                    resolve(data);
                })
            })
            producer.on('error', error =>{
                reject(error);
            })
        })
    } catch (error) {
        if(error == kafka.TopicsNotExistError){
            createTopic();
        }
    }
    
};

let number = 0;
let timerId = setInterval(() =>{
    number++;
    producer(number)
        .then((data)=>console.log(data))
        .catch((data)=>console.log(data));
    }
, 2000);

setTimeout(() => { clearInterval(timerId); console.log('STOP'); }, 10000);

module.exports = producer;