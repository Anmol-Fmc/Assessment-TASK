require("dotenv").config();
const express = require("express");
const assessmentRoutes = require ("./routes/assessmentRoutes");
const {generateToken } = require("./utils/jwt");
const app = express();
app.use(express.json());

app.use("/assessments",assessmentRoutes);

app.get("/",(req,res)=>{
    res.json({status:"API is running"});
});
app.get("/debug/token",(req,res)=>{
    const token = generateToken({
        user_id:1,
        role:"admin",
    });
    res.json({token});
});
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const PORT = process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);

});