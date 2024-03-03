import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type DateRange<T> = (T | null)[];

interface InitialState<T> {
  dateRange: DateRange<T>;
}
const initialState: InitialState<Date> = {
  dateRange: [null, null],
};

interface DateRangeStore {
  dateRange: DateRange<Date>;
  setDateRange: (date: DateRange<Date>) => void;
  resetDateRange: () => void;
}
// Redux devtools 사용
const useDateRangeStore = create<DateRangeStore>()(
  devtools((set) => ({
    ...initialState,
    setDateRange: (date) => set(() => ({ dateRange: date })),
    resetDateRange: () => set(() => ({ dateRange: initialState.dateRange })),
  }))
);

// Redux devtools 미사용
// const useDateRangeStore = create<DateRangeStore>((set) => ({
//   ...initialState,
//   setDateRange: (date) => set(() => ({ dateRange: date })),
// }));

export default useDateRangeStore;
