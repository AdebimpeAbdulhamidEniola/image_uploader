export const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};
//# sourceMappingURL=handleResponse.js.map