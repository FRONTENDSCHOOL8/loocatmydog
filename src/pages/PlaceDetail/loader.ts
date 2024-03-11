import pb from '@/api/pocketbase';

export async function loader({ params }) {
  return await pb
    .from('places')
    .getOne(params.id, { select: { expand: { userId: true } } });
}
