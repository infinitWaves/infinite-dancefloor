let avatars = []
let sketches = []
let p5_sk
let SKETCH_SIZE = 114
let GRID_CELL_SIZE = 111
let user_avatars = []
const input_user = document.querySelector("#input-find-my-avatars")
const button_find = document.querySelector("#button-find-my-avatars")
const sketches_container = document.querySelector("#dancing_floor")
const user_span = document.querySelector("#span-user")
let mySound = new Audio("ondes.mp4")
mySound.loop = true
mySound.play()

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

const getUserAvatars = username => {
  console.log(username)
  ref.child(`waves/${username}`).once("value", snapshot => {
    if (snapshot.exists()) {
      user_span.style.display = "block"
      user_span.innerHTML = `DaNCING WAVES OF ${input_user.value}`
      displayMyAvatars(username)
    } else {
      alert(`This user doesn't exist`)
    }
  })
}

let sketch = p => {
  p.bgSine
  p.bgSquare
  p.bgTriangle
  p.bgSawtooth
  p.p5Caneva
  p.design

  p.setup = () => {
    p.p5Caneva = p.createCanvas(GRID_CELL_SIZE, GRID_CELL_SIZE)
    p.p5Caneva.parent("dancing_floor")
  }

  p.draw = () => {
    p.background(p.design.Aura)
    p.bgSine.display()
    p.bgSquare.display()
    p.bgTriangle.display()
    p.bgSawtooth.display()
  }
}

function setWaveParams(wave, design) {
  wave.amplitude = design["Saddy<, >Happy"]
  wave.waveNumber = design["Introvert<,>Extravert"]
  wave.pulse = p5_sk.TWO_PI * design.Energy
}

function setBGWaveParams(wave, design) {
  wave.amplitude = design["Saddy<, >Happy"]
  wave.waveNumber = design["Introvert<,>Extravert"]
  wave.pulse = p5_sk.TWO_PI * design.Energy
}

const displayMyAvatars = username => {
  sketches_container.innerHTML = ""
  user_avatars = []
  database.ref(`db/waves/${username}`).on(
    "value",
    snapshot => {
      Object.values(snapshot.val()).forEach(avat =>
        Object.values(avat).forEach(design => {
          user_avatars.push(design)
        })
      )

      user_avatars.forEach(design => {
        p5_sk = new p5(sketch)
        p5_sk.design = design
        sketches.push(p5_sk)

        let bgWaveHeight = (-1 / 3) * SKETCH_SIZE
        let waveDistance = (1 / 6) * SKETCH_SIZE

        p5_sk.bgSine = new SineWave(0, (1 / 3) * SKETCH_SIZE, SKETCH_SIZE, bgWaveHeight, sketches[sketches.length - 1])
        p5_sk.bgSine.fillH = SKETCH_SIZE - (1 / 3) * SKETCH_SIZE
        p5_sk.bgSine.color = p5_sk.color(design.Vibe1)
        p5_sk.bgSine.fill = design["Full Vibe1"]
        p5_sk.bgSquare = new SquareWave(0, (1 / 3) * SKETCH_SIZE + waveDistance, SKETCH_SIZE, bgWaveHeight, sketches[sketches.length - 1])
        p5_sk.bgSquare.fillH = SKETCH_SIZE - (1 / 3) * SKETCH_SIZE
        p5_sk.bgSquare.color = p5_sk.color(design.Vibe2)
        p5_sk.bgSquare.fill = design["Full Vibe2"]

        p5_sk.bgSquare.y = (1 / 3) * SKETCH_SIZE + waveDistance * design["This Creature Is High"]

        p5_sk.bgTriangle = new TriangleWave(0, (1 / 3) * SKETCH_SIZE + waveDistance * 2, SKETCH_SIZE, bgWaveHeight, sketches[sketches.length - 1])
        p5_sk.bgTriangle.fillH = SKETCH_SIZE - (1 / 3) * SKETCH_SIZE
        p5_sk.bgTriangle.color = p5_sk.color(design.Vibe3)
        p5_sk.bgTriangle.fill = design["Full Vibe3"]

        p5_sk.bgTriangle.y = (1 / 3) * SKETCH_SIZE + 2 * waveDistance * design["This Creature Is High"]

        p5_sk.bgSawtooth = new SawtoothWave(0, (1 / 3) * SKETCH_SIZE + waveDistance * 3, SKETCH_SIZE, bgWaveHeight, sketches[sketches.length - 1])
        p5_sk.bgSawtooth.fillH = SKETCH_SIZE - (1 / 3) * SKETCH_SIZE
        p5_sk.bgSawtooth.color = p5_sk.color(design.Vibe4)
        p5_sk.bgSawtooth.fill = design["Full Vibe4"]

        p5_sk.bgSawtooth.y = (1 / 3) * SKETCH_SIZE + 3 * waveDistance * design["This Creature Is High"]

        setBGWaveParams(p5_sk.bgSawtooth, design)
        setBGWaveParams(p5_sk.bgTriangle, design)
        setBGWaveParams(p5_sk.bgSquare, design)
        setBGWaveParams(p5_sk.bgSine, design)
      })
    },
    errorObject => {
      console.log("The read failed: " + errorObject.name)
    }
  )
}

const displayAllAvatars = () => {
  sketches_container.innerHTML = ""
  avatars = []
  database.ref("db/waves").on(
    "value",
    snapshot => {
      Object.values(snapshot.val()).forEach(avat =>
        Object.values(avat).forEach(params =>
          Object.values(params).forEach(design => {
            avatars.push(design)
          })
        )
      )

      avatars.forEach(design => {
        p5_sk = new p5(sketch)

        p5_sk.design = design

        sketches.push(p5_sk)

        let bgWaveHeight = (-1 / 3) * SKETCH_SIZE
        let waveDistance = (1 / 6) * SKETCH_SIZE

        p5_sk.bgSine = new SineWave(0, (1 / 3) * SKETCH_SIZE, SKETCH_SIZE, bgWaveHeight, sketches[sketches.length - 1])
        p5_sk.bgSine.fillH = SKETCH_SIZE - (1 / 3) * SKETCH_SIZE
        p5_sk.bgSine.color = p5_sk.color(design.Vibe1)
        p5_sk.bgSine.fill = design["Full Vibe1"]
        p5_sk.bgSquare = new SquareWave(0, (1 / 3) * SKETCH_SIZE + waveDistance, SKETCH_SIZE, bgWaveHeight, sketches[sketches.length - 1])
        p5_sk.bgSquare.fillH = SKETCH_SIZE - (1 / 3) * SKETCH_SIZE
        p5_sk.bgSquare.color = p5_sk.color(design.Vibe2)
        p5_sk.bgSquare.fill = design["Full Vibe2"]

        p5_sk.bgSquare.y = (1 / 3) * SKETCH_SIZE + waveDistance * design["This Creature Is High"]

        p5_sk.bgTriangle = new TriangleWave(0, (1 / 3) * SKETCH_SIZE + waveDistance * 2, SKETCH_SIZE, bgWaveHeight, sketches[sketches.length - 1])
        p5_sk.bgTriangle.fillH = SKETCH_SIZE - (1 / 3) * SKETCH_SIZE
        p5_sk.bgTriangle.color = p5_sk.color(design.Vibe3)
        p5_sk.bgTriangle.fill = design["Full Vibe3"]

        p5_sk.bgTriangle.y = (1 / 3) * SKETCH_SIZE + 2 * waveDistance * design["This Creature Is High"]

        p5_sk.bgSawtooth = new SawtoothWave(0, (1 / 3) * SKETCH_SIZE + waveDistance * 3, SKETCH_SIZE, bgWaveHeight, sketches[sketches.length - 1])
        p5_sk.bgSawtooth.fillH = SKETCH_SIZE - (1 / 3) * SKETCH_SIZE
        p5_sk.bgSawtooth.color = p5_sk.color(design.Vibe4)
        p5_sk.bgSawtooth.fill = design["Full Vibe4"]

        p5_sk.bgSawtooth.y = (1 / 3) * SKETCH_SIZE + 3 * waveDistance * design["This Creature Is High"]

        setBGWaveParams(p5_sk.bgSawtooth, design)
        setBGWaveParams(p5_sk.bgTriangle, design)
        setBGWaveParams(p5_sk.bgSquare, design)
        setBGWaveParams(p5_sk.bgSine, design)
      })
    },
    errorObject => {
      console.log("The read failed: " + errorObject.name)
    }
  )
}

input_user.addEventListener("change", e => {
  if (input_user.value == "") {
    user_span.style.display = "none"
    displayAllAvatars()
  }
})

input_user.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    console.log(input_user.value)
    if (input_user.value == "") {
      user_span.style.display = "none"
      displayAllAvatars()
    } else {
      getUserAvatars(input_user.value)
    }
  }
})

button_find.addEventListener("click", e => {
  if (input_user.value != "") {
    user_span.style.display = "block"
    user_span.innerHTML = `DaNCING WAVES OF ${input_user.value}`
    displayMyAvatars(input_user.value)
  }
})

displayAllAvatars()
user_span.style.display = "none"
