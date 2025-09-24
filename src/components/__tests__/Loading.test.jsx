import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading Component', () => {
  it('renders loading spinner and text', () => {
    render(<Loading />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Check for spinner element
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('rounded-full', 'h-12', 'w-12', 'border-b-2', 'border-blue-600');
  });

  it('has correct layout classes', () => {
    const { container } = render(<Loading />);
    
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('min-h-screen', 'bg-gray-50', 'flex', 'items-center', 'justify-center');
  });
});