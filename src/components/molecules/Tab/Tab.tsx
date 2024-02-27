import styled from 'styled-components';

const StyledTabBox = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${(props) => props.theme.colors.lineColorGray};
  padding-inline: 70px;
  gap: 30px;

  & input {
    appearance: none;
  }
`;

interface TabBoxLabelProps {
  $mode: 'front' | 'after';
}

const StyledPresentTabLabel = styled.label<TabBoxLabelProps>`
  ${(props) => props.theme.fontStyles.textSemiboldBase}
  padding-inline: 30px;
  padding-block: 15px;
  border-bottom: ${(props) =>
    props.$mode === 'front'
      ? `2px solid ${props.theme.colors.orange}`
      : 'none'};
`;

const StyledPreviousTabLabel = styled.label<TabBoxLabelProps>`
  ${(props) => props.theme.fontStyles.textSemiboldBase}
  padding-inline: 30px;
  padding-block: 15px;
  border-bottom: ${(props) =>
    props.$mode === 'after'
      ? `2px solid ${props.theme.colors.orange}`
      : 'none'};
`;

interface TabBoxProps {
  mode: 'front' | 'after';
  front: '진행 예약' | '스토리';
  after: '지난 예약' | '내가 쓴 글';
  onModeChange: (mode: 'front' | 'after') => void;
}

const Tab = ({ mode, front, after, onModeChange }: TabBoxProps) => {
  return (
    <StyledTabBox>
      <StyledPresentTabLabel
        $mode={mode}
        htmlFor="presentBook"
        onClick={() => onModeChange('front')}
      >
        {front}
      </StyledPresentTabLabel>
      <input
        type="radio"
        name="books"
        id="presentBook"
        checked={mode === 'front'}
      />
      <StyledPreviousTabLabel
        $mode={mode}
        htmlFor="previousBook"
        onClick={() => onModeChange('after')}
      >
        {after}
      </StyledPreviousTabLabel>
      <input
        type="radio"
        name="books"
        id="previousBook"
        checked={mode === 'after'}
      />
    </StyledTabBox>
  );
};

export default Tab;
