let savings=0,debt=0,investments=0,score=0
let scenarioIndex=0
let selectedScenarios=[]
let chart

// ================= SCENARIOS (60) =================
const scenarios = [

/* ================= EMERGENCIES ================= */

{title:"Car Breakdown",description:"Repair costs $1200.",options:[{text:"Pay cash",savings:-1200},{text:"Credit card",debt:1200}]},
{title:"Medical Emergency",description:"Hospital bill $2000.",options:[{text:"Pay savings",savings:-2000},{text:"Loan",debt:2000}]},
{title:"Phone Damage",description:"Repair $500.",options:[{text:"Fix now",savings:-500},{text:"Delay",debt:200}]},
{title:"House Repair",description:"Leak fix $1500.",options:[{text:"Pay",savings:-1500},{text:"Loan",debt:1500}]},
{title:"Laptop Crash",description:"New laptop $1000.",options:[{text:"Buy now",savings:-1000},{text:"Finance",debt:1200}]},
{title:"Dental Bill",description:"Cost $800.",options:[{text:"Pay",savings:-800},{text:"Delay",debt:500}]},
{title:"Car Accident",description:"Insurance gap $1000.",options:[{text:"Pay",savings:-1000},{text:"Loan",debt:1000}]},
{title:"Flood Damage",description:"Home damage $2500.",options:[{text:"Repair",savings:-2500},{text:"Loan",debt:2500}]},
{title:"Pet Surgery",description:"Costs $900.",options:[{text:"Pay",savings:-900},{text:"Credit",debt:900}]},
{title:"Electric Failure",description:"Fix $600.",options:[{text:"Pay",savings:-600},{text:"Delay",debt:400}]},

/* ================= INVESTMENTS ================= */

{title:"Stock Tip",description:"Invest $2000.",options:[{text:"Invest",savings:-2000,investments:3000},{text:"Skip"}]},
{title:"Crypto Boom",description:"Invest $1500.",options:[{text:"Invest",savings:-1500,investments:2500},{text:"Avoid"}]},
{title:"Real Estate",description:"Down payment $4000.",options:[{text:"Invest",savings:-4000,investments:7000},{text:"Skip"}]},
{title:"Mutual Funds",description:"Invest $1000.",options:[{text:"Invest",savings:-1000,investments:1500},{text:"Skip"}]},
{title:"Gold Investment",description:"Buy gold $1200.",options:[{text:"Buy",savings:-1200,investments:1600},{text:"Skip"}]},
{title:"Startup Funding",description:"Invest $3000.",options:[{text:"Invest",savings:-3000,investments:6000},{text:"Skip"}]},
{title:"ETF Plan",description:"Invest $800.",options:[{text:"Invest",savings:-800,investments:1200},{text:"Skip"}]},
{title:"Foreign Stocks",description:"Invest $2500.",options:[{text:"Invest",savings:-2500,investments:3500},{text:"Skip"}]},
{title:"Bond Investment",description:"Invest $1000.",options:[{text:"Invest",savings:-1000,investments:1300},{text:"Skip"}]},
{title:"Index Fund",description:"Invest $1500.",options:[{text:"Invest",savings:-1500,investments:2000},{text:"Skip"}]},

/* ================= LIFESTYLE ================= */

{title:"Luxury Watch",description:"Costs $2000.",options:[{text:"Buy",savings:-2000},{text:"Skip",savings:300}]},
{title:"Vacation",description:"Trip $2500.",options:[{text:"Go",savings:-2500},{text:"Stay",savings:500}]},
{title:"Gaming Setup",description:"Cost $1500.",options:[{text:"Buy",savings:-1500},{text:"Skip"}]},
{title:"Dining Out",description:"Spend $300.",options:[{text:"Spend",savings:-300},{text:"Save",savings:100}]},
{title:"Clothing Sale",description:"Spend $600.",options:[{text:"Buy",savings:-600},{text:"Skip"}]},
{title:"Gym Membership",description:"Cost $500.",options:[{text:"Join",savings:-500,investments:800},{text:"Skip"}]},
{title:"New Phone",description:"Cost $1200.",options:[{text:"Buy",savings:-1200},{text:"Skip"}]},
{title:"Streaming Subscriptions",description:"Cost $200.",options:[{text:"Subscribe",savings:-200},{text:"Cancel",savings:100}]},
{title:"Concert Tickets",description:"Cost $400.",options:[{text:"Buy",savings:-400},{text:"Skip"}]},
{title:"Car Upgrade",description:"Cost $5000.",options:[{text:"Buy",savings:-5000,debt:2000},{text:"Keep old"}]},

/* ================= CAREER ================= */

{title:"Online Course",description:"Cost $800.",options:[{text:"Buy",savings:-800,investments:2000},{text:"Skip"}]},
{title:"Certification",description:"Cost $1200.",options:[{text:"Take",savings:-1200,investments:2500},{text:"Skip"}]},
{title:"Workshop",description:"Cost $500.",options:[{text:"Attend",savings:-500,investments:1200},{text:"Skip"}]},
{title:"Freelance Setup",description:"Cost $400.",options:[{text:"Start",savings:-400,investments:1500},{text:"Skip"}]},
{title:"Skill Upgrade",description:"Cost $1000.",options:[{text:"Invest",savings:-1000,investments:2500},{text:"Skip"}]},
{title:"Networking Event",description:"Cost $300.",options:[{text:"Attend",savings:-300,investments:1000},{text:"Skip"}]},
{title:"Side Hustle",description:"Invest $700.",options:[{text:"Start",savings:-700,investments:2000},{text:"Skip"}]},
{title:"Job Switch",description:"Risky but higher pay.",options:[{text:"Switch",investments:3000},{text:"Stay"}]},
{title:"Mentorship",description:"Cost $600.",options:[{text:"Join",savings:-600,investments:1800},{text:"Skip"}]},
{title:"Build Portfolio",description:"Invest $500.",options:[{text:"Build",savings:-500,investments:1500},{text:"Skip"}]},

/* ================= DEBT ================= */

{title:"Credit Card Bill",description:"$1500 due.",options:[{text:"Pay",savings:-1500,debt:-1500},{text:"Delay",debt:1500}]},
{title:"Loan EMI",description:"$1000 payment.",options:[{text:"Pay",savings:-1000,debt:-1000},{text:"Skip",debt:500}]},
{title:"Personal Loan",description:"Take $2000.",options:[{text:"Take",savings:2000,debt:2000},{text:"Avoid"}]},
{title:"Buy Now Pay Later",description:"Spend $800.",options:[{text:"Use",debt:800},{text:"Avoid"}]},
{title:"Credit Upgrade",description:"Limit increase.",options:[{text:"Spend",debt:2000},{text:"Ignore"}]},
{title:"Debt Settlement",description:"Pay $1200.",options:[{text:"Pay",savings:-1200,debt:-1500},{text:"Delay",debt:500}]},
{title:"Car Loan",description:"$5000 loan.",options:[{text:"Take",debt:5000},{text:"Avoid"}]},
{title:"Home Loan",description:"$10000 loan.",options:[{text:"Take",debt:10000,investments:15000},{text:"Avoid"}]},
{title:"Refinance Loan",description:"Reduce interest.",options:[{text:"Refinance",debt:-1000},{text:"Ignore"}]},
{title:"Pay Minimum",description:"Lower payment.",options:[{text:"Pay min",debt:500},{text:"Pay full",savings:-1000,debt:-1000}]},

/* ================= OPPORTUNITIES ================= */

{title:"Startup Equity",description:"Invest $3000.",options:[{text:"Invest",savings:-3000,investments:7000},{text:"Skip"}]},
{title:"Business Idea",description:"Start business.",options:[{text:"Start",savings:-2000,investments:6000},{text:"Skip"}]},
{title:"Import Goods",description:"Invest $2500.",options:[{text:"Invest",savings:-2500,investments:5000},{text:"Skip"}]},
{title:"E-commerce Store",description:"Cost $1500.",options:[{text:"Start",savings:-1500,investments:4000},{text:"Skip"}]},
{title:"Affiliate Marketing",description:"Start $500.",options:[{text:"Start",savings:-500,investments:2000},{text:"Skip"}]},
{title:"YouTube Channel",description:"Cost $800.",options:[{text:"Start",savings:-800,investments:2500},{text:"Skip"}]},
{title:"Blog Website",description:"Cost $300.",options:[{text:"Start",savings:-300,investments:1200},{text:"Skip"}]},
{title:"Dropshipping",description:"Cost $1000.",options:[{text:"Start",savings:-1000,investments:3000},{text:"Skip"}]},
{title:"Franchise",description:"Cost $4000.",options:[{text:"Buy",savings:-4000,investments:9000},{text:"Skip"}]},
{title:"Partnership Offer",description:"Invest $2000.",options:[{text:"Join",savings:-2000,investments:5000},{text:"Skip"}]}

]

// ================= START =================

function startGame(){

savings = parseInt(document.getElementById("startingMoney").value)

selectedScenarios = scenarios.sort(()=>0.5-Math.random()).slice(0,10)

document.getElementById("startScreen").classList.add("hidden")
document.getElementById("gameScreen").classList.remove("hidden")

initChart()
loadScenario()
}

// ================= CHART =================

function initChart(){
const ctx=document.getElementById("financeChart")

chart=new Chart(ctx,{
type:"line",
data:{
labels:[],
datasets:[
{label:"Savings",data:[],borderColor:"green"},
{label:"Debt",data:[],borderColor:"red"},
{label:"Investments",data:[],borderColor:"blue"}
]
}
})
}

function updateChart(){
chart.data.labels.push("Step "+(scenarioIndex+1))
chart.data.datasets[0].data.push(savings)
chart.data.datasets[1].data.push(debt)
chart.data.datasets[2].data.push(investments)
chart.update()
}

// ================= FLOW =================

function loadScenario(){

if(scenarioIndex>=selectedScenarios.length){
endGame()
return
}

let s=selectedScenarios[scenarioIndex]

document.getElementById("progress").innerText =
"Scenario "+(scenarioIndex+1)+" of "+selectedScenarios.length

document.getElementById("scenarioTitle").innerText=s.title
document.getElementById("scenarioDescription").innerText=s.description

let div=document.getElementById("options")
div.innerHTML=""

s.options.forEach(opt=>{
let btn=document.createElement("button")
btn.innerText=opt.text
btn.onclick=()=>chooseOption(opt)
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

document.getElementById("savings").innerText=savings
document.getElementById("debt").innerText=debt
document.getElementById("investments").innerText=investments
document.getElementById("score").innerText=score
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

let title=getTitle()

document.getElementById("finalScore").innerText="Final Score: "+score
document.getElementById("playerTitle").innerText="You are: "+title

chart.destroy()

const ctx=document.getElementById("resultChart")

new Chart(ctx,{
type:"line",
data:chart.data
})
}