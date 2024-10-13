const express = require('express');
const router = express.Router();
const Person = require("./../models/Person");

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data fetched successfully");
        res.status(200).json(data);
    }
    catch(error){
        console.log("Error fetching data", error);
        res.status(500).json({"Error":"Internal Server Error"});
    }
});

router.get('/:workType', async (req,res)=> {
    try {
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            console.log("Fetched worktype data successfully");
            res.status(200).json(response);
        } else{
            res.status(404).json("Invalid work type");
        }
    }
    catch(error){
        console.log("Error getting work type data", error);
        res.status(500).json({"error":"Internal Server Error"});
    }
});

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("data saved successfully");
        res.status(200).json(response);
    }
    catch(error){
        console.log("Error creating person", error);
        res.status(500).json({"error":"Internal Server Error"});
    }
});

router.put("/:id", async (req,res) => {
    try {
        const personId = req.params.id;
        const data = req.body;
        const updatedPerson = await Person.findByIdAndUpdate(personId,data);

        if(!updatedPerson){
            return res.status(404).json({error:"Person not found"});
        }
        console.log("data updated successfully");
        res.status(200).json(updatedPerson);
    }
    catch(error){
        console.log("There is an error during update", error);
        res.status(500).json({"error":"Internal Server Error"});
    }
})

router.delete("/:id", async (req,res) => {
    try {
        const personIdForDelete = req.params.id;
        const deletedPerson = await Person.findOneAndDelete(personIdForDelete);

        console.log("Person deleted successfully");
        res.status(200).json(deletedPerson);
        
    }
    catch(error){
        console.log("Delete error",error);
        res.status(500).json("Internal server error");
    }
});

module.exports = router;