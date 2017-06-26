//xhr to glean info from dogfood.json
let dogfoodRequest = new XMLHttpRequest();

//create empty data object, empty array to hold each data object as it's created, and empty card array

let newFoodArray=[];


//target nodes for output
let outputDog = document.getElementById("outputDog");
let outputCat = document.getElementById("outputCat");

//open and send request
dogfoodRequest.open("GET", "data/dogfoods.json");
dogfoodRequest.send();

//functions to handle request in case of success or error
function loadHandler(){
	var data = JSON.parse(event.target.responseText);

	//parse data that comes back and store in variable
	console.log ("data.dog_brands", data.dog_brands);
	outputDataToNewArray(data.dog_brands); //should give function access to dogbrands array
	console.log ("data",data);
}

//loop to create each data object that contains name, type, size, cost with nested for loops? then push into the array of objects- each object contains properties of name, type, size, cost that I can call on with my card function

function outputDataToNewArray(data){
	console.log ("data", data);

	for(var i=0; i<data.length; i++){
		for(var j=0; j<data[i].types.length; j++){
			for(var k=0; k<data[i].types[j].volumes.length; k++){
				let dataObj={
					type: data[i].types[j].type,
					name: data[i].name,
					size: data[i].types[j].volumes[k].name,
					cost: data[i].types[j].volumes[k].price
				};
				console.log ("dataObj",dataObj);
				console.log ("newFoodArray", newFoodArray);
				newFoodArray.push(dataObj);
			}

		}

	}
	outputToDOM(newFoodArray);
}

function errorHandler(){
	console.log ("Sorry, your data didn't make it.  Please try again.");
}

//event listeners to tell it what to do on load or error
dogfoodRequest.addEventListener("load", loadHandler);
dogfoodRequest.addEventListener("error", errorHandler);


//card builder takes in the array of objects and iterates through each object to output the cards.
function cardBuilder(newFoodArray){
	console.log (newFoodArray);
	let cardArray =[];
	newFoodArray.forEach(function (object){
		let card = `<div class="card">
						<h2>Dog Food Name: ${object.name}</h2>
						<h3>Type: ${object.type}</h3>
						<h3>Size: ${object.size}</h3>
						<h3>${object.cost}</h3>
					</div>`
		cardArray.push(card);
		console.log ("cardArray",cardArray);
	});
	return cardArray;
}

console.log ("newFoodArray",newFoodArray);



//output the cards to the dom
function outputToDOM(newFoodArray){
	cardArray=cardBuilder(newFoodArray);
	console.log ("cardArray",cardArray);
	cardArray.forEach(function(card){
	outputDog.innerHTML+= card;

	});
}


