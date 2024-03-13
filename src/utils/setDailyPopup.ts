import useModalControlStore from '@/store/useModalControl';

const setDailyPopup = () => {
  const TIME_OUT = 1000;
  const DAY_TO_MS = 86_400_000;
  const lastHideTime = JSON.parse(
    localStorage?.getItem('lastPopupHideTime') as string
  );
  if (!lastHideTime) {
    setTimeout(() => {
      useModalControlStore.getState().setModal('popup', true);
    }, TIME_OUT);
  }
  const isOver24Hours = new Date().getTime() - lastHideTime > DAY_TO_MS;
  if (isOver24Hours) {
    setTimeout(() => {
      useModalControlStore.getState().setModal('popup', true);
    }, TIME_OUT);
    return;
  }
  return;
};

export default setDailyPopup;
