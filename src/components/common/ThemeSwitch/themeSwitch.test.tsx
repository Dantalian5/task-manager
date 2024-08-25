import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSwitch from '@/components/common/ThemeSwitch';
import { useTheme } from 'next-themes';

// Mock de `useTheme` de `next-themes`
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeSwitch', () => {
  const setTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme,
    });
  });

  it('renders the switch with the correct initial state', () => {
    render(<ThemeSwitch />);

    const switchElement = screen.getByRole('switch', {
      name: /Switch Color Theme/i,
    });
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toBeChecked(); // Light mode, so switch is "on"
  });

  it('toggles the theme when the switch is clicked', () => {
    render(<ThemeSwitch />);

    const switchElement = screen.getByRole('switch', {
      name: /Switch Color Theme/i,
    });
    fireEvent.click(switchElement);

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('sets the theme to light when the switch is toggled back', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme,
    });

    render(<ThemeSwitch />);

    const switchElement = screen.getByRole('switch', {
      name: /Switch Color Theme/i,
    });
    expect(switchElement).not.toBeChecked(); // Dark mode, so switch is "off"

    fireEvent.click(switchElement);

    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
