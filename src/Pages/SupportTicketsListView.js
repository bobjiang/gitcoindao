import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import { notification } from "antd";
import TicketModal from "../component/Modal";
import SupportTicketView from "./SupportTicketView";
import { TableHead, TableRow, TableRowLoader } from "../component/Table";
import "../css/App.css";
import empty from "../img/empty-box.svg";
import broken from "../img/broken.svg";
import useFetch from "../Hooks/useFetch";
import AddTicket from "../component/AddTicket";

function SupportTicketsListView() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [query] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ ticketCreatedAt: -1 });
  const { loading, error, list, metaData, setRefresh, handleDeleteTicket } =
    useFetch(query, page, sort);

  const observer = useRef();

  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && metaData?.hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, metaData?.hasMore]
  );

  const StateTemplate = ({
    img,
    state,
    headline,
    line1,
    line2,
    showRefresh,
  }) => (
    <div className="empty_state">
      <img src={img} alt={`${state}-tickets`} width={150} />
      <h3 className="">{headline}</h3>
      <p>{line1}</p>
      {line2 && <p>{line2}</p>}
      {showRefresh && (
        <button id="btn" onClick={() => setRefresh((prev) => prev + 1)}>
          Refresh
        </button>
      )}
    </div>
  );

  const confirm = (_id, name) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/tickets/${_id}`)
      .then(() => {
        handleDeleteTicket(_id);
        notification.success({
          message: "Success",
          description: `Ticket, ${name}, has been deleted successfully.`,
        });
      })
      .catch((err) => {
        console.log(err);
        return notification.warning({
          message: "Error",
          description:
            "Can not delete this ticket at the moment, Please try again.",
        });
      });
  };

  return (
    <div className="Ticket">
      {isModalVisible && (
        <TicketModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        >
          <SupportTicketView _id={isModalVisible} />
        </TicketModal>
      )}
      <header className="Ticket-header">
        <h1>GitcoinDAO User Support</h1>
      </header>
      <main className="Ticket-body">
        <section>
          <AddTicket setPage={setPage} />
        </section>
        <section>
          <div className="table">
            <div className="table-head">
              <TableHead setPage={setPage} setSort={setSort} sort={sort} />
            </div>
            <div className="table-body">
              {list.map((item, index) => {
                if (list.length === index + 1) {
                  return (
                    <TableRow
                      ref={lastBookElementRef}
                      data={item}
                      key={index}
                      setIsModalVisible={setIsModalVisible}
                      confirm={confirm}
                    />
                  );
                } else {
                  return (
                    <TableRow
                      confirm={confirm}
                      data={item}
                      key={index}
                      setIsModalVisible={setIsModalVisible}
                    />
                  );
                }
              })}
              {loading &&
                ["", "", "", ""].map((_, index) => (
                  <TableRowLoader key={index} />
                ))}
              {!error && !loading && list.length === 0 && (
                <StateTemplate
                  img={empty}
                  state="empty"
                  headline="No tickets"
                  line1="There have been no tickets in here yet."
                  line2="Click on the Add new Ticket button to upload."
                  showRefresh
                />
              )}
              {!loading && error && list.length === 0 && (
                <StateTemplate
                  img={broken}
                  state="error"
                  headline="Couldn't refresh tickets"
                  line1="Please, try again or come back later"
                  showRefresh
                />
              )}
            </div>
          </div>
        </section>
      </main>
      <footer style={{ textAlign: "center", padding: "40px 10px 20px" }}>
        <p>GitcoinDAO &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default SupportTicketsListView;
