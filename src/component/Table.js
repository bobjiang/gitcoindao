import React from "react";
import moment from "moment";

const TableHead = ({ setPage, setSort, sort }) => (
  <div className="table-head_row">
    <p>
      Date Created{" "}
      <span
        style={{ fontSize: 18, cursor: "pointer" }}
        onClick={() => {
          setPage(1);
          setSort({
            ticketCreatedAt: sort.ticketCreatedAt === -1 ? 1 : -1,
          });
        }}
      >
        {sort.ticketCreatedAt === 1 ? "▲" : "▼"}
      </span>
    </p>
    <p>
      Ticket ID{" "}
      <span
        style={{ fontSize: 18, cursor: "pointer" }}
        onClick={() => {
          setPage(1);
          setSort({ ticketId: sort.ticketId === -1 ? 1 : -1 });
        }}
      >
        {sort.ticketId === 1 ? "▲" : "▼"}
      </span>
    </p>
    <p>Ticket Name</p>
    <p>Created By</p>
    <p>Who is Involved</p>
    <p />
  </div>
);

const TableRow = React.forwardRef(({ setIsModalVisible, data }, ref) => (
  <div ref={ref} className="table-body_row">
    <p>
      <strong>Date Created: </strong>
      {moment(data.ticketCreatedAt).format("YYYY-MM-DD HH:mm:ss")}
    </p>
    <p>
      <strong>Ticket ID: </strong>
      {data.ticketId}
    </p>
    <p>
      <strong>Ticket Name: </strong>
      {data.ticketName}
    </p>
    <p>
      <strong>Created By: </strong>
      {data.ticketCreator}
    </p>
    <p>
      <strong>Who is Involved: </strong>
      {data.involved.map((i) => (
        <React.Fragment key={i}>
          <br />
          {i},
        </React.Fragment>
      ))}
    </p>
    <p>
      <button id="btn" onClick={() => setIsModalVisible(data._id)}>
        View Ticket
      </button>
    </p>
  </div>
));

const TableRowLoader = () => (
  <div className="line-conc table-body_row">
    <div className="td tg-cly1">
      <p className="line" />
    </div>
    <div className="td tg-cly1">
      <p className="line" />
    </div>
    <div className="td tg-cly1">
      <p className="line" />
    </div>
    <div className="td tg-cly1">
      <p className="line" />
    </div>
    <div className="td tg-cly1">
      <p className="line" />
    </div>
    <div className="td tg-cly1">
      <p className="line" />
    </div>
  </div>
);

export {
  TableHead,
  TableRow,
  TableRowLoader
}