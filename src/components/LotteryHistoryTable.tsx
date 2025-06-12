import React, { useState } from 'react';

// Define the type for a single lottery round
export interface LotteryRound {
  roundId: number;
  date: string;
  winningNumber: string;
  jackpotAmount: number;
  participants: number;
}

interface LotteryHistoryTableProps {
  rounds: LotteryRound[];
  itemsPerPage?: number;
}

export const LotteryHistoryTable: React.FC<LotteryHistoryTableProps> = ({
  rounds,
  itemsPerPage = 10
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const indexOfLastRound = currentPage * itemsPerPage;
  const indexOfFirstRound = indexOfLastRound - itemsPerPage;
  const currentRounds = rounds.slice(indexOfFirstRound, indexOfLastRound);

  const totalPages = Math.ceil(rounds.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (rounds.length === 0) {
    return <div data-testid="empty-table">No lottery history available</div>;
  }

  return (
    <div>
      <table data-testid="lottery-history-table">
        <thead>
          <tr>
            <th>Round ID</th>
            <th>Date</th>
            <th>Winning Number</th>
            <th>Jackpot</th>
            <th>Participants</th>
          </tr>
        </thead>
        <tbody>
          {currentRounds.map((round) => (
            <tr key={round.roundId} data-testid={`round-${round.roundId}`}>
              <td>{round.roundId}</td>
              <td>{round.date}</td>
              <td>{round.winningNumber}</td>
              <td>${round.jackpotAmount.toLocaleString()}</td>
              <td>{round.participants}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          data-testid="prev-page"
        >
          Previous
        </button>
        <span data-testid="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          data-testid="next-page"
        >
          Next
        </button>
      </div>
    </div>
  );
};