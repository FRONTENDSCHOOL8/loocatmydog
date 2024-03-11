import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

//type 지정
interface InitialState {
  reservation: Object;
}

interface ReservationStore extends InitialState {
  reservation: {
    [key: string]: any;
  };
  setReservation: (reservationData: Object, key: string) => void;
  resetReservation: () => void;
}

const initialState: InitialState = {
  reservation: {},
};

const useReservationStore = create<ReservationStore>()(
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
