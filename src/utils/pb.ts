import PocketBase from 'pocketbase';

const API = import.meta.env.VITE_PB_API_URL;
const pb = new PocketBase(API);

export default pb;
