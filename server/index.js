import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
// 🔑 ADD YOUR GEMINI API KEY
const genAI = new GoogleGenerativeAI("AIzaSyAXkTzfPy70f4ECsqosRHVsl4TOofTuryA");

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});


// =====================================================
// 🔥 YOUR APP DATA (CLEAN + STRUCTURED VERSION)
// =====================================================
const APP_CONTEXT = `
SSLEOS (Smart Surveillance and Law Enforcement Optimization System) is an AI-based smart policing system.

PROBLEM:
Traditional policing relies on manual record keeping, delayed reporting, and lack of real-time data, leading to inefficiency and errors.

SOLUTION:
SSLEOS provides a digital, AI-powered platform to improve law enforcement efficiency, decision-making, and crime prevention.

KEY FEATURES:

1. FIR / Complaint Filing:
- Users can file complaints online by providing basic details
- Eliminates manual paperwork

2. Missing Person Reporting:
- Users can submit missing person details through a dedicated section

3. Complaint Status Tracking:
- Users can check status in dashboard:
  - Pending
  - Under Process
  - Solved

4. Crime Prediction:
- Users can predict crime by entering state and year
- Uses machine learning models to identify crime-prone areas

5. Suspect Identification:
- AI models analyze images to detect suspects

6. SOS Emergency:
- Users can send emergency alerts via SOS page

7. Anonymous Feedback:
- Users can submit feedback anonymously through feedback page

8. Dashboard:
- Users and police can monitor:
  - Complaints
  - Case status
  - Reports

9. Multilingual Chatbot:
- Supports Hindi and English communication

BENEFITS:
- Reduces manual work
- Improves accuracy
- Enables real-time decision making
- Enhances public safety
`;
// =====================================================
// 🧠 SYSTEM RULES
// =====================================================

const SYSTEM_PROMPT = `
You are an AI assistant for SSLEOS application.

Language Rules:
- If user writes in Hindi → reply in Hindi
- If user writes in English → reply in English
- If user writes in Hinglish → reply in Hinglish

Scope Rules:
- ONLY answer questions related to SSLEOS system

If question is outside scope:
"I can only answer questions related to this application."

Response Style:
- Simple
- Clear
- Step-by-step when needed
- Helpful and user-friendly
`;


// =====================================================
// 🚀 API ROUTE
// =====================================================
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // 🔥 FINAL PROMPT (MOST IMPORTANT PART)
    const fullPrompt = `
${SYSTEM_PROMPT}

APPLICATION DETAILS:
${APP_CONTEXT}

User Question:
${userMessage}
`;

    const result = await model.generateContent(fullPrompt);

    const reply = result.response.text();

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.json({
      reply: "❌ Server error. Please try again.",
    });
  }
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
