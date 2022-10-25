import { useCallback, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { InAuthUser } from '@/models/in_auth_user';
import FirebaseClient from '@/models/firebase_client';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/store/localStorage';

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<InAuthUser | null>(null);

  const signInWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();

    try {
      const signInResult = await signInWithPopup(FirebaseClient.getInstance().Auth, provider);
      if (signInResult.user) {
        console.info(signInResult.user);
        const resp = await fetch('/api/members.add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: signInResult.user.uid,
            email: signInResult.user.email,
            displayName: signInResult.user.displayName,
            photoURL: signInResult.user.photoURL,
          }),
        });

        console.info({ status: resp.status });
        const respData = await resp.json();
        console.info(respData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const clear = () => {
    removeLocalStorage('auth');
    setAuthUser(null);
  };

  const signOut = () => FirebaseClient.getInstance().Auth.signOut().then(clear);

  const onSetAuthUser = useCallback((auth: User | null) => {
    if (auth?.uid && auth?.email && auth?.photoURL && auth?.displayName) {
      setAuthUser({
        uid: auth?.uid,
        email: auth?.email,
        photoURL: auth?.photoURL,
        displayName: auth?.displayName,
      });
    }
  }, []);

  const authStateChanged = useCallback(
    async (auth: User | null) => {
      if (auth === null) {
        setAuthUser(null);
        return;
      }

      setLocalStorage('auth', auth);

      onSetAuthUser(auth);
    },
    [onSetAuthUser],
  );

  useEffect(() => {
    const auth = getLocalStorage('auth');
    onSetAuthUser(auth);

    const unsubscribe = FirebaseClient.getInstance().Auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, [authStateChanged, onSetAuthUser]);

  return {
    authUser,
    signInWithGoogle,
    signOut,
  };
}
