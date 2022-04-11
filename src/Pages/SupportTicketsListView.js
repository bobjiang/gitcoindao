import React, { useState, useRef, useEffect, useCallback } from "react";
import { notification } from 'antd';
import { create, registerPlugin } from 'filepond';
import { FilePond } from "react-filepond";
import moment from "moment";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import TicketModal from "../component/Modal";
import "../css/App.css";
import empty from "../img/empty-box.svg";
import broken from "../img/broken.svg";
import useFetch from "../Hooks/useFetch";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import SupportTicketView from "./SupportTicketView";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Get a file input reference
const input = document.querySelector('input[type="file"]');

// Create a FilePond instance
create(input, {
  // Only accept images
  acceptedFileTypes: ['text/html'],
});

function SupportTicketsListView() {
  const pond = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [query] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const [files, setFiles] = useState([]);
  const { loading, error, list, metaData, setRefresh } = useFetch(
    query,
    page,
    sort
  );
  const loader = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && metaData.hasMore) {
        setPage((prev) => prev + 1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [metaData.hasMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  const handleInit = () => {
    console.log("FilePond instance has initialised", pond);
  };

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
          <div className="add-ticket">
            <FilePond
              ref={pond}
              files={files}
              allowMultiple={false}
              allowBrowse
              allowReplace
              name="file"
              server={`${process.env.REACT_APP_SERVER_URL}/ticket`}
              oninit={() => handleInit()}
              labelIdle='Drag & Drop your files to add new ticket for upload.'
              onupdatefiles={(fileItems) => {
                setFiles(fileItems.map((fileItem) => fileItem.file));
              }}
              onprocessfile={(error) => {
                if (error) {
                  return notification.warning({
                    message: 'Error',
                    description:
                      'File Upload was unsuccessful.',
                  });
                }
                notification.success({
                  message: 'Success',
                  description:
                    'File has been Upload successfully.',
                });
                setRefresh((prev) => prev + 1)
              }}
            />
          </div>
        </section>
        <section>
          <div className="table">
            <div className="table-head">
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
            </div>
            <div className="table-body">
              {list.map((_, index) => (
                <div key={index} className="table-body_row">
                  <p>
                    <strong>Date Created: </strong>
                    {moment(_.ticketCreatedAt).format("YYYY-MM-DD HH:mm:ss")}
                  </p>
                  <p>
                    <strong>Ticket ID: </strong>
                    {_.ticketId}
                  </p>
                  <p>
                    <strong>Ticket Name: </strong>
                    {_.ticketName}
                  </p>
                  <p>
                    <strong>Created By: </strong>
                    {_.ticketCreator}
                  </p>
                  <p>
                    <strong>Who is Involved: </strong>
                    {_.involved.map((i) => (
                      <React.Fragment key={i}>
                        <br />
                        {i},
                      </React.Fragment>
                    ))}
                  </p>
                  <p>
                    <button id="btn" onClick={() => setIsModalVisible(_._id)}>
                      View Ticket
                    </button>
                  </p>
                </div>
              ))}
              {loading &&
                ["", "", "", ""].map((_, index) => (
                  <div key={index} className="line-conc table-body_row">
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
                ))}
            </div>
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
            <div ref={loader} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default SupportTicketsListView;
