// ================= GLOBAL STATE =================

let savings = 0
let debt = 0
let investments = 0
let score = 0

let scenarioIndex = 0
let selectedScenarios = []

let chart

// ================= SCENARIOS =================

const scenarios = [
{
title:"Emergency Car Repair",
description:"Your car breaks down costing $1200.",
options:[
{text:"Pay from savings", savings:-1200, debt:0, investments:0},
{text:"Use credit card", savings:0, debt:1200, investments:0}
]
},
{
title:"Stock Investment",
description:"Invest in tech stock.",
options:[
{text:"Invest $2000", savings:-2000, investments:2500, debt:0},
{text:"Skip investment", savings:0, investments:0, debt:0}
]
},
{
title:"Medical Bill",
description:"Unexpected medical bill of $1500.",
options:[
{text:"Pay immediately", savings:-1500, debt:0, investments:0},
{text:"Take loan", savings:0, debt:1500, investments:0}
]
},
{
title:"Side Business",
description:"Opportunity to start online business.",
options:[
{text:"Invest $1000", savings:-1000, investments:3000, debt:0},
{text:"Ignore", savings:0, investments:0, debt:0}
]
},
{
title:"Luxury Phone",
description:"Buy new phone for $900.",
options:[
{text:"Buy it", savings:-900, debt:0, investments:0},
{text:"Skip", savings:0, debt:0, investments:0}
]
},
{
title:"Crypto Investment",
description:"Crypto is trending.",
options:[
{text:"Invest $1500", savings:-1500, investments:2000, debt:0},
{text:"Avoid", savings:0, investments:0, debt:0}
]
},
{
title:"Student Loan",
description:"Repay part of loan.",
options:[
{text:"Pay $1000", savings:-1000, debt:-1000, investments:0},
{text:"Delay", savings:0, debt:500, investments:0}
]
},
{
title:"Housing Opportunity",
description:"Down payment opportunity.",
options:[
{text:"Invest $3000", savings:-3000, investments:5000, debt:0},
{text:"Rent instead", savings:0, investments:0, debt:0}
]
},
{
title:"Vacation",
description:"Trip costs $2000.",
options:[
{text:"Go trip", savings:-2000, debt:0, investments:0},
{text:"Stay home", savings:500, debt:0, investments:0}
]
},
{
title:"Retirement Fund",
description:"Invest in retirement.",
options:[
{text:"Invest $2500", savings:-2500, investments:4000, debt:0},
{text:"Skip", savings:0, investments:0, debt:0}
]
},

// NEW 10

{
title:"Freelance Opportunity",
description:"Earn $1200 with small investment.",
options:[
{text:"Invest in tools", savings:-300, debt:0, investments:1500},
{text:"Decline", savings:0, debt:0, investments:0}
]
},
{
title:"Unexpected Bonus",
description:"Receive $2000 bonus.",
options:[
{text:"Save it", savings:2000, debt:0, investments:0},
{text:"Invest it", savings:0, debt:0, investments:2500}
]
},
{
title:"Home Appliance Breakdown",
description:"Fridge costs $1000.",
options:[
{text:"Pay upfront", savings:-1000, debt:0, investments:0},
{text:"Installments", savings:0, debt:1200, investments:0}
]
},
{
title:"Online Course",
description:"Course boosts income.",
options:[
{text:"Buy course", savings:-800, debt:0, investments:2000},
{text:"Skip", savings:0, debt:0, investments:0}
]
},
{
title:"Credit Card Offer",
description:"High limit card.",
options:[
{text:"Use it", savings:0, debt:1500, investments:0},
{text:"Avoid", savings:0, debt:0, investments:0}
]
},
{
title:"Startup Investment",
description:"Invest in startup.",
options:[
{text:"Invest $2000", savings:-2000, debt:0, investments:4000},
{text:"Skip", savings:0, debt:0, investments:0}
]
},
{
title:"Car Upgrade",
description:"Upgrade car.",
options:[
{text:"Buy new car", savings:-5000, debt:2000, investments:0},
{text:"Keep old", savings:0, debt:0, investments:0}
]
},
{
title:"Emergency Fund",
description:"Create safety fund.",
options:[
{text:"Save $1500", savings:-1500, debt:0, investments:2000},
{text:"Ignore", savings:0, debt:0, investments:0}
]
},
{
title:"Family Support",
description:"Help family.",
options:[
{text:"Help", savings:-1000, debt:0, investments:0},
{text:"Decline", savings:0, debt:0, investments:0}
]
},
{
title:"Flash Sale",
description:"Huge discount.",
options:[
{text:"Spend $1200", savings:-1200, debt:0, investments:0},
{text:"Skip", savings:300, debt:0, investments:0}
]
}
]

// ================= START GAME =================

function startGame(){
savings = parseInt(document.getElementById("startingMoney").value)

selectedScenarios = scenarios.sort(()=>0.5-Math.random()).slice(0,4)

document.getElementById("startScreen").classList.add("hidden")
document.getElementById("gameScreen").classList.remove("hidden")

initChart()
loadScenario()
}

// ================= CHART =================

function initChart(){
const ctx = document.getElementById("financeChart")

chart = new Chart(ctx,{
type:"line",
data:{
labels:[],
datasets:[
{label:"Savings", data:[], borderColor:"green"},
{label:"Debt", data:[], borderColor:"red"},
{label:"Investments", data:[], borderColor:"blue"}
]
}
})
}

function updateChart(){
chart.data.labels.push("Step")

chart.data.datasets[0].data.push(savings)
chart.data.datasets[1].data.push(debt)
chart.data.datasets[2].data.push(investments)

chart.update()
}

// ================= GAME FLOW =================

function loadScenario(){

if(scenarioIndex >= 4){
endGame()
return
}

let s = selectedScenarios[scenarioIndex]

document.getElementById("scenarioTitle").innerText = s.title
document.getElementById("scenarioDescription").innerText = s.description

let div = document.getElementById("options")
div.innerHTML=""

s.options.forEach(opt=>{
let btn = document.createElement("button")
btn.innerText = opt.text
btn.onclick = ()=>chooseOption(opt)
div.appendChild(btn)
})

updateDashboard()
}

// ================= DECISION =================

function chooseOption(opt){

savings += opt.savings || 0
debt += opt.debt || 0
investments += opt.investments || 0

updateChart()

scenarioIndex++
loadScenario()
}

// ================= DASHBOARD =================

function updateDashboard(){

score = savings + investments - debt

document.getElementById("savings").innerText = savings
document.getElementById("debt").innerText = debt
document.getElementById("investments").innerText = investments
document.getElementById("score").innerText = score
}

// ================= RESULT =================

function getTitle(){

if(investments > savings && investments > debt)
return "The Investor"

if(debt > savings)
return "The Risk Taker"

if(savings > investments)
return "The Saver"

return "The Spender"
}

function endGame(){

document.getElementById("gameScreen").classList.add("hidden")
document.getElementById("resultScreen").classList.remove("hidden")

let title = getTitle()

document.getElementById("finalScore").innerText = "Final Score: " + score
document.getElementById("playerTitle").innerText = "You are: " + title

// destroy old chart
chart.destroy()

// create result chart
const ctx = document.getElementById("resultChart")

new Chart(ctx,{
type:"line",
data: chart.data
})
}