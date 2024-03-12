import pb from '@/api/pocketbase';

export const googleLogin = async () => {
  try {
    const user = await pb.collection('users').authWithOAuth2({
      provider: 'google',
    });

    return user;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
