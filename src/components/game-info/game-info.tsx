import React, { FC } from 'react';

interface IProps {
  time: number;
  moves: number;
  gameOver: boolean;
  onClick: () => void;
}

const GameInfo: FC<IProps> = ({ time, moves, gameOver, onClick }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Card game</h1>
      <p>Time: {time}</p>
      <p>Moves: {moves}</p>
      {gameOver && (
        <h3>
          You won in {time} seconds and {moves} moves!
          <br />
          <button onClick={onClick}>New game</button>
        </h3>
      )}
    </div>
  );
};

export default GameInfo;
