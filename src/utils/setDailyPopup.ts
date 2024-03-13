import useModalControlStore from '@/store/useModalControl';

const setDailyPopup = () => {
  const TIMEOUT = 1000;
  const DAYTOMS = 86_400_000;
  const lastHideTime = JSON.parse(
    localStorage?.getItem('lastPopupHideTime') as string
  );
  if (!lastHideTime) {
    console.log('로컬스토리지에 없음');
    setTimeout(() => {
      useModalControlStore.getState().setModal('popup', true);
    }, TIMEOUT);
  }
  const isOver24Hours = new Date().getTime() - lastHideTime > DAYTOMS;
  if (isOver24Hours) {
    console.log('24시간 지남');
    setTimeout(() => {
      useModalControlStore.getState().setModal('popup', true);
    }, TIMEOUT);
    return;
  }
  return;
};

export default setDailyPopup;
