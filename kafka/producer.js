const producer = (number)=> {
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
};

module.exports = producer;