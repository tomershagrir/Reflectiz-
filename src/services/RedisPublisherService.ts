
const redis = require("redis")
const publisher = redis.createClient()

publisher.on("error", function (err) {
    console.log("Error " + err);
});

class RedisPublisherService {

    public sendToAnalysis(domainName: string): void {
        console.log(`Sending to analysis domain name: ${domainName}`)
        setTimeout(() => publisher.publish("analysis-request", domainName), 100);
    }
}

export default new RedisPublisherService();