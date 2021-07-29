const kafka = require('kafka-node');
const client = new kafka.KafkaClient();

const createTopic = () =>{
    const topicsToCreate = [{
        topic: 'topic1',
        partitions: 0,
        replicationFactor: 1
    }];

    client.createTopics(topicsToCreate, (error, result) => {
        console.log(error);
    });
}

module.exports = createTopic;