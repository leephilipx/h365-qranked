import { Card, List, Avatar, Typography } from 'antd';
import { LeaderboardProps } from '../utils/types';

const { Text } = Typography;

const getMedal = (rank: number) => {
  const medals = ['🥇', '🥈', '🥉'];
  return medals[rank] || `#${rank + 1}`;
};

const funnyTitles = [
  "The Unstoppable! 🦄",
  "QR Code Ninja! 🚀",
  "Too Fast, Too Furious! 🔥",
  "Redemption Legend! 🎉"
];

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {
  return (
    <div>
      {leaderboard.length > 0 && (
        <Card style={{ marginBottom: 20, backgroundColor: '#fffbe6' }}>
          <Text strong style={{ fontSize: 18 }}>
            👑 Champion: {leaderboard[0].userAlias}
          </Text>
          <Text type="secondary" style={{ display: 'block', marginTop: 5 }}>
            {funnyTitles[Math.floor(Math.random() * funnyTitles.length)]}
          </Text>
        </Card>
      )}
      <List
        itemLayout="horizontal"
        dataSource={leaderboard}
        renderItem={(user, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{getMedal(index)}</Avatar>}
              title={<Text strong>{user.userAlias}</Text>}
              description={<Text type="secondary">Redeemed {user.codeCountRedeemedTOT} QR codes!</Text>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Leaderboard;
