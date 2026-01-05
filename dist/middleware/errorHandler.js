import { handleAllErrors } from "../utils/errorHandler.js";
const errorHandling = (err, req, res, next) => {
    // If response already sent, delegate to Express default handler
    if (res.headersSent) {
        return next(err);
    }
    // Handle all types of errors using the utility function
    handleAllErrors(err, res);
};
export default errorHandling;
//# sourceMappingURL=errorHandler.js.map