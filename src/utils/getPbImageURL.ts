


export default function getPbImageURL(collectionId:string, id:string, fileName:string = `photo`):string{
  return `${
    import.meta.env.VITE_PB_API_URL
  }api/files/${collectionId}/${id}/${fileName}`;
}