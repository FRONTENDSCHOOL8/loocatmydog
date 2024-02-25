import React from 'react';
import styled from 'styled-components';

const BigPet = styled.img.attrs((props) => ({
  src: props.src,
}))`
  inline-size: 25px;
  block-size: 12px;
  padding-inline: 2px;
  padding-block: 4px;
`;

const PetIconBig = () => {
  return <BigPet src={'/images/BigDog.svg'} alt="대형견" />;
};

export default PetIconBig;
