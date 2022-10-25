import { User } from 'firebase/auth';

export type LocalStorageSchema = {
  auth: User | null;
};

type LocalStorageSchemaKey = keyof LocalStorageSchema;
type LocalStorageSchemaValue<T extends LocalStorageSchemaKey> = LocalStorageSchema[T];

export const setLocalStorage = <T extends LocalStorageSchemaKey>(key: T, value: LocalStorageSchemaValue<T>) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = <T extends LocalStorageSchemaKey>(key: T): LocalStorageSchemaValue<T> => {
  const jsonValue = localStorage.getItem(key);
  return jsonValue ? JSON.parse(jsonValue) : null;
};

export const removeLocalStorage = (key: LocalStorageSchemaKey) => {
  localStorage.removeItem(key);
};
