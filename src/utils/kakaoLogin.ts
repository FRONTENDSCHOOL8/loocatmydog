import pb from '@/api/pocketbase';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate, redirect } from 'react-router-dom';

export const kakaoLogin = async () => {
  try {
    const user = await pb.collection('users').authWithOAuth2({
      provider: 'kakao',
    });

    return user;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
