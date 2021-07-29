const kafka = require('kafka-node');

const client = new kafka.KafkaClient();
const admin = new kafka.Admin(client);
admin.listTopics((err, res) => {
  console.log('topics', res);
});