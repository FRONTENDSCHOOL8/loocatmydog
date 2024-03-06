import { Schema } from '@/@types/database';
import { TypedPocketBase } from 'typed-pocketbase';

const pb = new TypedPocketBase<Schema>(import.meta.env.VITE_PB_API_URL);

export default pb;
