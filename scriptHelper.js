// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById("missionTarget");

   missionTarget.innerHTML = 
        `<h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src= ${imageUrl}>`
   
}

function validateInput(testInput) {
   if (testInput === "") {
    return "Empty";
   }
   if (isNaN(testInput) === true) {
    return "Not a Number";
   }
   if (isNaN(testInput) === false) {
    return "Is a Number";
   }
}


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");


    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty"  || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!");
    }
    else if (validateInput(pilot) === "Is a number" || validateInput(copilot) === "is a number"  || validateInput(fuelLevel) === "Not a number" || validateInput(cargoLevel) === "Not a number") {
        alert("Invalid information");
    } 
    else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    }

    

    if (fuelLevel < 10000) {
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = `Fuel level too low for launch`;
        //fuelStatus.style.color = 'red';
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = 'rgb(199, 37, 78)';
    }

    if (cargoLevel > 10000) {
        list.style.visibility = 'visible';
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
        cargoStatus.style.color = 'red';
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = 'rgb(199, 37, 78)';
    }

    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
        list.style.visibility = 'visible';
        launchStatus.innerHTML = `Shuttle is Ready for Launch`;
        launchStatus.style.color = 'rgb(65, 159, 106)';
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
        fuelStatus.style.color = '';
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
        cargoStatus.style.color = '';
    }
    

   
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function (response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random()*planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
