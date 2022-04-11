const multer = require('fastify-multer');
const fastify = require("fastify")({ logger: true });
const fastifyStatic = require('fastify-static')
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();

fastify.register(require("fastify-mongodb"), {
  forceClose: true,
  url: process.env.CONNECT_DB,
});

fastify.register(require("fastify-cors"), {
  origin: process.env.ORIGIN,
  methods: ["POST","GET", "PUT"]
});

// second plugin
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'uploads'),
  prefix: '/uploads/',
})

fastify.register(multer.contentParser);

fastify.register(require("./routes/tickets"));

fastify.get("/", function (req, reply) {
  // fastify;
  reply.send({ message: "Hello! Go to /tickets instead" });
});

fastify.listen(8080, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
