"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const validator_1 = __importDefault(require("validator"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
const dataArray = [
    { email: "jim@gmail.com", number: "221122" },
    { email: "jam@gmail.com", number: "830347" },
    { email: "john@gmail.com", number: "221122" },
    { email: "jams@gmail.com", number: "349425" },
    { email: "jams@gmail.com", number: "141424" },
    { email: "jill@gmail.com", number: "822287" },
    { email: "jill@gmail.com", number: "822286" },
];
app.post("/search", (req, res) => {
    let { email, number } = req.body;
    if (!email) {
        return res.status(400).json({
            status: "error",
            message: "Email is required",
        });
    }
    if (!validator_1.default.isEmail(email)) {
        return res.status(400).json({
            status: "error",
            message: "Invalid email format",
        });
    }
    if (number) {
        number = number.replace(/[^0-9]/g, "");
        number = number.trim();
    }
    setTimeout(() => {
        const results = dataArray.filter((item) => {
            const emailMatch = email ? item.email.includes(email) : true;
            const numberMatch = number ? item.number.includes(number) : true;
            return emailMatch && numberMatch;
        });
        if (results.length > 0) {
            return res.status(200).json({
                status: "success",
                message: "Matching records found",
                data: results,
            });
        }
        else {
            return res.status(404).json({
                status: "error",
                message: "No matching records found",
            });
        }
    }, 5000);
});
app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Not found",
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: "An internal server error occurred",
    });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
