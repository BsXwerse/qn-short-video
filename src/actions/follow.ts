import prisma from "@/lib/prisma";

export async function isFollowed(userId: string, uploaderId: string) {
  const count = await prisma.user.count({
    where: {
      id: userId,
      following: {
        some: {
          id: uploaderId,
        },
      },
    },
  });
  return count > 0;
}

export async function addOrCancel(userId: string, uploaderId: string) {
  if (await isFollowed(userId, uploaderId)) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        following: {
          disconnect: {
            id: uploaderId,
          },
        },
      },
    });
  } else {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        following: {
          connect: {
            id: uploaderId,
          },
        },
      },
    });
  }
  return await isFollowed(userId, uploaderId);
}

export async function getAll(id: string) {
  const res = await prisma.user.findMany({
    where: {
      followedBy: {
        some: {
          id: id,
        },
      },
    },
  });
  return res;
}
