import prisma from "@/lib/prisma";

export async function isFavorited(userId: string, videoId: number) {
  const count = await prisma.user.count({
    where: {
      id: userId,
      favorites: {
        some: {
          id: videoId,
        },
      },
    },
  });
  return count > 0;
}

export async function addOrCancel(userId: string, videoId: number) {
  if (await isFavorited(userId, videoId)) {
    await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        favoritedBy: {
          disconnect: {
            id: userId,
          },
        },
        likes: {
          decrement: 1,
        },
      },
    });
  } else {
    await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        favoritedBy: {
          connect: {
            id: userId,
          },
        },
        likes: {
          increment: 1,
        },
      },
    });
  }
  return await isFavorited(userId, videoId);
}
