let gui

let bgSine
let bgSquare
let bgTriangle
let bgSawtooth
let bgWaveHeight
let waveDistance
let floatDelta = 0.5
let colorchange = 100
time = 0

let p5Caneva
let btnSaveMyFirstAvatar
let btnSaveAnotherAvatar
let userName
let userID

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
const ref = database.ref("db")

const resgitreNewAvatar = (username, avatarParams) => {
  ref.child(`waves/${username}`).once("value", snapshot => {
    if (snapshot.exists()) {
      alert(`please choose another username`)
    } else {
      database.ref(`db/waves/${username}`).set(avatarParams)
      alert(`You avatar is saved`)
    }
  })
}

const addNewAvatar = (username, avatarParams) => {
  database.ref(`db/waves/${username}`).once("value", snapshot => {
    if (snapshot.exists()) {
      ref.child(`waves/${username}/avatars`).push(avatarParams)
      alert(`You avatar is saved`)
    } else {
      alert(`This username "${username}"  doesn't exist`)
      return
    }
  })
}

const getAvatarsByUserName = username => {
  return database.ref("waves")
}

const getAllAvatars = () => database.ref("waves")

const FirebaseDatabaseService = {
  resgitreNewAvatar,
  addNewAvatar,
  getAvatarsByUserName,
  getAllAvatars
}

const PARAMS = {
  Amplitude: 0.84,
  WaveNumber: 2.01,
  Pulsation: 0.0,
  strokeWeight: 6,
  WaveDistance: 1,
  WCSin: 100,
  Color: "#FFFFFF"
}

//======================================================================
function setup() {
  username = document.querySelector("#username")

  function saveAnotherAvatar() {
    if (username.value) {
      FirebaseDatabaseService.addNewAvatar(username.value, PARAMS)
    }
  }

  async function saveMyFirstAvatar() {
    if (username.value) {
      FirebaseDatabaseService.resgitreNewAvatar(username.value, { avatars: [PARAMS] })
    }
  }

  p5Caneva = createCanvas((3 / 5) * windowHeight, (3 / 5) * windowHeight)
  p5Caneva.parent("sketch")
  p5Caneva.style = setupGui()

  btnSaveMyFirstAvatar = createButton("Save My First Avatar")
  btnSaveMyFirstAvatar.addClass("btn")
  btnSaveMyFirstAvatar.addClass("btn-primary")
  btnSaveMyFirstAvatar.addClass("mr-2 mt-2")
  btnSaveMyFirstAvatar.parent("sketch-form")
  btnSaveMyFirstAvatar.mousePressed(saveMyFirstAvatar)

  btnSaveAnotherAvatar = createButton("Save Another Avatar")
  btnSaveAnotherAvatar.addClass("btn")
  btnSaveAnotherAvatar.addClass("btn-primary")
  btnSaveAnotherAvatar.addClass("mr-2 mt-2")
  btnSaveAnotherAvatar.parent("sketch-form")
  btnSaveAnotherAvatar.mousePressed(saveAnotherAvatar)

  setupBGWaves()
  colorMode(HSB, 360, 100, 100)

  //=====================================================================
  sketch = document.querySelector("#sketch")
  guidome = document.querySelector("#gui")
  sketch.appendChild(guidome)
}

function draw() {
  background(PARAMS.Color)

  updateBGWaves()
  checkParams()

  displayBGWaves()
  changeColor()
  noLoop()

  loop()
}

function setupGui() {
  gui = new dat.GUI()
  gui.domElement.id = "gui"
  params = gui.addFolder("Dancing avatar parameters")
  params.add(PARAMS, "Amplitude").min(0).max(1)
  params.add(PARAMS, "WaveNumber").min(0).max(10)
  params.add(PARAMS, "Pulsation").min(-5).max(5)
  params.add(PARAMS, "strokeWeight").min(0).max(20)
  params.add(PARAMS, "WaveDistance").min(0).max(1.5)
  params.add(PARAMS, "WCSin").min(0).max(360)
  params.addColor(PARAMS, "Color").onChange(update)
}

var update = function () {
  console.log(PARAMS.color)
  background(3)
}

function saveClicked() {
  console.log(PARAMS.Amplitude)
  console.log(PARAMS.WaveNumber)
  console.log(PARAMS.Pulsation)
  console.log(PARAMS.strokeWeight)
  console.log(PARAMS.WaveDistance)
  console.log(PARAMS.WCSin)
  console.log(PARAMS.color)
}

function setupBGWaves() {
  colorchange = PARAMS.WCSin

  bgWaveHeight = (1 / 6) * height
  waveDistance = (1 / 6) * height
  let alpha = 255
  bgSine = new SineWave(0, (1 / 3) * height, width, bgWaveHeight)
  bgSine.fill = true
  bgSine.fillH = height - (1 / 3) * height
  bgSine.color = color(colorchange, 206, 0, alpha)
  bgSquare = new SquareWave(0, (1 / 3) * height + waveDistance, width, bgWaveHeight)
  bgSquare.fill = true
  bgSquare.fillH = height - (1 / 3) * height
  bgSquare.color = color(0, 0, 255, alpha)
  bgTriangle = new TriangleWave(0, (1 / 3) * height + waveDistance * 2, width, bgWaveHeight)
  bgTriangle.fill = true
  bgTriangle.fillH = height - (1 / 3) * height
  bgTriangle.color = color(65, 105, 225, alpha)
  bgSawtooth = new SawtoothWave(0, (1 / 3) * height + waveDistance * 3, width, bgWaveHeight)
  bgSawtooth.fill = true
  bgSawtooth.fillH = height - (1 / 3) * height
  bgSawtooth.color = color(255, 255, 255, alpha)
}

function preload() {}
//======================================================================
function checkParams() {
  if (abs(PARAMS.Pulsation) <= floatDelta) {
    PARAMS.Pulsation = 0
  }
}
function setWaveParams(wave) {
  wave.amplitude = PARAMS.Amplitude
  wave.waveNumber = PARAMS.WaveNumber
  wave.pulse = TWO_PI * PARAMS.Pulsation
  wave.lineWidth = PARAMS.strokeWeight
}

function setBGWaveParams(wave) {
  wave.amplitude = PARAMS.Amplitude
  wave.waveNumber = PARAMS.WaveNumber
  wave.pulse = TWO_PI * PARAMS.Pulsation
  //wave.y = PARAMS.WaveDistance
}

function setBGWaveDist() {
  bgSquare.y = (1 / 3) * height + waveDistance * PARAMS.WaveDistance
  bgTriangle.y = (1 / 3) * height + 2 * waveDistance * PARAMS.WaveDistance
  bgSawtooth.y = (1 / 3) * height + 3 * waveDistance * PARAMS.WaveDistance
}

function updateBGWaves() {
  setBGWaveParams(bgSine)
  setBGWaveParams(bgSquare)
  setBGWaveParams(bgTriangle)
  setBGWaveParams(bgSawtooth)
  setBGWaveDist()
}

function displayBGWaves() {
  bgSine.display()
  bgSquare.display()
  bgTriangle.display()
  bgSawtooth.display()
}
function changeColor() {
  colorchange = PARAMS.WCSin
  bgSine.color = color(colorchange, 100, 100, alpha)
  bgSquare.color = color(colorchange - 100, 100, 100, alpha)
  bgTriangle.color = color(360 - colorchange, 100, 100, alpha)
  bgSawtooth.color = color(460 - colorchange, 100, 100, alpha)
}
