import { NextApiRequest, NextApiResponse } from 'next';
import MemberModal from '@/models/member/member.model';
import BadReqError from './error/bad_request_error';

const add = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, email, displayName, photoURL } = req.body;
  if (!uid) {
    throw new BadReqError('uid가 누락되었습니다.');
  }
  if (!email) {
    throw new BadReqError('email이 누락되었습니다.');
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
};

const findByScreenName = async (req: NextApiRequest, res: NextApiResponse) => {
  const { screenName } = req.query;
  if (screenName === undefined || screenName === null) {
    throw new BadReqError('screenName이 누락되었습니다.');
  }

  const extractScreenName = Array.isArray(screenName) ? screenName[0] : screenName;
  const findResult = await MemberModal.findByScreenName(extractScreenName);

  if (findResult === null) {
    return res.status(404).end();
  }

  res.status(200).json(findResult);
};

const MemberCtrl = {
  add,
  findByScreenName,
};

export default MemberCtrl;
