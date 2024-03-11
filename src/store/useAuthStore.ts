import pb from '@/api/pocketbase';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { CreateStore } from './types';

// 1. 로그인 user 정보가 필요한 곳에선 useAuthStore.getState().user 를 호출하여 사용해주세요.
// 2. useAuthStore에 선언된 함수를 실행하려면 useAuthStore.getState().XXX() 를 호출하여 사용해주세요.

/* -------------------------------------------------------------------------- */

// 사용자 콜렉션
const USER_COLLECTION = 'users';

// 인증 스토어
interface AuthStore {
  isAuth: boolean;
  user: { [key: string]: any } | null;
  token: string;
  signIn: (userNameOrEmail: string, password: string) => Promise<void>;
  update: () => Promise<void>;
  signOut: () => Promise<void>;
  withDrawal: (recordId: string) => Promise<boolean>;
}

// 인증 상태
type AuthState = Pick<AuthStore, 'isAuth' | 'user' | 'token'>;

/* -------------------------------------------------------------------------- */

// 인증 초기 상태 값
const initialAuthState: AuthState = {
  isAuth: false,
  user: null,
  token: '',
};

/* -------------------------------------------------------------------------- */

// 스토어 생성 함수
const createStore: CreateStore<AuthStore> = (set) => ({
  // 초기 상태
  ...initialAuthState,

  // 상태 업데이트 메서드
  signIn: async (userNameOrEmail, password) => {
    const authData = await pb
      .collection(USER_COLLECTION)
      .authWithPassword(userNameOrEmail, password, {
        expand: 'petId, heart',
      });

    const { record, token } = authData;

    set(
      (state: AuthState) => ({
        ...state,
        isAuth: !!record,
        user: record,
        token,
      }),
      false,
      'auth/signin'
    );
  },

  update: async () => {
    const authData = await pb.collection(USER_COLLECTION).authRefresh({
      expand: 'petId, heart',
    });

    const { record, token } = authData;

    set(
      (state: AuthState) => ({
        ...state,
        isAuth: !!record,
        user: record,
        token,
      }),
      false,
      'auth/signin'
    );
  },

  //로그아웃
  signOut: async () => {
    pb.authStore.clear();

    set(
      (state) => ({
        ...state,
        ...initialAuthState,
      }),
      false,
      'auth/signout'
    );
  },

  // 회원 탈퇴
  withDrawal: async (recordId) => {
    const response = await pb.collection(USER_COLLECTION).delete(recordId);
    pb.authStore.clear();

    set(
      (state) => ({
        ...state,
        ...initialAuthState,
      }),
      false,
      'auth/withDrawal'
    );

    return response;
  },
});

/* -------------------------------------------------------------------------- */

// useAuthStore 훅 내보내기
export const useAuthStore = create<AuthStore>()(
  // 미들웨어 : devtools
  devtools(
    // 미들웨어 : persist
    persist(
      // 스토어 생성 함수
      createStore,
      // persist : 저장할 스토리지 레이블(localstorage에 저장될 이름)
      {
        name: 'app/signin',
      }
    )
  )
);
