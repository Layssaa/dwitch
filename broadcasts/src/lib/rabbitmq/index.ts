import amqp from "amqplib";

const rambbitmqServer =
  process.env.RABBITMQ_SERVER_URL ?? "amqp://guest:guest@127.0.0.1:5672";
const EXCHANGE = "broadcast.exchange";

export async function createRabbitMQConnection() {
  const connection = await amqp.connect(rambbitmqServer);

  connection.on("error", (err) => {
    console.log("ERROR", err);
  });

  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE, "fanout", {
    durable: false,
  });

  return { connection, channel };
}

export async function publishBroadcast(channel: any, message: object) {
  const EXPIRE_IN = process.env.BROADCAST_NOTIFY_EXPIRE_IN ?? 600000;

  channel.publish(EXCHANGE, "", Buffer.from(JSON.stringify(message)), {
    expiration: EXPIRE_IN,
  });
}

export async function startConsumer(onMessage: (data: any) => void) {
  const { channel } = await createRabbitMQConnection();
  await channel.assertExchange(EXCHANGE, "fanout", { durable: false });

  const q = await channel.assertQueue("", { exclusive: true });

  channel.bindQueue(q.queue, EXCHANGE, "");

  channel.consume(
    q.queue,
    (msg: any) => {
      console.log("MESSAGE CONSUMED >>", msg.content.toString());
      if (msg.content) {
        const content = JSON.parse(msg.content.toString());
        onMessage(content);
      }
    },
    { noAck: true }
  );
}
