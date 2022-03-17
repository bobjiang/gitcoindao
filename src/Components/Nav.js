import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const Nav = ({ticketName = ""})  => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item href="">
        <UserOutlined />
        <span>Ticket List</span>
      </Breadcrumb.Item>
      {ticketName && <Breadcrumb.Item>{ticketName}</Breadcrumb.Item>}
    </Breadcrumb>
  )
}

export default Nav;
