import { firestore } from 'firebase-admin';
import CustomServerError from '@/controllers/error/custom_server_error';
import FirebaseAdmin from '../firebase_admin';

export type tMessageModel = {
  uid: string;
  message: string;
  author?: {
    displayName: string;
    photoURL?: string;
  };
};

const MEMBER_COL = 'members';
const MSG_COL = 'messages';
const SCR_NAME_COL = 'screen_names';

const FIRESOTRE = FirebaseAdmin.getInstance().Firestore;

async function post({ uid, message, author }: tMessageModel) {
  const memberRef = FIRESOTRE.collection(MEMBER_COL).doc(uid);
  await FIRESOTRE.runTransaction(async (transaction) => {
    const memberDoc = await transaction.get(memberRef);
    if (!memberDoc.exists) {
      throw new CustomServerError({
        statusCode: 400,
        message: '존재하지 않는 사용자입니다.',
      });
    }
    const newMessageRef = memberRef.collection(MSG_COL).doc();
    const newMessageBody = {
      message,
      createAt: firestore.FieldValue.serverTimestamp(),
      ...(author ? { author } : {}),
    };
    transaction.set(newMessageRef, newMessageBody);
  });
}

const MessageModel = {
  post,
};

export default MessageModel;
