const uploadFile = (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
    }
    res.status(200).json({ message: "File uploaded successfully", filename: req.file.originalname });
};
export default uploadFile;
//# sourceMappingURL=uploadController.js.map