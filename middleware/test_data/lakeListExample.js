const fishListExample = require("./fishListExample");

module.exports= [
    {
        _id:1,
        name:"Kis tó",
        description:"Ez egy nagyon kicsi tó",
        natural:true,
        waterContent:150,
        depth:2,
        fish: [...fishListExample]
    },
    {
        _id:2,
        name:"Közepes tó",
        description:"Ez egy nagyon közepes tó",
        natural:true,
        waterContent:300,
        depth:6,
        fish: [fishListExample[1], fishListExample[2]]
    },
    {
        _id:3,
        name:"Nagy tó",
        description:"Ez egy nagyon nagy tó",
        natural:false,
        waterContent:900,
        depth:30,
        fish: [fishListExample[0]]
    }
]