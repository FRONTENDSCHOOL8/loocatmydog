import styled from 'styled-components';

interface PetProps {
  $inlineSize: number;
  $blockSize: number;
}

const Pet = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))<PetProps>`
  inline-size: ${(props) => {
    switch (props.$inlineSize) {
      case 26:
        return 26;
      case 20:
        return 20;
      case 16:
        return 16;
      default:
        return props.$inlineSize;
    }
  }}px;

  block-size: ${(props) => {
    switch (props.$blockSize) {
      case 12:
        return 12;
      case 10:
        return 10;
      case 8:
        return 8;
      default:
        return props.$blockSize;
    }
  }}px;
  padding-inline: 2px;
  padding-block: 4px;
`;

interface PetIconProps {
  widthHeight: { blockSize: number; inlineSize: number };
}

const PetIcon = ({ widthHeight }: PetIconProps) => {
  const { blockSize = 20, inlineSize = 10 } = widthHeight;

  let dogSize;
  if (blockSize <= 20) {
    dogSize = '소형견';
  } else if (blockSize <= 30) {
    dogSize = '중형견';
  } else {
    dogSize = '대형견';
  }

  return (
    <Pet
      src={'/images/BigDog.svg'}
      $blockSize={blockSize}
      $inlineSize={inlineSize}
      alt={dogSize}
    />
  );
};

export default PetIcon;
