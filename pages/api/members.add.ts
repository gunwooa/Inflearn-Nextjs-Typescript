import { NextApiRequest, NextApiResponse } from 'next';
import MemberModal from '@/models/member/member.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid, email, displayName, photoURL } = req.body;
  if (!uid) {
    return res.status(400).json({ result: false, message: 'uid가 누락되었습니다.' });
  }
  if (!email) {
    return res.status(400).json({ result: false, message: 'email이 누락되었습니다.' });
  }

  const addRes = await MemberModal.add({ uid, email, displayName, photoURL });
  if (!addRes.result) {
    return res.status(addRes.status).json({
      result: addRes.result,
      message: addRes.message,
    });
  }

  return res.status(addRes.status).json({
    result: addRes.result,
    id: addRes.id,
  });
}
