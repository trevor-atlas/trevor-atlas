import type { NextApiRequest, NextApiResponse } from 'next'
import {getRefreshToken} from '../../lib/spotify';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await getRefreshToken();
    return res.status(200);
  } catch (e) {
    return res.status(400);
  }
};
