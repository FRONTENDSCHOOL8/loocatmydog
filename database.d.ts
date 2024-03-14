/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
export interface BaseCollectionResponse {
  /**
   * 15 characters string to store as record ID.
   */
  id: string;
  /**
   * Date string representation for the creation date.
   */
  created: string;
  /**
   * Date string representation for the creation date.
   */
  updated: string;
  /**
   * The collection id.
   */
  collectionId: string;
  /**
   * The collection name.
   */
  collectionName: string;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface BaseCollectionCreate {
  /**
   * 15 characters string to store as record ID.
   * If not set, it will be auto generated.
   */
  id?: string;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface BaseCollectionUpdate {}

// https://pocketbase.io/docs/collections/#auth-collection
export interface AuthCollectionResponse extends BaseCollectionResponse {
  /**
   * The username of the auth record.
   */
  username: string;
  /**
   * Auth record email address.
   */
  email: string;
  /**
   * Whether to show/hide the auth record email when fetching the record data.
   */
  emailVisibility: boolean;
  /**
   * Indicates whether the auth record is verified or not.
   */
  verified: boolean;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface AuthCollectionCreate extends BaseCollectionCreate {
  /**
   * The username of the auth record.
   * If not set, it will be auto generated.
   */
  username?: string;
  /**
   * Auth record email address.
   */
  email?: string;
  /**
   * Whether to show/hide the auth record email when fetching the record data.
   */
  emailVisibility?: boolean;
  /**
   * Auth record password.
   */
  password: string;
  /**
   * Auth record password confirmation.
   */
  passwordConfirm: string;
  /**
   * Indicates whether the auth record is verified or not.
   * This field can be set only by admins or auth records with "Manage" access.
   */
  verified?: boolean;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface AuthCollectionUpdate {
  /**
   * The username of the auth record.
   */
  username?: string;
  /**
   * The auth record email address.
   * This field can be updated only by admins or auth records with "Manage" access.
   * Regular accounts can update their email by calling "Request email change".
   */
  email?: string;
  /**
   * Whether to show/hide the auth record email when fetching the record data.
   */
  emailVisibility?: boolean;
  /**
   * Old auth record password.
   * This field is required only when changing the record password. Admins and auth records with "Manage" access can skip this field.
   */
  oldPassword?: string;
  /**
   * New auth record password.
   */
  password?: string;
  /**
   * New auth record password confirmation.
   */
  passwordConfirm?: string;
  /**
   * Indicates whether the auth record is verified or not.
   * This field can be set only by admins or auth records with "Manage" access.
   */
  verified?: boolean;
}

// https://pocketbase.io/docs/collections/#view-collection
export interface ViewCollectionRecord {
  id: string;
}

// utilities

type MaybeArray<T> = T | T[];

// ===== users =====

export interface UsersResponse extends AuthCollectionResponse {
  collectionName: 'users';
  name: string;
  birthday: number;
  genderNo: number;
  address: string;
  addressDetail: string;
  phone: string;
  avatar: string;
  petId: Array<string>;
  addressInfo: any;
  heart: Array<string>;
  isEdited: boolean;
}

export interface UsersCreate extends AuthCollectionCreate {
  name?: string;
  birthday?: number;
  genderNo?: number;
  address?: string;
  addressDetail?: string;
  phone?: string;
  avatar?: File | null;
  petId?: MaybeArray<string>;
  addressInfo?: any;
  heart?: MaybeArray<string>;
  isEdited?: boolean;
}

export interface UsersUpdate extends AuthCollectionUpdate {
  name?: string;
  birthday?: number;
  'birthday+'?: number;
  'birthday-'?: number;
  genderNo?: number;
  'genderNo+'?: number;
  'genderNo-'?: number;
  address?: string;
  addressDetail?: string;
  phone?: string;
  avatar?: File | null;
  petId?: MaybeArray<string>;
  'petId+'?: MaybeArray<string>;
  'petId-'?: MaybeArray<string>;
  addressInfo?: any;
  heart?: MaybeArray<string>;
  'heart+'?: MaybeArray<string>;
  'heart-'?: MaybeArray<string>;
  isEdited?: boolean;
}

export interface UsersCollection {
  type: 'auth';
  collectionId: string;
  collectionName: 'users';
  response: UsersResponse;
  create: UsersCreate;
  update: UsersUpdate;
  relations: {
    petId: PetCollection[];
    heart: PlacesCollection[];
    'boards(userId)': BoardsCollection[];
    'places(userId)': PlacesCollection[];
    'chatRooms(members)': ChatRoomsCollection[];
    'reservation(userId)': ReservationCollection[];
  };
}

// ===== pet =====

export interface PetResponse extends BaseCollectionResponse {
  collectionName: 'pet';
  petName: string;
  image: string;
  breed: string;
  gender: string;
  birthYear: number;
  birthMonth: number;
  isNeutered: boolean;
  hospital: string;
  note: string;
  weight: number;
}

export interface PetCreate extends BaseCollectionCreate {
  petName?: string;
  image?: File | null;
  breed?: string;
  gender?: string;
  birthYear?: number;
  birthMonth?: number;
  isNeutered?: boolean;
  hospital?: string;
  note?: string;
  weight?: number;
}

export interface PetUpdate extends BaseCollectionUpdate {
  petName?: string;
  image?: File | null;
  breed?: string;
  gender?: string;
  birthYear?: number;
  'birthYear+'?: number;
  'birthYear-'?: number;
  birthMonth?: number;
  'birthMonth+'?: number;
  'birthMonth-'?: number;
  isNeutered?: boolean;
  hospital?: string;
  note?: string;
  weight?: number;
  'weight+'?: number;
  'weight-'?: number;
}

export interface PetCollection {
  type: 'base';
  collectionId: string;
  collectionName: 'pet';
  response: PetResponse;
  create: PetCreate;
  update: PetUpdate;
  relations: {
    'users(petId)': UsersCollection[];
    'reservation(petId)': ReservationCollection[];
  };
}

// ===== boards =====

export interface BoardsResponse extends BaseCollectionResponse {
  collectionName: 'boards';
  userId: string;
  type: 'stories' | 'review';
  textContent: string;
  photo: Array<string>;
  rate: number;
  placeId: string;
}

export interface BoardsCreate extends BaseCollectionCreate {
  userId: string;
  type: 'stories' | 'review';
  textContent: string;
  photo?: MaybeArray<File>;
  rate?: number;
  placeId?: string;
}

export interface BoardsUpdate extends BaseCollectionUpdate {
  userId?: string;
  type?: 'stories' | 'review';
  textContent?: string;
  photo?: MaybeArray<File>;
  'photo-'?: string;
  rate?: number;
  'rate+'?: number;
  'rate-'?: number;
  placeId?: string;
}

export interface BoardsCollection {
  type: 'base';
  collectionId: string;
  collectionName: 'boards';
  response: BoardsResponse;
  create: BoardsCreate;
  update: BoardsUpdate;
  relations: {
    userId: UsersCollection;
    placeId: PlacesCollection;
  };
}

// ===== places =====

export interface PlacesResponse extends BaseCollectionResponse {
  collectionName: 'places';
  photo: Array<string>;
  title: string;
  tag: any;
  address: string;
  minDate: string;
  maxDate: string;
  price: any;
  service: Array<
    | 'daily'
    | 'young'
    | 'old'
    | 'medicine'
    | 'hair'
    | 'pickup'
    | 'emergency'
    | 'play'
    | 'long'
  >;
  introduce: string;
  userId: string;
}

export interface PlacesCreate extends BaseCollectionCreate {
  photo: MaybeArray<File>;
  title: string;
  tag?: any;
  address: string;
  minDate: string | Date;
  maxDate: string | Date;
  price: any;
  service?: MaybeArray<
    | 'daily'
    | 'young'
    | 'old'
    | 'medicine'
    | 'hair'
    | 'pickup'
    | 'emergency'
    | 'play'
    | 'long'
  >;
  introduce?: string;
  userId: string;
}

export interface PlacesUpdate extends BaseCollectionUpdate {
  photo?: MaybeArray<File>;
  'photo-'?: string;
  title?: string;
  tag?: any;
  address?: string;
  minDate?: string | Date;
  maxDate?: string | Date;
  price?: any;
  service?: MaybeArray<
    | 'daily'
    | 'young'
    | 'old'
    | 'medicine'
    | 'hair'
    | 'pickup'
    | 'emergency'
    | 'play'
    | 'long'
  >;
  'service+'?: MaybeArray<
    | 'daily'
    | 'young'
    | 'old'
    | 'medicine'
    | 'hair'
    | 'pickup'
    | 'emergency'
    | 'play'
    | 'long'
  >;
  'service-'?: MaybeArray<
    | 'daily'
    | 'young'
    | 'old'
    | 'medicine'
    | 'hair'
    | 'pickup'
    | 'emergency'
    | 'play'
    | 'long'
  >;
  introduce?: string;
  userId?: string;
}

export interface PlacesCollection {
  type: 'base';
  collectionId: string;
  collectionName: 'places';
  response: PlacesResponse;
  create: PlacesCreate;
  update: PlacesUpdate;
  relations: {
    'users(heart)': UsersCollection[];
    'boards(placeId)': BoardsCollection[];
    userId: UsersCollection;
    'chatRooms(placeId)': ChatRoomsCollection[];
    'reservation(placeId)': ReservationCollection[];
  };
}

// ===== chatRooms =====

export interface ChatRoomsResponse extends BaseCollectionResponse {
  collectionName: 'chatRooms';
  members: Array<string>;
  placeId: string;
  messageBox: any;
}

export interface ChatRoomsCreate extends BaseCollectionCreate {
  members?: MaybeArray<string>;
  placeId?: string;
  messageBox?: any;
}

export interface ChatRoomsUpdate extends BaseCollectionUpdate {
  members?: MaybeArray<string>;
  'members+'?: MaybeArray<string>;
  'members-'?: MaybeArray<string>;
  placeId?: string;
  messageBox?: any;
}

export interface ChatRoomsCollection {
  type: 'base';
  collectionId: string;
  collectionName: 'chatRooms';
  response: ChatRoomsResponse;
  create: ChatRoomsCreate;
  update: ChatRoomsUpdate;
  relations: {
    members: UsersCollection[];
    placeId: PlacesCollection;
  };
}

// ===== reservation =====

export interface ReservationResponse extends BaseCollectionResponse {
  collectionName: 'reservation';
  placeId: string;
  userId: string;
  petId: Array<string>;
  minDate: string;
  maxDate: string;
  reviewed: boolean;
  price: number;
  required: string;
  etc: string;
}

export interface ReservationCreate extends BaseCollectionCreate {
  placeId?: string;
  userId?: string;
  petId?: MaybeArray<string>;
  minDate?: string | Date;
  maxDate?: string | Date;
  reviewed?: boolean;
  price?: number;
  required?: string;
  etc?: string;
}

export interface ReservationUpdate extends BaseCollectionUpdate {
  placeId?: string;
  userId?: string;
  petId?: MaybeArray<string>;
  'petId+'?: MaybeArray<string>;
  'petId-'?: MaybeArray<string>;
  minDate?: string | Date;
  maxDate?: string | Date;
  reviewed?: boolean;
  price?: number;
  'price+'?: number;
  'price-'?: number;
  required?: string;
  etc?: string;
}

export interface ReservationCollection {
  type: 'base';
  collectionId: string;
  collectionName: 'reservation';
  response: ReservationResponse;
  create: ReservationCreate;
  update: ReservationUpdate;
  relations: {
    placeId: PlacesCollection;
    userId: UsersCollection;
    petId: PetCollection[];
  };
}

// ===== events =====

export interface EventsResponse extends BaseCollectionResponse {
  collectionName: 'events';
  carouselImages: Array<string>;
  popupImages: Array<string>;
}

export interface EventsCreate extends BaseCollectionCreate {
  carouselImages?: MaybeArray<File>;
  popupImages?: MaybeArray<File>;
}

export interface EventsUpdate extends BaseCollectionUpdate {
  carouselImages?: MaybeArray<File>;
  'carouselImages-'?: string;
  popupImages?: MaybeArray<File>;
  'popupImages-'?: string;
}

export interface EventsCollection {
  type: 'base';
  collectionId: string;
  collectionName: 'events';
  response: EventsResponse;
  create: EventsCreate;
  update: EventsUpdate;
  relations: Record<string, never>;
}

// ===== Schema =====

export type Schema = {
  users: UsersCollection;
  pet: PetCollection;
  boards: BoardsCollection;
  places: PlacesCollection;
  chatRooms: ChatRoomsCollection;
  reservation: ReservationCollection;
  events: EventsCollection;
};
