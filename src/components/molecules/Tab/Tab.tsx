import { MouseEventHandler } from 'react';
import styled from 'styled-components';

const StyledTabBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.lineColorGray};
  padding-inline: 10px;
  padding-block: 15px;
  gap: 30px;

  & input {
    appearance: none;
    margin: 0;
  }
`;

interface TabBoxLabelProps {
  $mode: 'front' | 'after';
}

const StyledPresentTabLabel = styled.label<TabBoxLabelProps>`
  ${(props) => props.theme.fontStyles.textSemiboldBase}
  padding-inline: 30px;
  padding-block: 15px;
  color: ${(props) =>
    props.$mode === 'after'
      ? `${props.theme.colors.textGray}`
      : `${props.theme.colors.textBlack}`};
  border-bottom: ${(props) =>
    props.$mode === 'front'
      ? `2px solid ${props.theme.colors.orange}`
      : 'none'};
`;

const StyledPreviousTabLabel = styled.label<TabBoxLabelProps>`
  ${(props) => props.theme.fontStyles.textSemiboldBase}
  padding-inline: 30px;
  padding-block: 15px;
  color: ${(props) =>
    props.$mode === 'front'
      ? `${props.theme.colors.textGray}`
      : `${props.theme.colors.textBlack}`};
  border-bottom: ${(props) =>
    props.$mode === 'after'
      ? `2px solid ${props.theme.colors.orange}`
      : 'none'};
`;

interface TabBoxProps {
  mode: 'front' | 'after';
  front: '진행 예약' | '스토리';
  after: '지난 예약' | '내가 쓴 글';
  onClick?: MouseEventHandler<HTMLLabelElement>;
  [key: string]: any;
}

const Tab = ({ mode, front, after, onClick, ...restProps }: TabBoxProps) => {
  return (
    <StyledTabBox {...restProps}>
      <div>
        <StyledPresentTabLabel
          $mode={mode}
          htmlFor="presentBook"
          onClick={onClick}
        >
          {front}
        </StyledPresentTabLabel>
        <input
          type="radio"
          name="books"
          id="presentBook"
          defaultChecked={mode === 'front'}
        />
      </div>
      <div>
        <StyledPreviousTabLabel
          $mode={mode}
          htmlFor="previousBook"
          onClick={onClick}
        >
          {after}
        </StyledPreviousTabLabel>
        <input
          type="radio"
          name="books"
          id="previousBook"
          defaultChecked={mode === 'after'}
        />
      </div>
    </StyledTabBox>
  );
};

export default Tab;
