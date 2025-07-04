import express from "express";
import { SendMail } from "../controllers/sendMail.controller.js";

const MailRouter = express.Router();

MailRouter.post("/contact-us", SendMail);

export default MailRouter;
