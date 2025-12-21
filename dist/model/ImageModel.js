import prisma from "../prisma.js";
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
//# sourceMappingURL=ImageModel.js.map