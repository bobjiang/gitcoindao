import React, { useState } from 'react';
import axios from "axios";
import './App.css';
// import Nav from './Components/Nav';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { PageHeader, Row, Col, Table, Tag, Modal, Button, Space, Typography, Spin } from 'antd';
import CommentSection from './Comment';

const routes = [
  {
    path: '/',
    breadcrumbName: 'Tickets List',
  }
]

const ViewTicket = ({id}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState(null);

  const showModal = () => {
    axios.get("/happy.html").then(result => {
      setContent(result.data);
    });
    setIsModalVisible(id);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Modal width={1000} title={
        <Space size="small">
          <Button onClick={handleCancel} type="text" icon={<ArrowLeftOutlined />} />
          <div style={{ borderLeft: '3px solid #b3b3b3', height: 20 }} />
          <Button type="text" onClick={() => window.open(`/${id}`, '_blank')}>
            Open as Page
          </Button>
        </Space>
      } visible={isModalVisible === id} onOk={handleOk} onCancel={handleCancel}>
        <Typography>
          <Typography.Title>Ticket Name</Typography.Title>
          <Typography.Paragraph>
            <strong>Created By</strong> Bad Bunny &emsp; <strong>Handled By</strong> Big Boss &emsp; <strong>Date Created</strong> 25.03.2022
          </Typography.Paragraph>
          <Typography.Title level={3}>
            Transcript
          </Typography.Title>
          {content ? (
            <div id="transcript" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <Row justify='center'>
              <Spin size="large" style={{ margin: 30 }} />
            </Row>
          )}
          <Typography.Title level={3}>
            Comment
          </Typography.Title>
          <CommentSection />
        </Typography>
      </Modal>
      <Button id="view" onClick={showModal}>Open Ticket</Button>
    </>
  )
}

const DataTable = () => {

  const columns = [
    {
      title: 'Ticket Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div id="name" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href={`/${record.key}`} target="_blank" rel="noreferrer" style={{ color: "#333", textDecoration: 'underline', fontWeight: 'bold' }}>{text}</a>&emsp;
          <ViewTicket id={record.key} />
        </div>
      ),
    },
    {
      title: 'Ticket Status',
      key: 'status',
      dataIndex: 'status',
      render: status => {
        let color = status === 'Completed' ? 'green' : 'geekblue';
        if (status === 'pending') {
          color = 'amber';
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Date Opened',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Ticket Created by',
      dataIndex: 'openBy',
      key: 'openBy',
    },
    {
      title: 'Ticket Handled by',
      dataIndex: 'handledBy',
      key: 'handledBy',
    }
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      date: '2014-12-24 23:12:00',
      openBy: 'Wnguo',
      handledBy: 'Vihala',
      status: 'Completed',
    },
    {
      key: '2',
      name: 'Jim Green',
      date: '2014-12-23 23:12:00',
      openBy: 'Wnguo',
      handledBy: 'Vigo',
      status: 'Completed',
    },
    {
      key: '3',
      name: 'Joe Black',
      date: '2014-12-22 23:12:00',
      openBy: 'Maze runner',
      handledBy: 'Noiz',
      status: 'Completed',
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

function App() {
  return (
    <div className="container">
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <br />
          <PageHeader
            className="site-page-header"
            title={
              <div>
                <h1>{"TIcket Review System"}</h1>
                <br />
              </div>
            }
            breadcrumb={{ routes }}
          />
          <br />
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '0 50px' }} xs={24} sm={24} md={24} lg={24} xl={24}>
          <DataTable />
        </Col>
      </Row>
    </div>
  );
}

export default App;
