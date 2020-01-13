let pageNum = 1
let monsterContainer = document.getElementById('monster-container')

document.addEventListener("DOMContentLoaded", function() {
    let createMonst = document.getElementById('create-monster')
    createMonst.innerHTML = `
        <form> 
        <input type="text" name="monstername">
        <input type="integer" name="monsterage">
        <input type="text" name="monsterdescrip">
        <input type="submit" value="Submit">
        </form>
        
    `
    loadMonsters()
})

function loadMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(resp => resp.json())
    .then(allMonst => {
        monsterContainer.innerHTML = ""
        allMonst.forEach(monster => monsterCreate(monster))
    })
}

function monsterCreate(monster) {
    let monsterDiv = document.createElement('div')
    monsterDiv.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}</p>
    `
    monsterContainer.appendChild(monsterDiv)
}

document.addEventListener("submit", function(e) {
    e.preventDefault();
    monsterObj = {"name": e.target.monstername.value, "age": e.target.monsterage.value, "description": e.target.monsterdescrip.value}
    fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify(monsterObj)
    })
    .then(resp => resp.json())
    .then(monster => monsterCreate(monster))
})

document.addEventListener("click", function(e) {
    if (e.target.id === "forward") {
    pageNum++
    loadMonsters()
    } else if (e.target.id === "back" && pageNum > 1) {
        pageNum--
        loadMonsters()
    }
})