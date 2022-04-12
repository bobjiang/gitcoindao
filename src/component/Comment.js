import React from "react";
import {
  Comment,
  Form,
  Button,
  List,
  Input,
  Tooltip,
  notification,
} from "antd";
import moment from "moment";
import axios from "axios";

const { TextArea } = Input;

const CommentList = (props) => (
  <List
    dataSource={props?.comments}
    header={`${props?.comments?.length} ${
      props?.comments?.length > 1 ? "replies" : "reply"
    }`}
    itemLayout="horizontal"
    renderItem={(props) => (
      <Comment
        content={<p>{props?.content?.props?.children}</p>}
        datetime={
          <Tooltip
            title={moment(props?.datetime).format("YYYY-MM-DD HH:mm:ss")}
          >
            <span>{moment(props?.datetime).fromNow()}</span>
          </Tooltip>
        }
      />
    )}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export default class CommentSection extends React.Component {
  state = {
    comments: this.props?.comment || [],
    submitting: false,
    value: "",
  };

  componentDidMount() {
    this.setState({
      comments: this.props?.comment || [],
    });
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/tickets/${this.props._id}`, {
        comments: [
          ...this.state.comments,
          {
            content: <p>{this.state.value}</p>,
            datetime: new Date(),
          },
        ],
      })
      .then((result) => {
        this.setState({
          submitting: false,
          value: "",
          comments: [
            ...this.state.comments,
            {
              content: <p>{this.state.value}</p>,
              datetime: new Date(),
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
        return notification.warning({
          message: "Error",
          description: "Can not post comment at this time, Please try again.",
        });
      });
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments = [], submitting, value } = this.state;

    return (
      <>
        {comments?.length > 0 && <CommentList comments={comments} />}
        <Comment
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    );
  }
}
