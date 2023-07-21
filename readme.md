# How to run?

1. Clone this repo;
2. Run `docker-compose up`;
3. Go to http://localhost:3000/ - this is `MS-1`;

# How this app work?

1. When you open http://localhost:3000/ `MS-1` send `{message: "Hello"}` to `MS-2` using `RabbitMQ`;
2. `MS-2` add to this message "World" and return to `MS-1` {message: "Hello World"};
