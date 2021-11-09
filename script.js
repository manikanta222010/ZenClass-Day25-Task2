// Async function which fetches list of breeds of dogs
async function breedList() {
    const data = await fetch(`https://dog.ceo/api/breeds/list/all`, { method: 'GET' })
    const { message } = await data.json()

    document.querySelector("#breed").innerHTML += `
    <div class="row justify-content-sm-center">
    <div class="col-12 col-sm-4 col-md-3 d-flex justify-content-around">
        <select onchange="breedData(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(message).map((breed) => {
        return `<option>${breed}</option>`
    }).join('')}
        </select>
        </div>
        <div class="col-12 col-sm-4 col-md-3 d-flex justify-content-around">
        <div class="bounce">
        <button type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="dogfact()">
              <span>Read a Fact about 🐕</span>
            </button>
        </div>
        </div>
    `
}
breedList()



/////////////////////
let timer
let deleteFirstPhotoDelay

async function breedData(breed) {
  if (breed != "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`, { method: 'GET' })
    const data = await response.json()
    createSlideshow(data.message)
  }
}

function createSlideshow(images) {
  let currentPosition = 0
  clearInterval(timer)
  clearTimeout(deleteFirstPhotoDelay)
  
  if (images.length > 1) {
    document.querySelector("#slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>
  `
  currentPosition += 2
  if (images.length == 2) currentPosition = 0
  timer = setInterval(nextSlide, 3000)
  } else {
    document.querySelector("#slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide"></div>
  `
  }

  function nextSlide() {
    document.querySelector("#slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove()
    }, 1000)
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0
    } else {
      currentPosition++
    }
  }
}


async function dogfact(){
    const factsResponse = await fetch("https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=1")
    const {text} = await factsResponse.json()

    if(text.length>15){
        document.querySelector(".modal-body").innerHTML = `<p>${text}</p>`
    }
    else{
        dogfact()
    }
}