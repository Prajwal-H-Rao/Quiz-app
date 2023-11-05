import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcryptjs from "bcryptjs";
import bodyParser from "body-parser";
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoDBUrl = "mongodb://127.0.0.1:27017/quizDB";
const port = 4000;

let temp, tempName;


function getAvg(list){
  let sum=0
  list.forEach((item)=>{
    sum+=item.marks
  })
  return sum/list.length;
}

const topicSchema = new mongoose.Schema({
  topic: String,
});

const topicModel = mongoose.model("topics", topicSchema);

const resultSchema = mongoose.Schema({
  topic: String,
  name: String,
  marks: Number,
});

const StudentModel = mongoose.model("studentList", resultSchema);

const quizSchema = mongoose.Schema({
  topic: String,
  questions: Array,
});

const quizModel = mongoose.model("quizModel", quizSchema);

  const adminSchema = new mongoose.Schema({
  name: String,
  pwd: String,
});

const adminModel = mongoose.model("adminmodel", adminSchema);

let result;

app.post("/auth", async (req, res) => {
  const { name, pwd } = JSON.parse(req.body.post);
  const profile = await adminModel.findOne({ name:name });
  result = bcryptjs.compareSync(pwd, profile.pwd);
  if (result) {
    console.log(true)
    res.json({ res: true });
  } else {
    console.log(false)
    res.json({ res: false });
  }
});

app.delete("/quizInfo/:params",async (req, res) => {
  const quizName = req.params.params;
  const delQuiz = await quizModel.findOneAndDelete({topic:quizName})
  const delModel = await topicModel.findOneAndDelete({topic:quizName})
  const delStudent = await StudentModel.deleteMany({topic:quizName})
  if(delModel && delQuiz && delStudent)res.json({res:"deleted successfully"})
});

app.post("/quizInfo",async(req,res)=>{
  const name = JSON.parse(req.body.pos).name
  let infoList = await StudentModel.find({topic:name})
  infoList.sort((a,b)=>b.marks-a.marks)
  const avg = getAvg(infoList);
  const n =infoList.length
  // console.log(infoList)
  if(n>0){
  const stats={min:infoList[n-1].marks,max:infoList[0].marks,avg:avg}
  res.json({stats:stats,list:infoList})
  }
  else{
    const stats={min:0,max:0,avg:0}
    res.json({stats:stats,list:[]})
  }
  
})

// app.get("/quizInfo",async (req, res) => {
  
// });

app.get("/admin", async(req, res) => {
  const allQuizes = await topicModel.find({});
  res.json({list:allQuizes})
});

app.post("/admin", async (req, res) => {
  const creds = JSON.parse(req.body.post);
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(creds.pwd, salt);
  const saveInfo = new adminModel({
    name: creds.name,
    pwd: hash,
  });
  const saved = await saveInfo.save();
  res.status(200);
});

app.post("/store", async (req, res) => {
  const { topic, name, score } = JSON.parse(req.body.pos);
  res.json({ ok: true });
  const saveResult = new StudentModel({
    topic: topic,
    name: name,
    marks: score,
  });
  saveResult.save();
});

app.get("/startPage", (req, res) => {
  res.json({ Qqns: temp, name: tempName });
});

app.post("/quizName", async (req, res) => {
  const Quiz = JSON.parse(req.body.pos).body;
  const quizDetails = await quizModel.findOne({topic:Quiz});
  temp = quizDetails;
  tempName = JSON.parse(req.body.pos).heading;
});

app.post("/upload", async (req, res) => {
  const quiz = JSON.parse(req.body.post)
  const newQuiz = new quizModel({
    topic:quiz.topic,
    questions:quiz.qns
  })
  const saveQuiz = new topicModel({
    topic: quiz.topic
  })
  const save1= await newQuiz.save();
  const save2 = await saveQuiz.save();
  if(save1 && save2)
  res.json({res:"ok"});
});

mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to the data-base");
    app.listen(port, () => {
      console.log("Connected to the port:" + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
