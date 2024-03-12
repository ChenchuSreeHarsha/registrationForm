const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.vdgqmje.mongodb.net/registrationFormDB`,{
  useNewUrlParser : true,
  useUnifiedTopology : true
})

const registrationSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const Registration = mongoose.model('Registration', registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.sendFile(__dirname + "/pages/index.html")
})

app.post('/register',async(req,res)=>{
  try {
    const {name,email,password} = req.body;
    const existingUser = await Registration.findOne({email:email})

    if(!existingUser){
      const registrationData = new Registration({
        name,
        email,
        password
      })
      await registrationData.save()
      res.redirect('/success');
    }
    else{
      alert("UserName Already exists")
      res.redirect('/error')
    }
  } 
  catch(error) {
    console.log(error);
    res.redirect('/error')
  }
})

app.get('/success',(req,res)=>{
  res.sendFile(__dirname + "/pages/success.html")
})
app.get('/error',(req,res)=>{
  res.sendFile(__dirname + "/pages/error.html")
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/bharathintern', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// const db = mongoose.connection;

// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// db.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// Body parser middleware

// Define MongoDB schema

// // Serve HTML file for registration form
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// Handle registration form submission
// app.post('/register', (req, res) => {
//   const { username, email, password } = req.body;

//   // Validate input
//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   // Create new user object
//   const newUser = new User({
//     username,
//     email,
//     password
//   });

//   // Save user to MongoDB
//   newUser.save((err) => {
//     if (err) {
//       console.error('Error saving user:', err);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//     res.status(200).json({ message: 'User registered successfully' });
//   });
// });

// Start server
