import { useCallback, useEffect, useRef, useState } from 'react';
import * as Styled from './app.styles';
import Card from './components/card/card';
import GameInfo from './components/game-info/game-info';
import { ICard } from './models/card';
import { prepareCards } from './utils/prepare-cards';

function App() {
  const timer = useRef<number>();
  const [gameOver, setGameOver] = useState(false);
  const [moves, setMoves] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [gone, setGone] = useState<Record<number, boolean>>({});
  const [firstCard, setFirstCard] = useState<ICard | undefined>();
  const [secondCard, setSecondCard] = useState<ICard | undefined>();
  const [cards, setCards] = useState<ICard[]>([]);

  const shuffleCards = () => {
    setCards(prepareCards());
  };

  const startNewGame = useCallback(() => {
    timer.current = window.setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    setMoves(0);
    shuffleCards();
    setGameOver(false);
    setGone([]);
    setTime(0);
  }, []);

  useEffect(() => {
    startNewGame();
    return () => {
      clearInterval(timer.current);
    };
  }, [startNewGame]);


  const flipCards = useCallback(() => {
    setFirstCard(undefined);
    setSecondCard(undefined);
    setMoves(moves + 1);
  }, [moves]);

  const checkGameEnd = useCallback(() => {
    if (Object.keys(gone).length + 2 === cards.length) {
      setGameOver(true);
      clearInterval(timer.current);
    }
  }, [cards.length, gone]);

  const onCardClick = useCallback(
    (item: any) => {
      if (!firstCard) {
        setFirstCard(item);
      } else if (!secondCard) {
        setSecondCard(item);
        setTimeout(() => {
          if (firstCard.word === item.word) {
            checkGameEnd();
            setGone({ ...gone, [item.id]: true, [firstCard.id]: true });
          }
          flipCards();
        }, 1000);
      }
    },
    [firstCard, secondCard, gone, checkGameEnd, flipCards]
  );

  return (
    <>
      <GameInfo
        onClick={startNewGame}
        moves={moves}
        gameOver={gameOver}
        time={time}
      />
      <Styled.Container data-testid='cards-container'>
        {cards.map((card) => (
          <Card
            key={card.id}
            visible={card.id !== firstCard?.id && card.id !== secondCard?.id}
            isGone={!!gone[card.id]}
            onClick={onCardClick}
            card={card}
          />
        ))}
      </Styled.Container>
    </>
  );
}

export default App;
