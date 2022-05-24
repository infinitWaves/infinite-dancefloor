let bgWaveHeight
let waveDistance
let floatDelta = 0.5
let p5Caneva
let btnSaveMyFirstAvatar
let btnSaveAnotherAvatar
let userName

let avatars = []

const config = {
  apiKey: "AIzaSyDfC7SqXVAGR3ekWeNKn5Ja-zxSthMOTzk",
  authDomain: "ecal-cdfcf.firebaseapp.com",
  projectId: "ecal-cdfcf",
  storageBucket: "ecal-cdfcf.appspot.com",
  messagingSenderId: "869616859356",
  appId: "1:869616859356:web:91aa3726d48dd1344cdc19",
  databaseURL: " https://ecal-cdfcf-default-rtdb.europe-west1.firebasedatabase.app"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const database = firebase.database()

//======================================================================
function setup() {
  colorMode(RGB, 255)
  sketch = document.querySelector("#sketch")
  database.ref("db/waves").on(
    "value",
    snapshot => {
      Object.values(snapshot.val()).map(avat =>
        Object.values(avat).map(params =>
          Object.values(params).forEach(design => {
            console.log(design)
            avatars.push(design)
          })
        )
      )

      avatars = avatars.map(design => setupBGWaves(design))

      avatars.forEach(design => {
        let p5Caneva = createCanvas((3 / 5) * windowHeight, (3 / 5) * windowHeight)
        p5Caneva.parent("sketch-visualiser")
        background(design.Aura)
      })
    },
    errorObject => {
      console.log("The read failed: " + errorObject.name)
    }
  )

  //=====================================================================
}

function draw() {
  avatars.forEach(design => {
    console.log(design)
    displayBGWaves(design)
    console.log()
  })
  noLoop()

  loop()
  /*  avatars.forEach(design => {
    print("hello")
    background(design.Color)

    updateBGWaves(design)
    checkParams(design)

    displayBGWaves(design)
    changeColor(design)
  }) */
}

function setupBGWaves(design) {
  let bgSine
  let bgSquare
  let bgTriangle
  let bgSawtooth
  bgWaveHeight = (-1 / 3) * height
  waveDistance = (1 / 6) * height

  bgSine = new SineWave(0, (1 / 3) * height, width, bgWaveHeight)
  bgSine.fillH = height - (1 / 3) * height
  bgSine.color = color(design.Vibe1)

  bgSquare = new SquareWave(0, (1 / 3) * height + waveDistance, width, bgWaveHeight)
  bgSquare.fillH = height - (1 / 3) * height
  bgSquare.color = color(design.Vibe2)

  bgSquare.y = (1 / 3) * height + waveDistance * design["This Creature Is High"]

  bgTriangle = new TriangleWave(0, (1 / 3) * height + waveDistance * 2, width, bgWaveHeight)
  bgTriangle.fillH = height - (1 / 3) * height
  bgTriangle.color = color(design.Vibe3)

  bgTriangle.y = (1 / 3) * height + 2 * waveDistance * design["This Creature Is High"]

  bgSawtooth = new SawtoothWave(0, (1 / 3) * height + waveDistance * 3, width, bgWaveHeight)
  bgSawtooth.fillH = height - (1 / 3) * height
  bgSawtooth.color = color(design.Vibe4)

  bgSawtooth.y = (1 / 3) * height + 3 * waveDistance * design["This Creature Is High"]

  setBGWaveParams(bgSawtooth, design)
  setBGWaveParams(bgTriangle, design)
  setBGWaveParams(bgSquare, design)
  setBGWaveParams(bgSine, design)

  return { ...design, bgSine: bgSine, bgSquare: bgSquare, bgTriangle: bgTriangle, bgSawtooth: bgSawtooth }
}

function checkParams(design) {
  if (abs(design.Energy) <= floatDelta) {
    design.Energy = 0
  }
}
function setWaveParams(wave, design) {
  wave.amplitude = design["Saddy<, >Happy"]
  wave.waveNumber = design["Introvert<,>Extravert"]
  wave.pulse = TWO_PI * design.Energy
}

function setBGWaveParams(wave, design) {
  wave.amplitude = design["Saddy<, >Happy"]
  wave.waveNumber = design["Introvert<,>Extravert"]
  wave.pulse = TWO_PI * design.Energy
}

function displayBGWaves(design) {
  design.bgSine.display()
  design.bgSquare.display()
  design.bgTriangle.display()
  design.bgSawtooth.display()
}
