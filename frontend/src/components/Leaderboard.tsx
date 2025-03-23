import { useEffect, useState } from 'react';
import { Avatar, Card, List, Typography } from 'antd';
import { LeaderboardProps } from '../utils/types';


const { Text } = Typography;

const getMedal = (rank: number) => {
  const medals = ['🥇', '🥈', '🥉'];
  return medals[rank] || `#${rank + 1}`;
};

const funnyTitles = [
  "🦄 The Unstoppable Force of QR Redemption! No one can match this speed!",
  "🚀 QR Code Ninja – Scanning faster than the eye can see!",
  "🔥 Too Fast, Too Furious – Breaking QR code records like a true champion!",
  "🎉 The Redemption Legend – Turning QR codes into rewards like magic!",
  "👑 The Barcode Overlord – Conquering every QR code in sight!"
];

// Champion title persistence
const useChampionTitle = () => {
  const [title, setTitle] = useState<string | null>(null);
  useEffect(() => {
    if (performance.navigation.type === 1) {
      const randomTitle = funnyTitles[Math.floor(Math.random() * funnyTitles.length)];
      localStorage.setItem('championTitle', randomTitle);
      setTitle(randomTitle);
    } else {
      const storedTitle = localStorage.getItem('championTitle');
      if (storedTitle) {
        setTitle(storedTitle);
      } else {
        const randomTitle = funnyTitles[Math.floor(Math.random() * funnyTitles.length)];
        localStorage.setItem('championTitle', randomTitle);
        setTitle(randomTitle);
      }
    }
  }, []);
  return title;
};


const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {

  const championTitle = useChampionTitle();

  return (
    <div>
      {leaderboard.length > 0 && (
        <Card type="inner" style={{ marginBottom: 10, backgroundColor: '#fffbe6' }}>
          <Text style={{
            fontSize: '140%',
            fontWeight: '800',
            background: 'linear-gradient(90deg, #ff9900, #9900ff, #ff9900)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            backgroundSize: '400% 100%',
            animation: 'gradientMove 2s ease-in-out infinite',
          }}>
            {leaderboard[0].userAlias}
          </Text>
          <Text type="secondary" style={{ display: 'block', marginTop: 5 }}>
            {championTitle}
          </Text>
          <style>
            {`
              @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}
          </style>
        </Card>
      )}
      <List
        itemLayout="horizontal"
        dataSource={leaderboard}
        renderItem={(user, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: '#f5f5f5' }}>{getMedal(index)}</Avatar>}
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