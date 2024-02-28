import styled from 'styled-components';

interface InlineProps {
  $inlineSize: number;
}

const StyledInline = styled.img.attrs((props) => ({
  src: props.src,
}))<InlineProps>`
  inline-size: ${(props) => props.$inlineSize}px;
  aspect-ratio: 5/2;
`;

interface LogoInlineProps {
  inlineSize?: number;
}

const LogoInline = ({ inlineSize = 50 }: LogoInlineProps) => {
  return (
    <StyledInline
      src={'/images/logo.svg'}
      alt="봐주개냥 가로버전 로고"
      $inlineSize={inlineSize}
    />
  );
};
export default LogoInline;
