import React from 'react';
import * as Styled from './app.styles';

const pictures = [
  'cat',
  'dog',
  'mood',
  'moon',
  'phone',
  'sand',
  'sky',
  'soccer',
];

const preparedCards = [...pictures, ...pictures]
  .map((item) => ({ word: item, id: Math.random() }))
  .sort((a, b) => a.id - b.id);

function App() {
  return (
    <Styled.Container className='container'>
      {preparedCards.map((card) => (
        <Styled.Box className='box' key={card.id}>
          <Styled.Cover />
        </Styled.Box>
      ))}
    </Styled.Container>
  );
}

export default App;
