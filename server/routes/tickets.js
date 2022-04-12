const {
  listTickets,
  addTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/tickets.controller");
const multer = require("fastify-multer");

const htmlFilter = function (req, file, cb) {
  // Accept Html Files onlu
  if (!file.originalname.match(/\.(html|Html|HTML)$/)) {
    req.fileValidationError = "Only Html files are allowed!";
    return cb(new Error("Only Html files are allowed!"), false);
  }
  cb(null, true);
};

const limitsUpload = {
  fileSize: 1000000, //15MB 15*1048576
  files: 1,
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: htmlFilter,
  limits: limitsUpload,
});

const getTicketsopts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          data: {
            type: "array",
            item: "object",
            properties: {
              _id: { type: "string" },
              ticketCreator: { type: "string" },
              ticketName: { type: "string" },
              ticketId: { type: "string" },
              ticketCreatedAt: { type: "string" },
              link: { type: "string" },
              involved: { type: "array" },
            },
          },
          page: { type: "integer" },
          totalCount: { type: "integer" },
          limit: { type: "integer" },
          hasMore: { type: "boolean" },
        },
      },
    },
  },
  handler: listTickets,
};

const getTicketOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          ticketCreator: { type: "string" },
          ticketName: { type: "string" },
          ticketId: { type: "string" },
          ticketCreatedAt: { type: "string" },
          link: { type: "string" },
          involved: { type: "array" },
          comments: { type: "array" },
        },
      },
    },
  },
  handler: getTicket,
};

const updateItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["comments"],
      properties: {
        comments: { type: "array" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: updateTicket,
};

const postTicketOpts = {
  schema: {
    // body: {
    //   type: "object",
    //   required: ["ticketCreator", "ticketName", "ticketCreatedAt", "ticketId", "involved"],
    //   properties: {
    //     link: { type: "string" }
    //   },
    // },
    response: {
      201: {
        type: "object",
        properties: {
          _id: { type: "string" },
          ticketCreator: { type: "string" },
          ticketName: { type: "string" },
          ticketId: { type: "string" },
          ticketCreatedAt: { type: "string" },
          link: { type: "string" },
          involved: { type: "array" },
          comments: { type: "array" },
        },
      },
    },
  },
  preHandler: upload.single("file"),
  handler: addTicket,
};

const deleteTicketOpts = {
  schema: {
    response: {
      200: {
        type: "string",
      },
    },
  },
  handler: deleteTicket,
};

async function routes(fastify, options) {
  fastify.post("/ticket", postTicketOpts);
  fastify.get("/tickets", getTicketsopts);
  fastify.get("/tickets/:id", getTicketOpts);
  fastify.put("/tickets/:id", updateItemOpts);
  fastify.delete("/tickets/:id", deleteTicketOpts);
}
module.exports = routes;
