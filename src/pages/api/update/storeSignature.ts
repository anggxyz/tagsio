// remove twitter connection for user

import { pick } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/src/server/db";

export default async function storeSignature(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, signature }: { userId: string; signature: string } = pick(
    req.body,
    ["userId", "signature"]
  );

  if (!userId || !signature) {
    throw new Error(
      `userId or signature not found. userId: ${userId}, signature: ${signature}`
    );
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      signature,
      hasCompletedVerification: true,
    },
  });
  res.status(200).json({
    data: updatedUser,
  });
}
