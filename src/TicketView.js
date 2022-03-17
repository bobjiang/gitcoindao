import React, { useState } from 'react';
import axios from "axios";
import './App.css';
import { PageHeader, Row, Col, Typography, Spin } from 'antd';
import CommentSection from './Comment';

const routes = [
  {
    path: '/',
    breadcrumbName: 'Tickets List',
  },
  {
    path: '/ticket-1',
    breadcrumbName: 'Tickets Name',
  }
]

const TicketView = ({ id }) => {
  const [content, setContent] = useState(null);

  React.useEffect(() => {
    axios.get("/happy.html").then(result => {
      setContent(result.data);
    });
  }, [])

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
          <Typography>
            <Typography.Title>Ticket Name</Typography.Title>
            <Typography.Paragraph>
              <strong>Created By</strong> Bad Bunny &emsp; <strong>Handled By</strong> Big Boss &emsp; <strong>Date Created</strong> 25.03.2022
            </Typography.Paragraph>
            <Typography.Title level={3}>
              Transcript
            </Typography.Title>
            {content ? (
              <div id="transcriptfull" dangerouslySetInnerHTML={{ __html: content }} />
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
        </Col>
      </Row>
    </div>
  )
}

export default TicketView;
