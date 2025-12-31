//Centralize error handler
const errorHandling = (err, req, res, next) => {
    console.log(`Error is`, err.stack);
    res.status(500).json({
        status: 500,
        message: "Oops! Something went wrong",
        error: err.message,
    });
};
export default errorHandling;
//# sourceMappingURL=errorHandler.js.map