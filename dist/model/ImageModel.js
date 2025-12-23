import prisma from "../lib/prisma.js";
export const createImageService = async (url, filename, fileType) => {
    const result = await prisma.image.create({
        data: {
            imageURL: url,
            filename: filename,
            type: fileType,
        },
    });
    return result;
};
export const getImageByFilenameService = async (fileName) => {
    const result = await prisma.image.findUnique({ where: { filename: fileName } });
    return result;
};
//# sourceMappingURL=ImageModel.js.map