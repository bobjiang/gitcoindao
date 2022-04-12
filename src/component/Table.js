import React from "react";
import moment from "moment";
import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

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

const TableRow = React.forwardRef(
  ({ setIsModalVisible, data, confirm }, ref) => (
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
      <p style={{ display: "flex", alignItems: "center" }}>
        <button
          style={{ padding: "8px 10px", margin: "0px auto auto auto" }}
          id="btn"
          onClick={() => setIsModalVisible(data._id)}
        >
          View Ticket
        </button>
        &emsp;
        <Popconfirm
          onConfirm={() => confirm(data._id, data.ticketName)}
          title="Are you sure you want to delete this ticket？"
          okText="Yes, I am"
          cancelText="Nope"
        >
          <Button icon={<DeleteOutlined />} size="large" />
        </Popconfirm>
      </p>
    </div>
  )
);

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

export { TableHead, TableRow, TableRowLoader };
