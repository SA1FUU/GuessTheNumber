
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

function ShowGameHistory() {
    container.innerHTML = localStorage.getItem("data")
}

// Random Number Concept

let randomNumber;

function GenerateRandomNumber() {
    randomNumber = Math.round(Math.random() * 100)
}

let numberSubmitButton = document.getElementById("numbersubmit")
let playerInput = document.getElementById("playerinput")
let result = document.getElementById("result")


// Adding Guessed Number to Guess List

let guesses = document.getElementById("guesses")

let allGuessedInput = []

function PushGuesses() {

    let newGuessedInput = playerInput.value

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


//     Close Gamecard Button

let closeAfterGameButton = document.getElementById("closeAfterGame")

function CreateCloseButton() {
    closeAfterGameButton.style.visibility = "visible"
}

function HideCloseButton() {
    closeAfterGameButton.style.visibility = "hidden"
}


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

// Function to Show Result 

function ShowResult(res) {
    result.textContent = "Checking....."
    setTimeout(() => {
        result.textContent = res
        playerInput.value = ""
    }, 1000);
}

let clickCounter = 0

function Validation() {
    clickCounter++
    if (playerInput.value == randomNumber) {
        ShowResult(playername.value + ", You Got " + randomNumber + " in " + clickCounter + " Attempts")
        CreateCloseButton(),
            CreateList(),
            SaveGameHistory(),
            numberSubmitButton.setAttribute('disabled', '')
    }
    else if (playerInput.value > randomNumber && playerInput.value - randomNumber >= 15) {
        ShowResult(res = "Not Even Close, Less Than " + playerInput.value)
    }
    else if (playerInput.value > randomNumber && playerInput.value - randomNumber <= 15) {
        ShowResult(res = "You Are Close, Little Less Than "  + playerInput.value)
    }
    else if (playerInput.value < randomNumber && randomNumber - playerInput.value >= 15) {
        ShowResult(res = "Not Even Close, More Than "  + playerInput.value)
    }
    else if (playerInput.value < randomNumber && randomNumber - playerInput.value <= 15) {
        ShowResult(res = "You Are Close, Little More Than "  + playerInput.value)
    }
    else {
        ShowResult(res = "Not Even Close, Try Again")
    }
}


//   Adding and Removing Cards

function ApplyBlurFilter() {
    document.querySelector(".landing-container").style.filter = "blur(10px)"
    document.querySelector(".user-info").classList.add("show-user-info")
    document.getElementById("playername").focus()
}

function RemoveBlurFilter() {
    document.querySelector(".landing-container").style.filter = "blur(0)",
    document.querySelector(".user-info").classList.remove("show-user-info")
    allGuessedInput = []
}

function CloseAllCards() {
    RemoveBlurFilter(),
    HideCloseButton(),
    allGuessedInput = [],
    clickCounter = 0,
    numberSubmitButton.removeAttribute('disabled'),
    document.querySelector(".game-container").classList.remove("show-game-container"),
    document.getElementById("playername").value = "",
    playerInput.value = "",
    result.textContent = "Enter the Number!"
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

playButton.addEventListener("click", (event) => {
    event.preventDefault()
    if (!playername.value == "") {
        ShowGameCard(),
        GenerateRandomNumber(),
        username.innerText = playername.value
    }
})

window.addEventListener("load", () => {
    ShowGameHistory(),
        CloseAllCards(),
        playername.value = ""
        allGuessedInput = []
})
