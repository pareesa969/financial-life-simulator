function calculateScore(savings,investments,debt){

return savings + investments - debt

}

function getTitle(score,savings,investments,debt){

if(investments > savings && investments > debt)
return "The Investor"

if(debt > savings)
return "The Risk Taker"

if(savings > investments)
return "The Saver"

return "The Spender"

}