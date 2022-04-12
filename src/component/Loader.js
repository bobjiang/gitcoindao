import { Row, Spin } from "antd";

const Loader = () => (
  <div style={{ minHeight: "100vh" }}>
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Spin
        tip="Loading..."
        size="large"
        style={{ margin: 30, color: "#6f3ff5" }}
      />
    </Row>
  </div>
);

export default Loader;
