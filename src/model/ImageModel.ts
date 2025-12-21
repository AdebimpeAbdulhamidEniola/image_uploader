import prisma from "../prisma.js";

export const createImageService = async (
  url: string,
  filename: string,
  fileType: string
) => {
  const result = await prisma.image.create({
    data: {
      imageURL: url,
      filename: filename,
      type: fileType,
    },
  });
  return result;
};
