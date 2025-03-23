
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Table, message } from "antd";
import Login from "./LoginModal";
import Leaderboard from "./Leaderboard";

import { getLeaderboard, getTableData } from "../services/api";
import { isUserLoggedIn } from "../services/auth";
import { LeaderboardEntryProps, TableDataProps } from "../utils/types";


const H365Home: React.FC = () => {

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntryProps[]>([]);
  const [players, setPlayers] = useState<TableDataProps[]>([]);
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


  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>H365 QRanked</Breadcrumb.Item>
        <Breadcrumb.Item
          className="breadcrumb-item-active"
          onClick={() => window.location.href = '/h365-qranked#/alpha'}>
          Home
        </Breadcrumb.Item>
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
    </div>
  );
};

export default H365Home;