import pb from '@/api/pocketbase';

export async function loader({ params }: { params: any }) {
  return await pb.from('places').getOne(params.id, {
    select: {
      expand: {
        'boards(placeId)': true,
        userId: true,
        'reservation(placeId)': true,
      },
    },
  });
}
