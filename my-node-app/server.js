const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app');

if (!process.env.DATABASE) {
    throw new Error('DATABASE environment variable is not defined');
}

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// mongoose.connect(DB, {
mongoose.connect(process.env.DATABASE_LOCAL,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
}).then((con) => {
    con
    console.log('DB connection successful');
}).catch(err => {
    console.error('DB connection error:', err);
});
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'user must have name'],
        unique:false
    },
    age:{
        type:Number,
        required:[true,'user must have age']
    },
    email:{
        type:String,
        required:[true,'user must have email']
    }
})
const User=new mongoose.model('User',userschema)
const users=[
    {
      name:"abnet" ,
      age:23,
      email:"abnetdlkjsdlkj67@gmail.com" 
    },
    {
        name:"abatye",
        age:27,
        email:"abatye@gmail.com"
    }
]
// const tours=[ 
//     {
//     name: 'rasdashe1',
//     rating: 4.7,
//     price: 997
// },{
//     name: 'Grand Canyon Adventure',
//     rating: 4.8,
//     price: 299
// },{
//     name: 'Paris City Tour',
//     rating: 4.7,
//     price: 199
// },{
//     name: 'Tokyo Cultural Experience',
//     rating: 4.9,
//     price: 349
// },{
//     name: 'Safari in Kenya',
//     rating: 4.6,
//     price: 499
// },{
//     name: 'Great Barrier Reef Snorkeling',
//     rating: 4.5,
//     price: 249
// },{
//     name: 'New York City Sightseeing',
//     rating: 4.4,
//     price: 159
// },{
//     name: 'Rome Historical Tour',
//     rating: 4.7,
//     price: 299
// },{
//     name: 'Iceland Northern Lights',
//     rating: 4.9,
//     price: 399
// },{
//     name: 'Machu Picchu Trek',
//     rating: 4.8,
//     price: 599
// },{
//     name: 'Dubai Desert Safari',
//     rating: 4.6,
//     price: 229
// }];
// Tour.insertMany(tours).then(doc=>{
//     try{
//         console.log(doc)
//     }
//     catch(err){
//         console.log(err)
//     }
// })
// User.insertMany(users).then(doc=>{
//     try{
//         console.log(doc)
//     }
//     catch(err){
//         console.log(err)
//     }
// })
// testtour.save().then(doc=>{
//     try{
//         console.log(doc);
//     }
//     catch(err){
//         console.log(err);
//     }
// })
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});