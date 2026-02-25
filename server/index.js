import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import reportsRoutes from "./routes/reports.js";
import userRouter from "./routes/userRouter.js";

import User from "./models/User.js";



/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



// Log the MongoDB URI to check if it's loaded correctly
console.log("MongoDB URI:", 'mongodb+srv://khushisingh7628_db_user:THLTTstGM1H8iif4@crime.xmo78xg.mongodb.net/?retryWrites=true&w=majority&appName=crime');

mongoose.set("strictQuery", false); // Add this line to suppress the warning

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/reports", reportsRoutes);
app.use("/user", userRouter);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
  
/* CHATBOT ROUTE */
app.post("/api/chat", (req, res) => {
  const message = req.body.message?.toLowerCase() || "";

  let reply = "";

  // Hindi detection
  const isHindi =
    message.includes("कैसे") ||
    message.includes("शिकायत") ||
    message.includes("मदद") ||
    message.includes("आपातकाल") ||
    message.includes("sos");

  if (!isHindi) {
    // English Responses
    if (message.includes("complaint") || message.includes("report")) {
      reply =
        "To file a complaint, go to the 'Report Crime' section. Fill in the details. Your identity can remain anonymous.";
    } else if (message.includes("sos") || message.includes("emergency")) {
      reply =
        "If you are in immediate danger, press the SOS button or call local emergency services immediately.";
    } else if (message.includes("how to use")) {
      reply =
        "You can use this app by chatting with me, filing complaints anonymously, using SOS in emergencies, and uploading suspect images if safe.";
    } else if (message.includes("upload")) {
      reply =
        "You can upload suspect or criminal images in the Upload section. Please ensure your safety first.";
    } else {
      reply =
        "I can help you file complaints, explain how to use the app, or guide you during emergencies.";
    }
  } else {
    // Hindi Responses
    if (message.includes("शिकायत")) {
      reply =
        "शिकायत दर्ज करने के लिए 'Report Crime' सेक्शन में जाएं। आपकी पहचान गुप्त रखी जाएगी।";
    } else if (message.includes("आपातकाल") || message.includes("sos")) {
      reply =
        "अगर आप तुरंत खतरे में हैं, तो SOS बटन दबाएं या स्थानीय आपातकालीन नंबर पर कॉल करें।";
    } else if (message.includes("कैसे")) {
      reply =
        "आप इस ऐप का उपयोग चैट करके, गुप्त शिकायत दर्ज करके और आपातकाल में SOS का उपयोग करके कर सकते हैं।";
    } else {
      reply =
        "मैं आपकी शिकायत दर्ज करने और ऐप का उपयोग समझाने में मदद कर सकता हूँ। कृपया अपना प्रश्न लिखें।";
    }
  }

  res.json({ reply });
});

mongoose
  .connect(
    "mongodb+srv://khushisingh7628_db_user:THLTTstGM1H8iif4@crime.xmo78xg.mongodb.net/?retryWrites=true&w=majority&appName=crime",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`server port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
