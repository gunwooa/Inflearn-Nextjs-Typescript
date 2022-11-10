import { firestore } from 'firebase-admin';

export interface InAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface MessageBase {
  id: string;
  message: string;
  reply?: string;
  author?: {
    displayName: string;
    photoURL?: string;
  };
}

export interface InMessage extends MessageBase {
  createAt: string;
  replayAt?: string;
}
export interface InMessageServer extends MessageBase {
  createAt: firestore.Timestamp;
  replayAt?: firestore.Timestamp;
}
