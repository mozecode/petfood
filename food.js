
//create empty array to hold each data object as it's created
let newFoodArray=[];
let newCatFoodArray=[];

function loadDogFoods(showDogFoods){
//xhr to glean info from dogfood.json
let dogfoodRequest = new XMLHttpRequest();
//open and send request
dogfoodRequest.open("GET", "data/dogfoods.json");
dogfoodRequest.send();
//event listeners to tell it what to do on load or error
dogfoodRequest.addEventListener("load", loadHandler);
dogfoodRequest.addEventListener("error", errorHandler);
}

loadDogFoods(outputDataToNewArray);

function loadCatFoods(showCatFoods){
let catfoodRequest= new XMLHttpRequest();
catfoodRequest.open("GET", "data/catfoods.json");
catfoodRequest.send();
catfoodRequest.addEventListener("load", catLoadHandler);
catfoodRequest.addEventListener("error", errorHandler);
}

loadCatFoods(outputDataToNewCatArray);

//functions to handle request in case of success or error
function loadHandler(){
	var data = JSON.parse(event.target.responseText);
	console.log ("data", data);
	//parse data that comes back and store in variable
	outputDataToNewArray(data.dog_brands); //should give function access to dogbrands array as the variable data
}

function catLoadHandler(){
	var catData = JSON.parse(event.target.responseText);
	console.log ("catData",catData);
	outputDataToNewCatArray(catData.cat_brands);
}

//loop to create each data object that contains name, type, size, cost with nested for loops? then push into the array of objects- each object contains properties of name, type, size, cost that I can call on with my card function

function errorHandler(){
	console.log ("Sorry, your data didn't make it.  Please try again.");
}


//target nodes for output

let outputDog = document.getElementById("outputDog");

let outputCat = document.getElementById("outputCat");

function outputDataToNewArray(data){
	for(var i=0; i<data.length; i++){
		for(var j=0; j<data[i].types.length; j++){
			for(var k=0; k<data[i].types[j].volumes.length; k++){
				let dataObj={
					type: data[i].types[j].type,
					name: data[i].name,
					size: data[i].types[j].volumes[k].name,
					cost: data[i].types[j].volumes[k].price
				};
			newFoodArray.push(dataObj);
			}

		}

	}
	outputToDOM(newFoodArray);//to account for when the data request is done, add output to DOM call here so it won't be undefined
}

function outputDataToNewCatArray(catData){
	for(var i=0; i<catData.length; i++){
		for(var j=0; j<catData[i].types.length; j++){
			for(var k=0; k<catData[i].types[j].volumes.length; k++){
				let catDataObj={
					type: catData[i].types[j].type,
					name: catData[i].name,
					breeds:catData[i].breeds,
					size: catData[i].types[j].volumes[k].name,
					cost: catData[i].types[j].volumes[k].price
				};
			newCatFoodArray.push(catDataObj);
			}

		}

	}
	outputToCatDOM(newCatFoodArray);//to account for when the data request is done, add output to DOM call here so it won't be undefined
}

function cardBuilder(newFoodArray){
	let cardArray =[];
	newFoodArray.forEach(function (object){
		let card = `<div class="card">
						<h2>Dog Food Name: ${object.name}</h2>
						<h3>Type: ${object.type}</h3>
						<h3>Size: ${object.size}</h3>
						<h3>${object.cost}</h3>
					</div>`
		cardArray.push(card);
	});
	return cardArray;
}

function catCardBuilder(newCatFoodArray){
	let catCardArray =[];
	newCatFoodArray.forEach(function (object){
		let catCard = `<div class="card">
						<h2>Cat Food Name: ${object.name}</h2>
						<h3>Breeds:${object.breeds}</h3>
						<h3>Type: ${object.type}</h3>
						<h3>Size: ${object.size}</h3>
						<h3>${object.cost}</h3>
					</div>`
		catCardArray.push(catCard);
	});
	return catCardArray;
}




//card builder takes in the array of objects and iterates through each object to output the cards.

//output the cards to the DOM
function outputToDOM(newFoodArray){
	cardArray=cardBuilder(newFoodArray);
	cardArray.forEach(function(card){
	outputDog.innerHTML+= card;

	});
}

function outputToCatDOM(newCatFoodArray){
	catCardArray=catCardBuilder(newCatFoodArray);
	catCardArray.forEach(function(card){
	outputCat.innerHTML+= card;

	});
}

