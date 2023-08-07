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
    return "Not a number";
   }
   if (isNaN(testInput) === false) {
    return "Is a number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");

    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    if (fuelLevel < 10000) {
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = `Not enough fuel for the journey`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = 'red';
    }

    if (cargoLevel > 10000) {
        list.style.visibility = 'visible';
        cargoStatus.innerHTML = `There is too much mass for the shuttle to take off`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = 'rgb(199, 37, 78)';
    }

    if (fuelLevel > 10000 && cargoLevel < 10000) {
        list.style.visibility = 'visible';
        launchStatus.innerHTML = `Shuttle is ready for launch`;
        launchStatus.style.color = 'rgb(65, 159, 106)';
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
