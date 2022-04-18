import React, { useState, useRef } from "react";
import { notification } from "antd";
import { create, registerPlugin } from "filepond";
import { FilePond } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "../css/App.css";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const input = document.querySelector('input[type="file"]');

create(input, {
  acceptedFileTypes: ["text/html"],
});

const AddTicket = React.memo(({ setPage, handleRefresh }) => {
  const pond = useRef(null);
  const [files, setFiles] = useState([]);
  return (
    <div className="add-ticket" onClick={() => files.length > 0 ? pond?.current?.browse() : {}}>
      <FilePond
        ref={pond}
        files={files}
        allowMultiple={true}
        maxFiles={10}
        allowBrowse
        allowReplace
        name="file"
        server={`${process.env.REACT_APP_SERVER_URL}/ticket`}
        labelIdle='Drag & Drop or <span class="filepond--label-action">Browse</span> your files to add new ticket for upload.'
        onupdatefiles={(fileItems) => {
          setFiles(fileItems.map((fileItem) => fileItem?.file));
        }}
        onprocessfile={(error) => {
          if (error) {
            return notification.warning({
              message: "Error",
              description: "File Upload was unsuccessful.",
            });
          }
          setPage(1);
          handleRefresh();
          notification.success({
            message: "Success",
            description: "File has been Upload successfully.",
          });
        }}
      />
    </div>
  );
});

export default AddTicket;
