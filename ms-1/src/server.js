import express from "express";
import amqp from "amqplib";

let channel;

async function connect() {
  const connection = await amqp.connect("amqp://guest:guest@rabbitmq:5672");
  channel = await connection.createChannel();
  channel.prefetch(1);
  await channel.assertQueue("MS-1");
}

await connect();

const app = express();

app.get("/", async (req, res) => {
  channel.sendToQueue(
    "MS-2",
    Buffer.from(
      JSON.stringify({
        message: "Hello",
      })
    )
  );
  await channel.consume("MS-1", (data) => {
    res.send(JSON.parse(data.content));
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running. PORT=" + PORT);
});
