import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Modal, Button, Space } from "antd";

const TicketModal = ({ children, isModalVisible, setIsModalVisible }) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Modal
        width={1000}
        title={
          <Space size="small">
            <Button
              onClick={handleCancel}
              type="text"
              icon={<ArrowLeftOutlined />}
            />
            <div style={{ borderLeft: "3px solid #b3b3b3", height: 20 }} />
            <Button type="text" onClick={() => window.open(`/${isModalVisible}`, "_blank")}>
              Open as Page
            </Button>
          </Space>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};

export default TicketModal;
