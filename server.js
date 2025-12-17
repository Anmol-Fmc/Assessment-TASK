require("dotenv").config();
const express = require("express");
const assessmentRoutes = require ("./routes/assessmentRoutes");

const app = express();
app.use(express.json());

app.use("/assessments",assessmentRoutes);

app.get("/",(req,res)=>{
    res.json({status:"API is running"});
});

const PORT = process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log(`🚀 Server running on http://localhost:${PORT}`);

});