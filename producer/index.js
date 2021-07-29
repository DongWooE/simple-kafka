const createTopic = require('./createTopic');

const producer = ()=> {
    return new Promise((resolve,reject)=>{
        const kafka = require('kafka-node'),
        HighLevelProducer = kafka.HighLevelProducer,
        client = new kafka.KafkaClient({
        }),
        producer = new HighLevelProducer(client,{
            requireAcks:1, 
            ackTimeoutMs:100,
            partitionerType:1
            });
        producer.on('ready', ()=>{
                client.refreshMetadata(['topic1', 'topic2'], (err)=>{
                    if(err){
                        console.log(err);
                        reject(err);
                    }
                    resolve(producer);
                });
            });                
        producer.on('error', error =>{
            console.log(error);
        });
    })
};

createTopic();
producer()
    .then((producer)=>{
        const payloads = [
        {topic : 'topic2' ,messages : 'hihi'}
    ];
        setInterval(()=>{
            console.log("producer ::");
            producer.send(payloads, (err,data)=> console.log(data));
        },1000);
    })
    .catch((err)=> console.log(err));



module.exports = producer;