import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LotteryHistory from '../components/LotteryHistory'
import { LotteryProvider } from '../context/context'

// Mock the useLotteryContext hook
vi.mock('../context/context', () => ({
  useLotteryContext: () => ({
    lotteryContract: {
      roundCounter: vi.fn().mockResolvedValue(10),
      lotteryHistory: vi.fn().mockImplementation((index) => ({
        timestamp: { toNumber: () => 1623456789 + index },
        potSize: { toString: () => '0.1' },
        winner: `0x123456789${index}`,
        participants: { toNumber: () => 5 }
      }))
    }
  }),
  LotteryProvider: ({ children }: { children: React.ReactNode }) => children
}))

describe('LotteryHistory Component', () => {
  it('renders loading state initially', () => {
    render(
      <LotteryProvider>
        <LotteryHistory />
      </LotteryProvider>
    )
    
    expect(screen.getByText(/loading lottery history/i)).toBeTruthy()
  })

  it('renders lottery history table when data is available', async () => {
    render(
      <LotteryProvider>
        <LotteryHistory />
      </LotteryProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText(/Lottery History/i)).toBeTruthy()
      expect(screen.getByText(/Round/i)).toBeTruthy()
      expect(screen.getByText(/Timestamp/i)).toBeTruthy()
      expect(screen.getByText(/Pot Size/i)).toBeTruthy()
      expect(screen.getByText(/Winner/i)).toBeTruthy()
      expect(screen.getByText(/Participants/i)).toBeTruthy()
    })
  })
})