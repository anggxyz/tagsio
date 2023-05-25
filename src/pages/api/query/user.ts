import { pick } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/src/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("[api/query/user] user");
  const { userId }: { userId: string } = pick(req.body, ["userId"]);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });
  res.status(200).json({
    data: user,
  });
}
