import FirebaseAdmin from '../firebase_admin';
import { InAuthUser } from '../in_auth_user';

const MEMBER_COL = 'members';
const SCREEN_NAME_COL = 'screen_names';

type tStatusNumber = 200 | 201 | 500;
type tAddResult =
  | { status: tStatusNumber; result: true; id: string }
  | { status: tStatusNumber; result: false; message: string };

const add = async ({ uid, email, displayName, photoURL }: InAuthUser): Promise<tAddResult> => {
  try {
    const screenName = (email as string).replace('@gmail.com', '');
    const addResult = await FirebaseAdmin.getInstance().Firestore.runTransaction(async (transaction) => {
      const memberRef = FirebaseAdmin.getInstance().Firestore.collection(MEMBER_COL).doc(uid);
      const screenNameRef = FirebaseAdmin.getInstance().Firestore.collection(SCREEN_NAME_COL).doc(screenName);

      const memberDoc = await transaction.get(memberRef);
      if (memberDoc.exists) {
        // 이미 추가 되어있어서 이후 동작이 필요 없음
        return false;
      }

      const addData = {
        uid,
        email,
        displayName: displayName ?? '',
        photoURL: photoURL ?? '',
      };

      transaction.set(memberRef, addData);
      transaction.set(screenNameRef, addData);

      return true;
    });

    if (!addResult) {
      return { status: 201, result: true, id: uid };
    }
    return { status: 200, result: true, id: uid };
  } catch (err) {
    console.error(err);
    return { status: 500, result: false, message: '서버 에러!!' };
  }
};

const findByScreenName = async (screenName: string): Promise<InAuthUser | null> => {
  const memberRef = FirebaseAdmin.getInstance().Firestore.collection(SCREEN_NAME_COL).doc(screenName);
  const memberDoc = await memberRef.get();
  if (!memberDoc.exists) {
    return null;
  }

  const data = memberDoc.data() as InAuthUser;

  return data;
};

const MemberModal = {
  add,
  findByScreenName,
};

export default MemberModal;
