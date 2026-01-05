export const validateImage = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            status: "fail",
            message: "No file uploaded.",
        });
    }
    if (req.file.fieldname !== "image") {
        return res.status(400).json({
            status: "fail",
            message: "Invalid form data key. Only 'image' is allowed.",
        });
    }
    next();
};
//# sourceMappingURL=validation.js.map