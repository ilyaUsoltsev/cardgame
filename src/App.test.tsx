import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import App from './App';

jest.mock('./utils/prepare-cards', () => ({
  prepareCards: () => [
    { word: 'cat', id: 1 },
    { word: 'cat', id: 2 },
    { word: 'dog', id: 3 },
    { word: 'dog', id: 4 },
  ],
}));

const getCard = (container: HTMLElement) => (number: number) => {
  return container.children[number].children[1] as HTMLElement;
};

describe('app main logic', () => {
  let getCardByNumber: (number: number) => HTMLElement;
  let container: HTMLElement;
  beforeEach(() => {
    render(<App />);
    container = screen.getByTestId('cards-container');
    getCardByNumber = getCard(container);
  });

  test('renders main info', () => {
    expect(screen.getByText(/card game/i)).toBeInTheDocument();
    expect(screen.getByText(/time/i)).toBeInTheDocument();
    expect(screen.getByText('Moves: 0')).toBeInTheDocument();
  });

  test('increments counter', async () => {
    expect(screen.getByText('Time: 0')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Time: 1')).toBeInTheDocument();
    });
  });

  test('expect container to have 4 children', async () => {
    expect(container.children.length).toBe(4);
  });

  test('expect moves to increment after clicking two cards', async () => {
    fireEvent.click(getCardByNumber(0));
    fireEvent.click(getCardByNumber(1));
    await waitFor(() => {
      expect(screen.getByText('Moves: 1')).toBeInTheDocument();
    });
  });

  test('expect two same cards have zero opacity when clicked', async () => {
    fireEvent.click(getCardByNumber(0));
    fireEvent.click(getCardByNumber(1));
    await waitFor(() => {
      expect(getCardByNumber(0)).toHaveStyle('opacity: 0');
      expect(getCardByNumber(1)).toHaveStyle('opacity: 0');
    });
  });

  test('expect game over message after game over and game restart by pressing button', async () => {
    fireEvent.click(getCardByNumber(0));
    fireEvent.click(getCardByNumber(1));
    await waitFor(() => {
      expect(screen.getByText('Moves: 1')).toBeInTheDocument();
    });
    fireEvent.click(getCardByNumber(2));
    fireEvent.click(getCardByNumber(3));
    await waitFor(() => {
      expect(screen.getByText('Moves: 2')).toBeInTheDocument();
      expect(screen.getByText(/you won/i)).toBeInTheDocument();
    });
    const newGameButton = screen.getByTestId('new-game-button');
    fireEvent.click(newGameButton);
    await waitFor(() => {
      expect(screen.getByText('Moves: 0')).toBeInTheDocument();
      expect(screen.getByText('Time: 0')).toBeInTheDocument();
    });
  });
});