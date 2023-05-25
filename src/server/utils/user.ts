import { prisma } from "../db";

export const createUserFromAddress = async (address: string) => {
  const alreadyExists = await prisma.user.findUnique({
    where: {
      address,
    },
  });
  if (alreadyExists) {
    console.log(
      `[createUserFromAddress] User found. Logging in ${JSON.stringify(
        alreadyExists
      )}`
    );
    return;
  }
  const user = await prisma.user.create({
    data: {
      address,
    },
  });
  console.log(
    `[createUserFromAddress] created account ${JSON.stringify(user)}`
  );
  return;
};

export const addTwitterDetailsToExistingUser = async ({
  address,
  twitterHandle,
  userId,
  image,
  name,
}: {
  address: string;
  twitterHandle: string;
  userId: string;
  image: string;
  name: string;
}) => {
  await prisma.user.findUniqueOrThrow({
    where: { address },
  });
  const user = await prisma.user.update({
    where: {
      address,
    },
    data: {
      twitterHandle,
      twitterId: userId,
      twitterImage: image,
      twitterName: name,
    },
  });
  console.log(`
    Updated user details for: ${user.address}. Details: ${JSON.stringify(user)}
  `);
  return null;
};

export const userDatabaseId = async (address: string): Promise<string> => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { address },
    select: { id: true },
  });
  return user.id;
};
