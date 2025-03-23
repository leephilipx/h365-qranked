import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import H365Home from "./H365Home";

import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
  ];


const H365Main: React.FC = () => {

  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen size changes for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // You can adjust the width threshold as needed
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Sider collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        collapsedWidth={isMobile ? 50 : 80}
        trigger={isMobile ? null : undefined} // Hide expand button on mobile
        style={{ position: 'fixed', height: '100vh' }}
      >
        <div className="sidebar-logo" style={{ padding: isMobile ? 10 : 16, textAlign: "center" }}><img
          src={`${process.env.PUBLIC_URL}/qranked-logo.png`}
          alt="Logo"
          style={{ width: collapsed ? (isMobile ? 30 : 40) : 60, transition: "width 0.3s" }}
        /></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>

      <Layout style={{
        marginLeft: collapsed ? (isMobile ? 50 : 80) : 200,
        transition: 'margin-left 0.3s ease',
       }}>
        <Content style={{ padding: isMobile ? "20px" : "40px" }}>
          <H365Home />
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          H365 Ranked © Philip Lee {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default H365Main;