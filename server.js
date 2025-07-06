const express = require("express")
const app = express()
const cors = require("cors")
app.listen(3000,()=>{
  console.log("Server Started at 3000 port!")
})

app.use(cors())
app.use(express.json());

const aiHeadlines = [
  "Why {name} is {location}'s Sweetest Spot in 2025",
  "Discover the Best of {location} at {name}",
  "{name} - A Hidden Gem of {location}",
  "Top Reasons to Visit {name} in {location}",
  "Locals Love {name} - Here's Why!",
  "Experience the Magic of {name} in the Heart of {location}",
  "What Makes {name} the Talk of {location}?",
  "From Locals to Tourists - Everyone Loves {name}",
  "{name}: Where Tradition Meets Innovation in {location}",
  "Step Into Flavor at {name}, {location}'s Favorite Spot",
  "Your Next Favorite Place in {location}: {name}",
  "The Secret's Out - {name} is a Must-Visit in {location}",
  "Why Everyone in {location} is Talking About {name}",
  "Unforgettable Moments Begin at {name} in {location}",
  "{name} Ranked Among Top Local Favorites in {location}",
  "Celebrate Local - Explore {name} in {location} Today",
  "{name}: The Pride of {location}'s Local Scene",
  "Don't Miss Out on {location}'s Gem: {name}",
  "See What Makes {name} Shine in {location}",
  "A Taste of Excellence: {name} in {location}",
  "Award-Winning Service at {name} - Right Here in {location}!"
]

const generateRandomHeadline = (name,location)=>{
    const selectedHeadline = aiHeadlines[Math.floor(Math.random()*aiHeadlines.length)];
    const headline = selectedHeadline.replace("{name}",name).replace("{location}",location);
    return headline;

}
app.post("/business-data",(req,res)=>{
     const {name,location} = req.body;
     try{
      if(!name||!location){
        throw new Error("Name or Location Not Found!");
      }
     const data = {
        "rating":(Math.random()*5).toFixed(1),
        "reviews":Math.floor(Math.random()*500),
        "headline":generateRandomHeadline(name,location)
     };
     res.send(data);
    }
    catch(error){
        res.status(500).json("Error! "+error.msg);
    }
})

app.get("/regenerate-headline",(req,res)=>{
    const {name,location} = req.query;
    if(name===undefined){
        res.send("Name is Required!");
    }
    else if(location===undefined){
         res.send("Location is Required!");
    }
    else{
        const regenerateTitle = generateRandomHeadline(name,location);
        res.json(regenerateTitle);
    }
})

