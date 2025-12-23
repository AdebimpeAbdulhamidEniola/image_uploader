import prisma from "../lib/prisma.js";

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

export const getImageByFilenameService = async (fileName: string) => {
  const result = await prisma.image.findUnique({where: {filename: fileName}})
  return result
};
