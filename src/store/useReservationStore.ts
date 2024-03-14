import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useAuthStore } from './useAuthStore';

//type 지정
interface InitialState {
  reservation: Object;
}

interface ReservationStore extends InitialState {
  reservation: {
    [key: string]: any;
  };
  setReservation: (reservationData: Object) => void;
  resetReservation: () => void;
}
const userId = useAuthStore.getState().user?.id;
const initialState: InitialState = {
  reservation: {
    userId: userId,
    date: [],
    petId: [],
    require: '',
    etc: '',
  },
};

/* reservation : {
  userId: '',
  date: [,],
  pet: [id1, id2],
  required: '',
  etc: '' 
} */

const useReservationStore = create<ReservationStore>()(
  devtools((set) => ({
    ...initialState,
    setReservation: (reservationData) =>
      set(() => ({ reservation: { reservationData } })),
    resetReservation: () => set(() => ({ reservation: { initialState } })),
  }))
);

export default useReservationStore;
