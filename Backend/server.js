const express=require("express");
const {ethers}=require("ethers");
const abi = require("./ABI.json")
const app=express();
const port = 4000;


app.use(express.json());


const provider= new ethers.JsonRpcProvider("https://goerli.infura.io/v3/5e353b0ef7194418a7ab3ba91f8a9c90");

const contractAddress="0x6139387D8b821Eeaabfb66d012B7D04e53529d15";

const contract=new ethers.Contract(contractAddress,abi, provider);

app.post("/getBalance",async(req,res)=>{
    const {address}=req.body;
    try{
        const balance=await contract.balanceOf(address);
        res.json({"balance": balance.toString() })
    }catch (error) {
        console.error('Error',error);
        res.status(500).json({error:'Internal Server Error'});
    }
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})