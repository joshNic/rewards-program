import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomerRewardsDisplay } from '../CustomerRewardsDisplay';

describe('CustomerRewardsDisplay', () => {
  const mockRewardsData = [
    {
      customerId: 'C001',
      customerName: 'John Smith',
      monthlyRewards: { 'January 2024': 90, 'February 2024': 250 },
      totalRewards: 340
    },
    {
      customerId: 'C002', 
      customerName: 'Jane Doe',
      monthlyRewards: { 'January 2024': 39, 'February 2024': 0 },
      totalRewards: 39
    }
  ];

  const filteredMonths = ['January 2024', 'February 2024'];

  it('renders table with headers and customer data', () => {
    render(<CustomerRewardsDisplay rewardsData={mockRewardsData} filteredMonths={filteredMonths} />);
    
    // Headers
    expect(screen.getByText('Customer')).toBeInTheDocument();
    expect(screen.getByText('January 2024')).toBeInTheDocument();
    expect(screen.getByText('February 2024')).toBeInTheDocument();
    expect(screen.getByText('Total Points')).toBeInTheDocument();
    
    // Customer data
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('C001')).toBeInTheDocument();
    expect(screen.getByText('C002')).toBeInTheDocument();
  });

  it('displays correct points values', () => {
    render(<CustomerRewardsDisplay rewardsData={mockRewardsData} filteredMonths={filteredMonths} />);
    
    expect(screen.getByText('90 points')).toBeInTheDocument();
    expect(screen.getByText('250 points')).toBeInTheDocument();
    expect(screen.getByText('340 points')).toBeInTheDocument();
    
  });

  it('handles empty data gracefully', () => {
    render(<CustomerRewardsDisplay rewardsData={[]} filteredMonths={[]} />);
    
    expect(screen.getByText('Customer')).toBeInTheDocument();
    expect(screen.getByText('Total Points')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('has responsive table container', () => {
    render(<CustomerRewardsDisplay rewardsData={mockRewardsData} filteredMonths={filteredMonths} />);
    
    const table = screen.getByRole('table');
    expect(table.parentElement).toHaveClass('overflow-x-auto');
    expect(table).toHaveClass('min-w-full', 'divide-y', 'divide-gray-200');
  });
});