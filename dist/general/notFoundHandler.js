import { sendErrorResponse } from "../utils/errorHandler.js";
export const notFoundHandler = (req, res) => {
    sendErrorResponse(res, 404, `Route ${req.originalUrl} not found`);
};
//# sourceMappingURL=notFoundHandler.js.map