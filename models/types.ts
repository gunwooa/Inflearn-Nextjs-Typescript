export interface InAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface InMessage {
  id: string;
  message: string;
  reply?: string;
  createAt: string;
  replayAt?: string;
  author?: {
    displayName: string;
    photoURL?: string;
  };
}
