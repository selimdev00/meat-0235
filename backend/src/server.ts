import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import validator from "validator";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(morgan("dev"));

app.use(cors());

type DataItem = {
  email: string;
  number: string;
};

const dataArray: DataItem[] = [
  { email: "jim@gmail.com", number: "221122" },
  { email: "jam@gmail.com", number: "830347" },
  { email: "john@gmail.com", number: "221122" },
  { email: "jams@gmail.com", number: "349425" },
  { email: "jams@gmail.com", number: "141424" },
  { email: "jill@gmail.com", number: "822287" },
  { email: "jill@gmail.com", number: "822286" },
];

app.post("/search", (req: Request, res: Response) => {
  let { email, number }: DataItem = req.body;

  if (!email) {
    return res.status(400).json({
      status: "error",
      message: "Email is required",
    });
  }

  if (!validator.isEmail(email)) {
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
    } else {
      return res.status(404).json({
        status: "error",
        message: "No matching records found",
      });
    }
  }, 5000);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: "error",
    message: "Not found",
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "An internal server error occurred",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
