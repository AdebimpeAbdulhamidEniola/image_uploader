import prisma from "../lib/prisma.js";

export const createImageService = async (
  url: string,
  filename: string,
  fileType: string,
  publicId: string
) => {
  const result = await prisma.image.create({
    data: {
      imageURL: url,
      filename: filename,
      publicId: publicId,
      type: fileType,
    },
  });
  return result;
};

export const getImageByPublicIdService = async (decoded: string) => {
  const result = await prisma.image.findUnique({
    where: { publicId: decoded },
  });
  return result;
};
