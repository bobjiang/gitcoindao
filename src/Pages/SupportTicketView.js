import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Typography, Spin, Avatar, Tooltip } from "antd";
import CommentSection from "../component/Comment";
import "../css/App.css";
import empty from "../img/empty-box.svg";
import broken from "../img/broken.svg";
import UseFetchTicket from "../Hooks/UseFetchTicket";
import axios from "axios";
import Loader from "../component/Loader";

function SupportTicketView({ _id }) {
  const id = useParams().id || _id;
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const { loading, error, ticket, setRefresh } = UseFetchTicket(id);

  useEffect(() => {
    if (Object.entries(ticket).length > 0) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/${ticket?.link.replace("server/", "")}`)
        .then((result) => {
          setContent(result.data);
        });
    }
  }, [ticket]);
  const StateTemplate = ({
    img,
    state,
    headline,
    line1,
    line2,
    showRefresh,
    goHome,
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
      {goHome && (
        <button id="btn" onClick={() => navigate("/")}>
          Go Home
        </button>
      )}
    </div>
  );

  return (
    <div className="Ticket">
      {Object.entries(ticket).length > 0 ? (
        <React.Fragment>
          <header className="Ticket-header">
            <h1>{ticket?.ticketName}</h1>
          </header>
          <main className="Ticket-body">
            <section>
              <div>
                <Typography>
                  <Typography.Paragraph>
                    <strong>Created By:</strong> {ticket?.ticketCreator} &emsp;{" "}
                    <strong>Who is Involved:</strong>{" "}
                    <Avatar.Group
                      maxCount={4}
                      maxPopoverTrigger="click"
                      size="large"
                      maxStyle={{
                        color: "#0d003c",
                        backgroundColor: "#0d003c9c",
                        cursor: "pointer",
                      }}
                    >
                      {ticket?.involved?.map((i) => (
                        <Tooltip title={i} key={i} placement="top">
                          <Avatar
                            style={{
                              textTransform: "capitalize",
                              background: "#6f3ff5",
                            }}
                          >
                            {i[0]}
                          </Avatar>
                        </Tooltip>
                      ))}
                    </Avatar.Group>
                    &emsp; <strong>Date Created</strong>{" "}
                    {ticket?.ticketCreatedAt &&
                      new Date(ticket?.ticketCreatedAt).toLocaleString()}
                  </Typography.Paragraph>
                  <Typography.Title level={3}>Transcript</Typography.Title>
                  {content ? (
                    <iframe
                      name="my_iframe"
                      srcDoc={content}
                      id="transcript"
                      title="transcript"
                    />
                  ) : (
                    <Row justify="center">
                      <Spin size="large" style={{ margin: 30 }} />
                    </Row>
                  )}
                  <br />
                  <br />
                  <Typography.Title level={3}>Comment</Typography.Title>
                  <CommentSection _id={id} comment={ticket?.comments} />
                </Typography>
              </div>
              <div className="table">
                {!error && !loading && Object.entries(ticket).length === 0 && (
                  <StateTemplate
                    img={empty}
                    state="empty"
                    headline="No ticket Found"
                    line1="This ticket does not exist, go back home and select the right now."
                    goHome
                  />
                )}
                {!loading && error && Object.entries(ticket).length === 0 && (
                  <StateTemplate
                    img={broken}
                    state="error"
                    headline="Couldn't refresh this ticket"
                    line1="Please, try again or come back later"
                    showRefresh
                  />
                )}
              </div>
            </section>
          </main>
        </React.Fragment>
      ) : (
        <Loader  />
      )}
    </div>
  );
}

export default SupportTicketView;
