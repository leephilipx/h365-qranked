import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Grid, Layout, Menu, Table, message,  } from "antd";
import Login from "./LoginModal";
import Leaderboard from "./Leaderboard";

import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

import { getLeaderboard, getTableData } from "../services/api";
import { isUserLoggedIn } from "../services/auth";
import { LeaderboardEntryProps, TableDataProps } from "../utils/types";

const { Content, Footer, Sider } = Layout;


const H365Main: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntryProps[]>([]);
  const [players, setPlayers] = useState<TableDataProps[]>([]);
  // const [code, setCode] = useState("");
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());

  useEffect(() => {
    fetchLeaderboard();
    fetchTableData();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      message.error("Failed to fetch leaderboard");
    }
  };

  const fetchTableData = async () => {
    try {
      const data = await getTableData();
      setPlayers(data);
      message.success("Updated with latest data");
    } catch (error) {
      message.error("Failed to fetch table data");
    }
  };

  const handleDownload = () => {
    if (!isLoggedIn) {
      setIsLoginVisible(true);
    } else {
      message.success("Downloading code ...");
    }
  };

  const columns = [
    { title: "Player", dataIndex: "player", key: "player" },
    { title: "Code", dataIndex: "code", key: "code" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: TableDataProps) =>
        record.claimed ? (
          <Button disabled>Claimed</Button>
        ) : (
          <Button type="primary" onClick={handleDownload}>Download</Button>
        ),
    },
  ];

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
        // padding: isMobile ? "40px" : "20px"
       }}>
        <Content style={{ padding: isMobile ? "20px" : "40px" }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>H365 QRanked</Breadcrumb.Item>
          </Breadcrumb>
          
          {/* Dev Tools Section */}
          <Card title="🛠️ Dev Tools" style={{ marginBottom: 20 }}>
            <Button danger type="dashed" style={{ marginRight: 10 }} onClick={() => window.location.href = '/h365-qranked'}>
              Back to Main Site
            </Button>
            <Button danger type="dashed" style={{ marginRight: 10 }} onClick={() => setIsLoggedIn(!isLoggedIn)}>
              Force {isLoggedIn ? "Log Out" : "Log In"}
            </Button>
          </Card>

          {/* Leaderboard Section */}
          <Card title="🏆 Top Players" style={{ marginBottom: 20 }}>
            <Leaderboard leaderboard={leaderboard} />
          </Card>

          {/* Players & Codes Table Section */}
          <Card title="📋 Players & Codes">
            <Table
              columns={columns}
              dataSource={players}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              scroll={{ x: "100vw" }}
            />
          </Card>

          {/* Login Modal */}
          <Login
            visible={isLoginVisible}
            onClose={() => setIsLoginVisible(false)}
            onLoginSuccess={() => setIsLoggedIn(true)}
          />
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          H365 Ranked © Philip Lee {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default H365Main;