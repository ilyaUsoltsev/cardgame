import React, { FC } from 'react';
import { ICard } from '../../models/card';
import * as Styled from './card.styles';

interface IProps {
  card: ICard;
  visible: boolean;
  isGone: boolean;
  onClick: (card: ICard) => void;
}

const Card: FC<IProps> = ({ card, visible, isGone, onClick }) => {
  return (
    <Styled.Box>
      <Styled.Face imgUrl={card.word} visible={!visible} gone={isGone} />
      <Styled.Cover
        onClick={() => onClick(card)}
        visible={visible}
        gone={isGone}
      />
    </Styled.Box>
  );
};

export default Card;
