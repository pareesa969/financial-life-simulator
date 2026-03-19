let savings
let debt=0
let investments=0
let score=0

let scenarioIndex=0
let selectedScenarios=[]

let chart
let history=[]

function startGame(){

savings = parseInt(document.getElementById("startingMoney").value)

selectedScenarios = scenarios.sort(()=>0.5-Math.random()).slice(0,4)

document.getElementById("startScreen").classList.add("hidden")
document.getElementById("gameScreen").classList.remove("hidden")

initChart()

loadScenario()

}

function initChart(){

const ctx = document.getElementById("financeChart")

chart = new Chart(ctx,{
type:"line",
data:{
labels:[],
datasets:[
{
label:"Savings",
data:[],
borderColor:"green"
},
{
label:"Debt",
data:[],
borderColor:"red"
},
{
label:"Investments",
data:[],
borderColor:"blue"
}
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

function loadScenario(){

if(scenarioIndex >= 4){
endGame()
return
}

let scenario = selectedScenarios[scenarioIndex]

document.getElementById("scenarioTitle").innerText = scenario.title
document.getElementById("scenarioDescription").innerText = scenario.description

let optionsDiv = document.getElementById("options")
optionsDiv.innerHTML=""

scenario.options.forEach(option=>{

let btn = document.createElement("button")

btn.innerText = option.text

btn.onclick=()=>chooseOption(option)

optionsDiv.appendChild(btn)

})

updateDashboard()

}

function chooseOption(option){

savings += option.savings || 0
debt += option.debt || 0
investments += option.investments || 0

updateChart()

scenarioIndex++

loadScenario()

}

function updateDashboard(){

score = calculateScore(savings,investments,debt)

document.getElementById("savings").innerText=savings
document.getElementById("debt").innerText=debt
document.getElementById("investments").innerText=investments
document.getElementById("score").innerText=score

}

function endGame(){

document.getElementById("gameScreen").classList.add("hidden")
document.getElementById("resultScreen").classList.remove("hidden")

let title = getTitle(score,savings,investments,debt)

document.getElementById("finalScore").innerText = "Final Score: "+score

document.getElementById("playerTitle").innerText = "You are: "+title

}