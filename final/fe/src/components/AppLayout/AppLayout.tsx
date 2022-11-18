import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import {  Outlet, useNavigate } from "react-router-dom";
import UserAvatar from "../admin/admin";
import "./AppLayout.css";

const { Sider, Content } = Layout;

const AppLout: React.FC = (props) => {
  const navigate = useNavigate(); //路由跳转
  const navigateTo = (path: string) => {
    navigate(path);
  };
  const [collapsed, setCollapsed] = useState(false);
  const gotoAbout = () => {
    navigateTo("/About"); //跳到About
  };
  const gotoHome = () => {
    navigateTo("/"); //跳到About
  };
  return (
    <div className="ant-layout">
      <div className="tab">
        人员管理系统<UserAvatar></UserAvatar>
      </div>

      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "人员管理界面",

                onClick: gotoHome,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "关于",
                onClick: gotoAbout,
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default AppLout;
