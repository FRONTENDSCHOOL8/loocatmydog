import pb from '@/api/pocketbase';

// interface paramsProps {
//   [key:string | number | symbol]: { id: any };
// }

export async function loader({ params }: { params: any }) {
  return await pb.from('places').getOne(params.id, {
    select: { expand: { 'boards(placeId)': true, userId: true } },
  });
}
