import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface InitialState {
  isShowModal: {
    [key: string]: boolean;
  };
}
const initialState: InitialState = {
  isShowModal: {
    sideMenu: false,
    popup: false,
  },
};

interface ModalControlStore extends InitialState {
  toggleModal: (target: string) => void;
  setModal: (target: string, isShow: boolean) => void;
  resetModal: () => void;
}

const useModalControlStore = create<ModalControlStore>()(
  devtools((set) => ({
    ...initialState,
    toggleModal: (target) =>
      set((state) => ({
        isShowModal: {
          ...state.isShowModal,
          [target]: !state.isShowModal[target],
        },
      })),
    setModal: (target, isShow) =>
      set((state) => ({
        isShowModal: { ...state.isShowModal, [target]: isShow },
      })),
    resetModal: () => set(() => ({ isShowModal: initialState.isShowModal })),
  }))
);

export default useModalControlStore;
