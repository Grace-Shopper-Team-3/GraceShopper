const {
  plantInstructions,
  plantDescription,
  plantImageUrls,
  plantNames
} = require('./seed_data')

// inventory?
// change the object props names to match models

function buildPlant(
  name,
  description,
  instructions,
  imageUrl,
  price,
  warehouseInv
) {
  return {
    // object description matches what whats here
    name,
    description,
    instructions,
    imageUrl,
    price,
    warehouseInv
  }
}

function makePlantName(firstName) {
  let name = firstName[Math.floor(Math.random() * firstName.length)]
  return name
}
function randomImageUrl(imageUrl) {
  return imageUrl[Math.floor(Math.random() * imageUrl.length)]
}
function makeRandomDescription(description) {
  let smallDescription =
    description[Math.floor(Math.random() * description.length)]
  return smallDescription
}
function makeRandomPrice() {
  return Math.floor(Math.random() * (80.99 - 1)) + 0.99
  // concerned that dollar sign might change type to string
  //  can we change model price type to support decimals?
}

function makeRandomInstruction(instruction) {
  let plantInstruction =
    instruction[Math.floor(Math.random() * instruction.length)]
  return plantInstruction
}
function makeRandomQuant() {
  return Math.floor(Math.random() * (119 - 1) + 1)
  // wanted to add in stock to end but would change type to string
}

function makeManyPlants(numOfPlants) {
  let plants = []
  for (let i = 0; i < numOfPlants; i++) {
    plants.push(
      buildPlant(
        //quanitiy function
        makePlantName(plantNames),
        makeRandomDescription(plantDescription),
        makeRandomInstruction(plantInstructions),
        randomImageUrl(plantImageUrls),
        makeRandomPrice(),
        makeRandomQuant()
      )
    )
  }
  return plants
}
module.exports = {
  makeManyPlants
}
