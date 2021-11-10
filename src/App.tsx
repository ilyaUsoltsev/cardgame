import { useCallback, useEffect, useRef, useState } from 'react';
import * as Styled from './app.styles';
import pictures, { pictureNames } from './pictures';

const preparedCards = [
  ...pictureNames,
  ...pictureNames,
  // ...pictureNames,
  // ...pictureNames,
]
  .map((item) => ({ word: item, id: Math.random() }))
  .sort((a, b) => a.id - b.id);

function App() {
  const gameOn = useRef(false);
  const [gameOver, setGameOver] = useState(false);
  const timer = useRef<number>();
  const tries = useRef(0);
  const [time, setTime] = useState<number>(0);
  const [gone, setGone] = useState<number[]>([]);
  const [firstCard, setFirstCard] = useState<
    { word: string; id: number } | undefined
  >();
  const [secondCard, setSecondCard] = useState<
    { word: string; id: number } | undefined
  >();

  useEffect(() => {
    if (gameOn.current) {
      timer.current = window.setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [gameOn.current]);

  const onCardClick = useCallback(
    (item: any) => {
      if (!gameOn.current) {
        gameOn.current = true;
      }
      if (!firstCard) {
        setFirstCard(item);
      } else if (!secondCard) {
        tries.current++;
        setSecondCard(item);
        setTimeout(() => {
          if (firstCard.word === item.word) {
            if (gone.length + 2 === preparedCards.length) {
              setGameOver(true);
              clearInterval(timer.current);
              gameOn.current = false;
            }
            setGone([...gone, item.id, firstCard.id]);
            setFirstCard(undefined);
            setSecondCard(undefined);
          } else {
            setFirstCard(undefined);
            setSecondCard(undefined);
          }
        }, 1000);
      }
    },
    [firstCard, secondCard, gone]
  );

  const startNewGame = () => {
    tries.current = 0;
    gameOn.current = true;
    setGameOver(false);
    setGone([]);
    setTime(0);
  };

  return (
    <>
      <h1>Card game</h1>
      <p>Time: {time}</p>
      <p>Moves: {tries.current}</p>
      {gameOver && (
        <h3>
          You won in {time} seconds and {tries.current} moves!
          <br />
          <button onClick={startNewGame}>New game</button>
        </h3>
      )}
      <Styled.Container>
        {preparedCards.map((card) => {
          const isGone = gone.includes(card.id);
          const visible =
            card.id !== firstCard?.id && card.id !== secondCard?.id;
          return (
            <Styled.Box key={card.id}>
              <Styled.Face
                imgUrl={pictures[card.word]}
                visible={!visible}
                gone={isGone}
              />
              <Styled.Cover
                onClick={() => onCardClick(card)}
                visible={visible}
                gone={isGone}
              />
            </Styled.Box>
          );
        })}
      </Styled.Container>
    </>
  );
}

export default App;
