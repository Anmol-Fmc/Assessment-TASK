const AssessmentModel = require("../models/assessmentModel");
const { updateById, deleteById } = require("../models/assessmentModel");

const AssessmentController = {
    async create(req, res){
       try{
        const{title,description,duration_minutes,
            created_by_user_id} = req.body;
            if(!title || !created_by_user_id){
                return res.status(400).json({
                    error:"title and created_by_user_id are required",
                });
            }
            console.log("CREATE BODY:",req.body);
            const assessment = await AssessmentModel.create({
                title,
                description,
                duration_minutes,
                created_by_user_id,
            });
            res.status(201).json(assessment); 
       } catch(error){
        console.error(error);
        res.status(500).json({error:"internal server error"});
       }
    },
    async getById(req,res){
        try{
            const id = Number(req.params.id);
            if(!Number.isInteger(id)){
                return res.status(400).json({error:"Invalid assessment id"});
            }
            
            const assessment = await AssessmentModel.getById(id);
            if(!assessment){
                return res.status(404).json({error:"Assessment not found"});
            }
            res.json(assessment);        
        }catch(error){
            console.error(error);
            res.status(500).json({error:"Internal server error"});
        }
    },
    async updateById(req,res){
        try{
            const id = Number(req.params.id);
            if(!Number.isInteger(id)){
                return res.status(400).json({error:"Assessment not found"});
            }
            const updated = await AssessmentModel.updateById(id,req.body);
            if(!updated){
                return res.status(404).json({error:"Assessment not found"});
            }
            res.json(updated);
        }catch(error){
            console.error(error);
            res.status(500).json({error:"Internal server error"});
        }
    },
//Delete operations 
    async deleteById(req,res){
        try{
            const id = Number(req.params.id);
            if(!Number.isInteger(id)){
                return res.status(400).json({error:"Invalid assessment id"});
            }
            const deleted = await AssessmentModel.deleteById(id);
            if(!deleted){
                return res.status(404).json({eroor:"Assessment not found"});
            }
            res.json({
                message :"Assessment deleted successfully",
                assessment_id : deleted.assessment_id,
            });
        }catch(error){
            console.error(error);
            res.status(500).json({error:"Internal server error"});
        }
    },

};
module .exports = AssessmentController;