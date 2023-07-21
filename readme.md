# How to run?

1. Clone this repo;
2. Run docker-compose up;
3. Go to http://localhost:3000/ - this is ms-1;

# How this app work?

1. send {message: "Hello"} from ms-1 to ms-2 using rabbitmq;
2. ms-2 add to this message "Word"  and return to ms-1 {message: "Hello World"};