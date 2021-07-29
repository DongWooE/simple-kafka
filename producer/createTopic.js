const kafka = require('kafka-node');
const client = new kafka.KafkaClient();
const admin = new kafka.Admin(client);

const createTopic = () =>{
    const topicsToCreate = [{
        topic: 'topic2',
        replicationFactor: 1,
        partitions:3
    }];

    admin.createTopics(topicsToCreate, (error, result) => {
        console.log(result);
    });
}

module.exports = createTopic;