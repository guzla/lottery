import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LotteryHistoryTable, LotteryRound } from './LotteryHistoryTable';

const mockRounds: LotteryRound[] = [
  {
    roundId: 1,
    date: '2023-01-01',
    winningNumber: '12-34-56',
    jackpotAmount: 1000000,
    participants: 5000
  },
  {
    roundId: 2,
    date: '2023-02-01',
    winningNumber: '23-45-67',
    jackpotAmount: 1500000,
    participants: 6000
  },
  // Add more rounds to test pagination
  ...Array.from({ length: 15 }, (_, i) => ({
    roundId: i + 3,
    date: `2023-${String(i + 3).padStart(2, '0')}-01`,
    winningNumber: `${i + 1}-${i + 2}-${i + 3}`,
    jackpotAmount: 500000 * (i + 1),
    participants: 3000 + (i * 100)
  }))
];

describe('LotteryHistoryTable', () => {
  it('renders table with rounds', () => {
    render(<LotteryHistoryTable rounds={mockRounds} itemsPerPage={10} />);
    
    const table = screen.getByTestId('lottery-history-table');
    expect(table).toBeTruthy();
    
    mockRounds.slice(0, 10).forEach(round => {
      expect(screen.getByTestId(`round-${round.roundId}`)).toBeTruthy();
    });
  });

  it('handles pagination correctly', () => {
    render(<LotteryHistoryTable rounds={mockRounds} itemsPerPage={10} />);
    
    const prevButton = screen.getByTestId('prev-page');
    const nextButton = screen.getByTestId('next-page');
    const pageInfo = screen.getByTestId('page-info');

    expect(pageInfo.textContent).toBe('Page 1 of 2');
    expect(prevButton).toBeDisabled();

    fireEvent.click(nextButton);
    expect(pageInfo.textContent).toBe('Page 2 of 2');
    expect(nextButton).toBeDisabled();
  });

  it('renders empty state when no rounds', () => {
    render(<LotteryHistoryTable rounds={[]} />);
    
    const emptyTable = screen.getByTestId('empty-table');
    expect(emptyTable.textContent).toBe('No lottery history available');
  });
});