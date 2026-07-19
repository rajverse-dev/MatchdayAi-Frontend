import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner, FullPageSpinner } from './Spinner';

describe('Spinner', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Spinner />);
    const spinnerElement = container.querySelector('.animate-spin');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement?.className).toContain('h-8 w-8'); // md size default
  });

  it('renders small size correctly', () => {
    const { container } = render(<Spinner size="sm" />);
    const spinnerElement = container.querySelector('.animate-spin');
    expect(spinnerElement?.className).toContain('h-4 w-4');
  });
});

describe('FullPageSpinner', () => {
  it('renders loading text and spinner', () => {
    render(<FullPageSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Loading...').className).toContain('animate-pulse');
  });
});
