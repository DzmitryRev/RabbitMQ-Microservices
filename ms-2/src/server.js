import express from "express";
import amqp from "amqplib";

let channel;

async function connect() {
  const connection = await amqp.connect("amqp://guest:guest@rabbitmq:5672");
  channel = await connection.createChannel();
  await channel.assertQueue("MS-2");
}

await connect();

await channel.consume("MS-2", (data) => {
  let content = JSON.parse(data.content);
  channel.sendToQueue("MS-1", Buffer.from(JSON.stringify({ message: content.message + " World" })));
});

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("server is running. PORT=" + PORT);
});
