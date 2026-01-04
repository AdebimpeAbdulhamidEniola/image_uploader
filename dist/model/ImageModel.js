import prisma from "../lib/prisma.js";
export const createImageService = async (url, filename, fileType, publicId) => {
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
export const getImageByPublicIdService = async (decoded) => {
    const result = await prisma.image.findUnique({
        where: { publicId: decoded },
    });
    return result;
};
//# sourceMappingURL=ImageModel.js.map