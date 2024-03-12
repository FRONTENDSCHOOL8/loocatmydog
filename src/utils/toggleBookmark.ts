import pb from '@/api/pocketbase';

const toggleBookmark = async (
  myId: string,
  placeId: string,
  checked: boolean
) => {
  try {
    const tag = checked ? 'heart+' : 'heart-';
    if (!myId) throw new Error('유저 정보가 없습니다.');
    await pb.from('users').update(myId, {
      [tag]: placeId,
    });
  } catch (error) {
    console.error('error:', error);
    alert('실패하였습니다.');
  }
};

export default toggleBookmark;
