import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginPage } from './LoginPage';
import { BrowserRouter } from 'react-router-dom';

// Mock contexts and hooks
const mockLogin = vi.fn();
const mockNavigate = vi.fn();
const mockNotify = vi.fn();

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ login: mockLogin })
}));

vi.mock('../../context/NotificationContext', () => ({
  useNotification: () => ({ notify: mockNotify })
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  };

  it('renders login form correctly', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('you@stadium.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('submits form with credentials', async () => {
    renderComponent();
    
    mockLogin.mockResolvedValueOnce({});
    
    const emailInput = screen.getByPlaceholderText('you@stadium.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@matchday.ai' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@matchday.ai', 'password123');
      expect(mockNotify).toHaveBeenCalledWith(expect.objectContaining({
        type: 'success'
      }));
    });
  });

  it('displays error on failed login', async () => {
    renderComponent();
    
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });
  });
});
