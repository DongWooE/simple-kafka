const createTopic = require('./createTopic');

const producer = ()=> {
    return new Promise((resolve,reject)=>{
        const kafka = require('kafka-node'),
        KeyedMessage = kafka.KeyedMessage,
        HighLevelProducer = kafka.HighLevelProducer,
        client = new kafka.KafkaClient({
        }),
        producer = new HighLevelProducer(client,{
            requireAcks:1, 
            ackTimeoutMs:100,
            partitionerType:2
        }),
        km = new KeyedMessage('key', 'message')
        
        producer.on('ready', ()=>{
                client.refreshMetadata(['topic1', 'topic2'], (err)=>{
                    const body = {producer, km};
                    if(err){
                        console.log(err);
                        reject(err);
                    }
                    resolve(body);
                });
            });                
        producer.on('error', error =>{
            reject(error);
        });
    })
};

createTopic();
// const timerId = setInterval(()=>{
//     producer()
//     .then((producer)=>{
//         const payloads = [
//         {topic : 'topic2' ,messages : 'hihi'}
//         ];
//             console.log("producer ::");
//             producer.send(payloads, (err,data)=> console.log(data));
//         })
//     .catch((err)=> console.log(err));
// },1000);
// setTimeout(()=>{clearInterval(timerId); console.log('STOP')}, 10000);
producer()
    .then((body)=>{
        const payloads = [
        {topic : 'topic2' ,messages : ['hihi', body.km]},
        {topic : 'topic2' ,messages : 'hihi'}
    ];
        const timerId = setInterval(()=>{
            console.log("producer ::");
            body.producer.send(payloads, (err,data)=> console.log(data));
        },1000);
        setTimeout(() => { clearInterval(timerId); console.log('STOP'); }, 10000); 
    })
    .catch((err)=> console.log(err));



module.exports = producer;