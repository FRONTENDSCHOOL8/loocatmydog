import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface InitialState {
  isShowModal: boolean;
}
const initialState: InitialState = {
  isShowModal: false,
};

interface ModalControlStore extends InitialState {
  toggleModal: () => void;
  setModal: (isShow: boolean) => void;
  resetModal: () => void;
}

const useModalControlStore = create<ModalControlStore>()(
  devtools((set) => ({
    ...initialState,
    toggleModal: () => set(() => ({ isShowModal: !initialState.isShowModal })),
    setModal: (isShow) => set(() => ({ isShowModal: isShow })),
    resetModal: () => set(() => ({ isShowModal: initialState.isShowModal })),
  }))
);

export default useModalControlStore;
