import { Schema } from "@/@types/test"
import { TypedPocketBase } from "typed-pocketbase"

const db = new TypedPocketBase<Schema>(import.meta.env.VITE_PB_API_URL);

export default db;