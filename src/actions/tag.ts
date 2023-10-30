import prisma from "@/lib/prisma";

export async function getAllTags() {
    const tags = await prisma.tag.findMany()
    return tags
}