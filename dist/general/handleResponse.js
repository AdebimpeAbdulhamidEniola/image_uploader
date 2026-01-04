export const handleResponse = (res, statusCode, message, data) => {
    if (data) {
        res.status(statusCode).json({
            status: "success",
            message,
            data
        });
    }
    else {
        res.status(statusCode).json({
            status: "success",
            message
        });
    }
};
//# sourceMappingURL=handleResponse.js.map