

// List Thing

let container = document.querySelector(".history-ul")

function CreateList() {
    let li = document.createElement("li")
    container.appendChild(li)
    li.innerText = ` ${document.getElementById("playername").value} ┃ ${randomNumber} ┃ ${clickCounter}A`

    let rh = document.createElement("I")
    rh.classList.add("fa-solid")
    rh.classList.add("fa-trash")

    li.appendChild(rh)   
}

// Adding Event Listener on Task List

container.addEventListener("click", (e) => {
    if (e.target.tagName === "I") {
        e.target.parentElement.remove()
        SaveGameHistory()
    }
}, false)

 // Function to Save Profile Data

 function SaveGameHistory() {
        localStorage.setItem("data", container.innerHTML)
    }

    function showProfileData() {
        container.innerHTML = localStorage.getItem("data")
    }

// Random Number Concept

let randomNumber;

function GenerateRandomNumber() {
    randomNumber = Math.round(Math.random() * 100)
    // console.log(randomNumber);
}

let numberSubmitButton = document.getElementById("numbersubmit")
let playerInput = document.getElementById("playerinput")
let result = document.getElementById("result")

// Adding and Modifying Guessed Number

let guesses = document.getElementById("guesses")

let allGuessedInput = []

function PushGuesses() {

    let newGuessedInput = document.getElementById("playerinput").value

    if (newGuessedInput) {
        allGuessedInput.push(newGuessedInput);
        guesses.textContent = "Your Guesses - " + allGuessedInput.join(" ");
    }
}

// History Container

let hContainer = document.querySelector(".history-container")
let bars = document.getElementById("bar")
let chc = document.getElementById("chc")

function ShowHistoryContainer() {
    hContainer.classList.add("show-hc")
    chc.style.display = "block"
    bars.style.display = "none"
}

function HideHistoryContainer() {
    hContainer.classList.remove("show-hc")
    chc.style.display = "none"
    bars.style.display = "block"
}

bars.addEventListener("click", () => {
    ShowHistoryContainer()
})

chc.addEventListener("click", () => {
    HideHistoryContainer()
})

numberSubmitButton.addEventListener("click", (e) => {
    e.preventDefault(),
        Validation(),
        PushGuesses()
})


let clickCounter = 0


function Validation() {
    clickCounter++
    if (playerInput.value == randomNumber) {
        result.textContent = "Woah, You Got it in " + clickCounter + " Attempts"
        CreateCloseButton(),
        CreateList(),
        SaveGameHistory()
    }
    else if (playerInput.value > randomNumber && playerInput.value - randomNumber >= 15) {
        result.textContent = "Not Even Close, Less Than That"
        ClearResult()
    }
    else if (playerInput.value > randomNumber && playerInput.value - randomNumber <= 15) {
        result.textContent = "You Are Close, Little Less Than That"
        ClearResult()
    }
    else if (playerInput.value < randomNumber && randomNumber - playerInput.value >= 15) {
        result.textContent = "Not Even Close, More Than That"
        ClearResult()
    }
    else if (playerInput.value < randomNumber && randomNumber - playerInput.value <= 15) {
        result.textContent = "You Are Close, Little More Than That"
        ClearResult()
    }
    else {
        result.textContent = "Not Even Close, Try Again"
        ClearResult()
    }
}

function ClearResult() {
    setTimeout(() => {
        result.textContent = "Try Another Number!"
        playerInput.value = ""
    }, 1600);
}

//     Close Gamecard Button

function CreateCloseButton() {
    document.getElementById("closeAfterGame").style.visibility = "visible"
}

function HideCloseButton() {
    document.getElementById("closeAfterGame").style.visibility = "hidden"
}

let closeAfterGameButton = document.getElementById("closeAfterGame")

closeAfterGameButton.addEventListener("click", (e) => {
    try {
        e.preventDefault(),
            CloseAllCards(),
            HideCloseButton(),
            clickCounter = 0
        document.getElementById("playername").value = ""
        document.getElementById("playerinput").value = ""
        result.textContent = "Enter the Number!"
    }
    catch {
        console.log(Error);
    }
})

//   Adding and Removing Cards

function ApplyBlurFilter() {
    document.querySelector(".landing-container").style.filter = "blur(10px)"
    document.querySelector(".user-info").classList.add("show-user-info")
    document.getElementById("playername").focus()
}

function RemoveBlurFilter() {
    document.querySelector(".landing-container").style.filter = "blur(0)"
    document.querySelector(".user-info").classList.remove("show-user-info")
    allGuessedInput = []
}

function CloseAllCards() {
    RemoveBlurFilter(),
        HideCloseButton(),
        document.querySelector(".game-container").classList.remove("show-game-container")
    document.getElementById("playername").value = ""
    result.textContent = "Enter the Number!"
    allGuessedInput = []
}

function ShowGameCard() {
    document.querySelector(".game-container").classList.add("show-game-container")
    guesses.textContent = ""
}

// Event Listeners

let playTheGameButton = document.getElementById("playthegame")
let closeTheCard = document.getElementById("closethecard")
let closeGameCard = document.getElementById("closegamecard")

let playername = document.getElementById("playername")
let username = document.getElementById("username")

playTheGameButton.addEventListener("click", ApplyBlurFilter)

closeTheCard.addEventListener("click", RemoveBlurFilter)

closeGameCard.addEventListener("click", CloseAllCards)

let playButton = document.getElementById("playbutton")

playButton.addEventListener("click", (e) => {
    e.preventDefault()
    if (playername.value !== "") {
        playerInput.focus = true,
            playername.focus = false,
            ShowGameCard(),
            GenerateRandomNumber(),
            username.innerText = playername.value
    }
})

window.addEventListener("load", () => {
    showProfileData(),
    CloseAllCards(),
    playername.value = ""
    allGuessedInput = []
})