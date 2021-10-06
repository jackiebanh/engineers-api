import redis from 'redis';
import express from 'express';

const app = express().use(express.json())
const port = process.env.PORT || 3000

var subscriber = redis.createClient(`${process.env.REDIS_URL}`);

subscriber.on("message", function (channel, message) {
 console.log("Message: " + message + " on channel: " + channel + " has arrived!");
});

subscriber.subscribe("notification");

app.get('/ping', async (req, res) => {
  res.send('pong!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})