 let myShows = [
"LOVE",
"CARE",
"PRESENCE",
"WARMTH",
"SWEETNESS",
"FRAGRANCE",
"COMFORT",
"SUPPORT",
"JOY",
"LAUGHTER",
"BEAUTY",
"CONNECTION",
"KINDNESS",
"EMPATHY",
"MOMENTS",
"FRIENDSHIP",
"MEMORIES",
"DREAMS",
"LAUGHTER",
"HEARTS",

];

export function chooseword(){
    return myShows[Math.floor(Math.random() * myShows.length)]; 
    
    }