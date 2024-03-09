import pb from '@/api/pocketbase';

const addBookmark = async (myId: string, placeId: string) => {
  try {
    if (!myId) throw new Error('유저 정보가 없습니다.');
    await pb.from('users').update(myId, {
      'heart+': placeId,
    });
  } catch (error) {
    console.error('error:', error);
    alert('실패하였습니다.');
  }
};

export default addBookmark;
