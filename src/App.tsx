import React, { useState } from 'react';
import * as Styled from './app.styles';
import pictures, { pictureNames } from './pictures';

const preparedCards = [
  ...pictureNames,
  ...pictureNames,
  ...pictureNames,
  ...pictureNames,
]
  .map((item) => ({ word: item, id: Math.random() }))
  .sort((a, b) => a.id - b.id);

function App() {
  const [gone, setGone] = useState<number[]>([]);
  const [firstCard, setFirstCard] = useState<
    { word: string; id: number } | undefined
  >();
  const [secondCard, setSecondCard] = useState<
    { word: string; id: number } | undefined
  >();

  const onCardClick = (item: any) => {
    if (!firstCard) {
      setFirstCard(item);
    } else if (!secondCard) {
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
  };
  return (
    <Styled.Container>
      {preparedCards.map((card) => {
        if (gone.includes(card.id)) {
          return <Styled.Box className='box' key={card.id}></Styled.Box>;
        }
        return (
          <Styled.Box className='box' key={card.id}>
            <Styled.Cover onClick={() => onCardClick(card)} />
            <Styled.Face
              imgUrl={pictures[card.word]}
              visible={card.id === firstCard?.id || card.id === secondCard?.id}
            />
          </Styled.Box>
        );
      })}
    </Styled.Container>
  );
}

export default App;
