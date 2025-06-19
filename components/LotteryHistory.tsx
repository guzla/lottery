import React, { useState, useEffect } from 'react';
import { useLotteryContext } from '../context/context';
import Table from './Table';
import styles from '../styles/Table.module.css';

interface LotteryRound {
  roundId: number;
  timestamp: number;
  potSize: string;
  winner: string;
  participants: number;
}

const LotteryHistory: React.FC = () => {
  const { lotteryContract } = useLotteryContext();
  const [history, setHistory] = useState<LotteryRound[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLotteryHistory = async () => {
      try {
        setIsLoading(true);
        if (!lotteryContract) {
          throw new Error('Lottery contract not initialized');
        }

        // Fetch the last 10 rounds of lottery history
        const roundCount = await lotteryContract.roundCounter();
        const historyPromises = [];

        for (let i = Math.max(0, roundCount - 10); i < roundCount; i++) {
          historyPromises.push(lotteryContract.lotteryHistory(i));
        }

        const historicalRounds = await Promise.all(historyPromises);
        
        const formattedHistory: LotteryRound[] = historicalRounds.map((round, index) => ({
          roundId: index,
          timestamp: round.timestamp.toNumber(),
          potSize: round.potSize.toString(),
          winner: round.winner,
          participants: round.participants.toNumber()
        }));

        setHistory(formattedHistory.reverse());
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error fetching lottery history');
        setIsLoading(false);
      }
    };

    if (lotteryContract) {
      fetchLotteryHistory();
    }
  }, [lotteryContract]);

  if (isLoading) {
    return <div>Loading lottery history...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const historyHeaders = ['Round', 'Timestamp', 'Pot Size', 'Winner', 'Participants'];
  const historyData = history.map(round => [
    round.roundId.toString(),
    new Date(round.timestamp * 1000).toLocaleString(),
    `${round.potSize} ETH`,
    round.winner,
    round.participants.toString()
  ]);

  return (
    <div className={styles.historyContainer}>
      <h2>Lottery History</h2>
      {history.length > 0 ? (
        <Table headers={historyHeaders} data={historyData} />
      ) : (
        <p>No lottery history available</p>
      )}
    </div>
  );
};

export default LotteryHistory;