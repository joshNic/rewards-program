import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import * as rewardsUtil from '../utils/rewardsUtil';

// Mock the utils
vi.mock('../utils/rewardsUtil', () => ({
  mockApiFetch: vi.fn(),
  processCustomerRewards: vi.fn(),
  filteredMonths: vi.fn()
}));

describe('App Integration Tests', () => {
  const mockTransactionData = [
    { id: 1, customerId: 'C001', customerName: 'John Smith', amount: 120, date: '2024-01-15' }
  ];

  const mockRewardsData = [
    {
      customerId: 'C001',
      customerName: 'John Smith', 
      monthlyRewards: { 'January 2024': 90 },
      totalRewards: 90
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default mocks
    rewardsUtil.mockApiFetch.mockResolvedValue(mockTransactionData);
    rewardsUtil.processCustomerRewards.mockReturnValue(mockRewardsData);
    rewardsUtil.filteredMonths.mockReturnValue(['January 2024']);
  });

  it('shows loading initially then displays rewards data', async () => {
    render(<App />);
    
    // Loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Customer Rewards Program')).toBeInTheDocument();
    });

    // Check that rewards display is shown
    expect(screen.getByText('John Smith')).toBeInTheDocument();

  });

  it('calls utility functions with correct data flow', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Customer Rewards Program')).toBeInTheDocument();
    });

    // Verify function calls
    expect(rewardsUtil.mockApiFetch).toHaveBeenCalledOnce();
    expect(rewardsUtil.processCustomerRewards).toHaveBeenCalledWith(mockTransactionData);
    expect(rewardsUtil.filteredMonths).toHaveBeenCalledWith(mockRewardsData);
  });

  it('displays program description', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Points earned: 2 points per \$1 over \$100/)).toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    rewardsUtil.mockApiFetch.mockRejectedValue(new Error('API Error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching data:', expect.any(Error));
    
    consoleErrorSpy.mockRestore();
  });

  it('has proper layout structure', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Customer Rewards Program')).toBeInTheDocument();
    });

    // Check main container classes
    const mainContainer = document.querySelector('.min-h-screen.bg-gray-50');
    expect(mainContainer).toBeInTheDocument();

    // Check card structure
    const cardContainer = document.querySelector('.bg-white.shadow-lg.rounded-lg');
    expect(cardContainer).toBeInTheDocument();
  });
});