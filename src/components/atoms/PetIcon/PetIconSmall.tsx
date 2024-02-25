import React from 'react';
import styled from 'styled-components';

const SmallPet = styled.img.attrs((props) => ({
  src: props.src,
}))`
  inline-size: 16px;
  block-size: 8px;
  padding-inline: 2px;
  padding-block: 4px;
`;

const PetIconSmall = () => {
  return <SmallPet src={'/images/BigDog.svg'} alt="소형견" />;
};
export default PetIconSmall;
