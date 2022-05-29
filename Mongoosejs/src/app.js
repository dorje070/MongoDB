const mongoose = require("mongoose");
const validator = require("validator");

//connection creation and creating a new db
mongoose.connect("mongodb://localhost:27017/dtchannel", {useNewUrlParser:true, useUnifiedTopology: true})
.then( () => console.log("connection sucessful...."))
.catch((err)=>console.log(err));


// schema
// A Mongoose schema define the strcture of the document,
// default values, validators, etc., wheras a Moogoose model
// provides an interface to the databases for creating,
// querying, updating, deleting record, etc.

// data structure
const playlistSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique: true,
        lowercase : true,
        trim: true,
        minlength:[2, "minimum 2letters"],
        maxlenght : 30
    },
    ctype : {
        type: String,
        enum :["frontend","backend","database"],
        require : true,
        lowercase : true
    },
    videos : {
        // custom validation
        type : Number,
        validate(value){
            if(value <0){
                throw  new Error("videos cound not be negative");
            } 
        }

        // validate:{
        //     validator:function(value){
        //         return value.length < 0
        //     },
        //     message:"Videos could not be negative"
        // }

    },
    author : String,
    email: {
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Email is inValid");
            }
        }
    },
    active : Boolean,
    date : {
        type: Date,
        default : Date.now
    }
})

// collection create 
const Playlist = new mongoose.model("Playlist", playlistSchema);

// create doumnet or insert 

// ------ * insert only one document code * --------

const createDocument = async() =>{
    try{
        const reactPlaylist = new Playlist({
            name : "python",
            ctype : "database",
            videos : 5,
            author : "Dorje Tamang",
            email : "Dorje@gmail.com",
            active : true,
        })
        const result = await reactPlaylist.save();
        console.log(result);
    }catch(err){
        console.log(err)
    }
}



// ------ * insert only multiple document code * --------


// const createDocument = async() =>{
//     try{
//         const jsPlaylist = new Playlist({
//             name : "javascript",
//             ctype : "Front End",
//             videos : 150,
//             author : "Dorje Tamang",
//             active : true,
//         })

//         const monogoPlaylist = new Playlist({
//             name : "MongoDB",
//             ctype : "Database",
//             videos : 10,
//             author : "Dorje Tamang",
//             active : true,
//         })

//         const monogoosePlaylist = new Playlist({
//             name : "Mongoose JS",
//             ctype : "Database",
//             videos : 4,
//             author : "Dorje Tamang",
//             active : true,
//         })

//         const expressPlaylist = new Playlist({
//             name : "Express JS",
//             ctype : "Back End",
//             videos : 20,
//             author : "Dorje Tamang",
//             active : true,
//         })

//         const result = await Playlist.insertMany([jsPlaylist, monogoPlaylist, monogoosePlaylist, expressPlaylist]);
//         console.log(result);

//     }catch(err){
//         console.log(err)
//     }
// }


createDocument();


// ------ * Read document code * --------

// const getDocument = async () =>{
//     try{
//         const result =  await Playlist.find({ctype : "Front End"})
//         .select({name:1})
//         .limit(1);
//         console.log(result)
//     }catch(err){
//         console.log(err)
//     }
   
// }


// ------ * comparing operation document code * --------

// const getDocument = async () =>{
//     try{
//         const result =  await Playlist
//         .find({ctype : {$nin : ["Back End", "Database"]}})
//         .select({name:1})
//         console.log(result)
//     }catch(err){
//         console.log(err)
//     }
// }

// ------ * Logical operation document code * --------



// const getDocument = async () =>{
//     try{
//         const result =  await Playlist
//         .find({$not :[{ctype : "Back End"}, 
//         {author: "Dorje Tamang"}]})
//         .select({name:1})
//         console.log(result)
//     }catch(err){
//         console.log(err)
//     }
// }


// ------ * Sorting and counting  document code * --------

const getDocument = async () =>{
    try{
        const result =  await Playlist
        .find({author: "Dorje Tamang"})
        .select({name:1})
        .sort({name: -1});
        // count operation
        // .countDocuments()
        console.log(result)
    }catch(err){
        console.log(err)
    }
}


// getDocument();


// ------ * Update document code * --------

const UpdateDocument = async (_id) =>{
    try{
        const result = await Playlist.findByIdAndUpdate({_id}, 
            {$set:{name: "Javascript"}}
        , {
            new : true
            ,useFindAndModidy: false})
        console.log(result)
    }catch(err){
        console.log(err)
    }
}



// UpdateDocument("628fb266fd50dd5652f95dbb");


// ------ * delete document code * --------

const deleteDocumemt = async(_id) =>{
    try{
        const result = await Playlist.findByIdAndDelete({_id});
    console.log(result)
    }catch(err){
        console.log(err)
    }
}
    


// deleteDocumemt("628fb87866202f4139b8dbb4")
