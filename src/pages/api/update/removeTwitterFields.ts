// remove twitter connection for user

import { pick } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/src/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId }: { userId: string } = pick(req.body, ["userId"]);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      twitterHandle: null,
      twitterId: null,
      twitterImage: null,
      twitterName: null,
      // @note assuming signature is done on twitter data
      signature: null,
      hasCompletedVerification: false,
    },
  });
  res.status(200).json({
    data: updatedUser,
  });
}
