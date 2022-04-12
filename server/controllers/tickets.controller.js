const ObjectID = require("mongodb").ObjectId;
const fs = require("fs");

async function listTickets(req, reply) {
  const tickets = this.mongo.db.collection("tickets");
  const perPage = 15;
  const Query = {};
  const page = req?.query?.page || 1;
  const sort = req?.query?.sort ? JSON.parse(req?.query?.sort) : {};
  const searchText = req?.query?.queryText;
  if (searchText) {
    Query["$or"] = [
      { _id: new RegExp(searchText, "i") },
      { ticketCreator: new RegExp(searchText, "i") },
      { ticketName: new RegExp(searchText, "i") },
      { ticketId: new RegExp(searchText, "i") },
      { involved: { $in: [new RegExp(searchText, "i")] } },
      { link: new RegExp(searchText, "i") },
    ];
  }
  const result = await tickets
    .find(Query, {
      skip: perPage * page - perPage,
      limit: perPage,
      sort,
      reactive: false,
    })
    .toArray();
  const collectionTotal = await tickets.countDocuments();
  reply.code(200).send({
    data: result,
    page,
    totalCount: collectionTotal,
    limit: perPage,
    hasMore: collectionTotal > perPage * page,
  });
}

async function addTicket(req, reply) {
  const tickets = this.mongo.db.collection("tickets");
  const binaryData = req.file;
  fs.readFile(binaryData.path, "utf8", async function (err, htm) {
    if (err) {
      console.log(err);
      return reply.code(500).send({ message: "An Error occured" });
    }
    try {
      function cleanData() {
        const removeInfoTag = htm
          .split("<information>")
          .join("")
          .split("</information>");
        return removeInfoTag[0];
      }

      function getMeta() {
        const meta = {};
        const getTicketCreator = cleanData()
          .split("Ticket Creator: ")[1]
          .split("Created At:")[0]
          .split("/")[0]
          .replace("\n", "")
          .trim();
        const getTicketCreatedAt = cleanData()
          .split("Ticket Name: ")[0]
          .split("Created At:")[1]
          .replace("\n", "");
        const getTicketName = cleanData()
          .split("Ticket Name: ")[1]
          .split("Creation Method:")[0]
          .trim();
        const getTicketId =
          getTicketName.split("-")[getTicketName.split("-").length - 1];
        const getInvoledUsers = htm
          .match(/<a>(.*?)<\/a>/g)
          .filter(
            (i) =>
              i.includes("#") &&
              !i.includes(getTicketCreator) &&
              !i.includes("Gitcoin Support Bot")
          )
          .map((val) => val.replace(/<\/?a>/g, ""));
        meta.ticketCreator = getTicketCreator;
        meta.ticketName = getTicketName;
        meta.ticketCreatedAt = new Date(getTicketCreatedAt);
        meta.ticketId = getTicketId;
        meta.involved = Array.from(new Set(getInvoledUsers));
        return meta;
      }
      const { ticketCreator, ticketName, ticketId, ticketCreatedAt, involved } =
        getMeta();
      const data = {
        ticketCreator,
        ticketName,
        ticketId,
        ticketCreatedAt,
        involved,
        comments: [],
        link: binaryData.path,
      };
      await tickets.insertOne(data);
      reply
        .code(200)
        .send({ message: "File Uploaded Successfully", data: getMeta() });
    } catch (err) {
      console.log(err);
      return reply.code(500).send({ message: "An Error occured" });
    }
  });
}

async function getTicket(req, reply) {
  const tickets = this.mongo.db.collection("tickets");
  const result = await tickets.findOne({ _id: new ObjectID(req.params.id) });
  if (result) {
    return reply.send(result);
  }
  reply.code(500).send({ message: "Not found" });
}

async function updateTicket(req, reply) {
  const tickets = this.mongo.db.collection("tickets");

  const { comments } = req.body;

  const updateDoc = {
    $set: {
      comments,
    },
  };
  const result = await tickets.updateOne(
    { _id: ObjectID(req.params.id) },
    updateDoc,
    { upsert: true }
  );
  if (result) {
    reply.send({
      message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    });
  }
  reply.code(500).send({ message: "Failed to update comments" });
}

async function deleteTicket(req, reply) {
  const tickets = this.mongo.db.collection("tickets");

  const result = await tickets.deleteOne({ _id: ObjectID(req.params.id) });
  if (result.deletedCount) return reply.send("Deleted");
  reply.send("Could not delete. ");
}

module.exports = {
  listTickets,
  getTicket,
  addTicket,
  updateTicket,
  deleteTicket,
};
