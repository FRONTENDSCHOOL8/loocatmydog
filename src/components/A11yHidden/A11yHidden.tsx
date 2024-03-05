import styled from 'styled-components';

//type 정의
interface A11yHiddenProps {
  as?: string;
  [key: string]: any;
}

const StyledA11yHidden = styled.span`
  overflow: hidden;
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: circle(0);
  width: 1px;
  height: 1px;
  margin: -1px;
  white-space: nowrap;
`;

const A11yHidden = ({
  as: ComponentName = 'span',
  ...restProps
}: A11yHiddenProps) => {
  return <StyledA11yHidden as={ComponentName} {...restProps} />;
};

export default A11yHidden;
