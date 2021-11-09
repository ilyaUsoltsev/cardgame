import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const timeCount = useRef(0);
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
    let intervalId: number;
    if (gameOn.current) {
      intervalId = window.setInterval(() => {
        timeCount.current++;
        setTime(timeCount.current);
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
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

  return (
    <>
      <h1>Card game</h1>
      <p>Time: {time}</p>
      <p>Moves: {tries.current}</p>
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
