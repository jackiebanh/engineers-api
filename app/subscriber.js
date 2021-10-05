import redis from 'redis';

var subscriber = redis.createClient(`${process.env.REDIS_URL}`);

subscriber.on("message", function (channel, message) {
 console.log("Message: " + message + " on channel: " + channel + " has arrived!");
});

subscriber.subscribe("notification");
