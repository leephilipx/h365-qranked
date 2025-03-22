import React, { useEffect, useState } from "react";
import { Table, Card, Button, Input, message, Grid } from "antd";
import { getLeaderboard, getTableData } from "../services/api";
import { isUserLoggedIn } from "../services/auth";
import Login from "./LoginModal";
import Leaderboard from "./Leaderboard";

import { LeaderboardEntryProps, TableDataProps } from "../utils/types";

const { useBreakpoint } = Grid;

const H365Main: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntryProps[]>([]);
  const [players, setPlayers] = useState<TableDataProps[]>([]);
  // const [code, setCode] = useState("");
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const screens = useBreakpoint();

  useEffect(() => {
    fetchLeaderboard();
    feachTableData();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      message.error("Failed to fetch leaderboard");
    }
  };

  const feachTableData = async () => {
    try {
      const data = await getTableData();
      setPlayers(data);
    } catch (error) {
      message.error("Failed to fetch table data");
    }
  };

  // const handleCodeSubmit = async () => {
  //   if (!code.trim()) {
  //     message.warning("Please enter a code");
  //     return;
  //   }
  //   try {
  //     await submitCode(code);
  //     message.success("Code submitted successfully!");
  //     setCode("");
  //   } catch (error) {
  //     message.error("Code submission failed");
  //   }
  // };

  const handleDownload = () => {
    if (!isLoggedIn) {
      setIsLoginVisible(true);
    } else {
      message.success("Downloading code...");
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
    <div style={{ padding: screens.md ? "40px" : "20px" }}>

      <Card title="🛠️ Dev Tools" style={{ marginBottom: 20 }}>
      <Button danger onClick={() => window.location.href = '../' }>
          Back to Main Site
        </Button>
        <Button danger onClick={() => setIsLoggedIn(!isLoggedIn)}>
          Force {isLoggedIn ? "Log Out" : "Log In"}
        </Button>
      </Card>

      {/* Leaderboard Section */}
      <Card title="🏆 Top Players" style={{ marginBottom: 20 }}>
        <Leaderboard leaderboard={leaderboard} />
      </Card>

      {/* Code Submission Section */}
      {/* <Card title="🔑 Submit Your Code" style={{ marginBottom: 20 }}>
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code..."
          style={{ marginBottom: 10 }}
        />
        <Button type="primary" onClick={handleCodeSubmit} block>
          Submit
        </Button>
      </Card> */}

      {/* Players & Codes Table */}
      <Card title="📋 Players & Codes">
        <Table
          columns={columns}
          dataSource={players}
          rowKey="id"
          pagination={{ pageSize: 5 }}
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

export default H365Main;