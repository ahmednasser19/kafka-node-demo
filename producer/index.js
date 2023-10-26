import Kafka from 'node-rdkafka'
import eventType from '../eventType.js'

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': "localhost:9092"
}, {}, { topic: "test" },)

function getRandomAnimal() {
    const categories = ["CAT", "DOG"]
    return categories[Math.floor(Math.random() * categories.length)]
}

function getRandomNoise(animal) {
    if (animal === "CAT") {
        const noises = ["meow", "purr"]
        return noises[Math.floor(Math.random() * noises.length)]
    } else {
        const noises = ["bark", "woof"]
        return noises[Math.floor(Math.random() * noises.length)]
    }
}

function queueMessage() {
    const category = getRandomAnimal()
    const noise = getRandomNoise(category)

    const event = { category, noise }
    const success = stream.write(eventType.toBuffer(event))
    if (success) {
        console.log("Message queued successfully to stream")
    } else {
        console.log("something went wrong")
    }
}

setInterval(() => {
    queueMessage()
}, 3000)