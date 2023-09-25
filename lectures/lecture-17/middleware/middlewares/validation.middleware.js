import { validate } from "uuid";

class ValidationMiddleware {
    validateIds = (req, res, next) => {
        const { bookId } = req.params;

        if (validate(bookId)) {
            next();
            return;
        }

        res.status(400).json({ message: "Not a valid book ID" });
    };
}

export const validationMiddleware = new ValidationMiddleware();
