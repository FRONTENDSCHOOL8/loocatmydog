import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const initialState = {
  reservation: {},
};

const useReservationStore = create()(
  devtools((set) => ({
    ...initialState,
    setReservation: (reservationData, key) =>
      set((prevState) => ({
        reservation: {
          ...prevState.reservation,
          [key]: { ...prevState.reservation[key], ...reservationData },
        },
      })),
    resetReservation: () => set(() => ({ reservation: { initialState } })),
  }))
);

export default useReservationStore;
