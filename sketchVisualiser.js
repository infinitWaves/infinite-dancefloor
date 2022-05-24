let avatars = []
let sketches = []
let p5_sk

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

let sketch = p => {
  p.bgSine
  p.bgSquare
  p.bgTriangle
  p.bgSawtooth
  p.p5Caneva
  p.design

  p.setup = () => {
    console.log(p.height)
    console.log(p.windowHeight)
    p.p5Caneva = p.createCanvas((3 / 5) * p.windowHeight, (3 / 5) * p.windowHeight)
    p.p5Caneva.parent("sketch-visualiser")
  }

  p.draw = () => {
    p.background(p.design.Aura)
    p.bgSine.display()
    p.bgSquare.display()
    p.bgTriangle.display()
    p.bgSawtooth.display()
  }
}

database.ref("db/waves").on(
  "value",
  snapshot => {
    Object.values(snapshot.val()).forEach(avat =>
      Object.values(avat).forEach(params =>
        Object.values(params).forEach(design => {
          console.log(design)
          avatars.push(design)
        })
      )
    )

    avatars.forEach(design => {
      p5_sk = new p5(sketch)

      p5_sk.design = design
      console.log(design)

      let bgWaveHeight = (-1 / 3) * 562.2
      let waveDistance = (1 / 6) * 562.2

      p5_sk.bgSine = new SineWave(0, (1 / 3) * 562.2, 562.2, bgWaveHeight)
      p5_sk.bgSine.fillH = 562.2 - (1 / 3) * 562.2
      p5_sk.bgSine.color = p5_sk.color(design.Vibe1)
      p5_sk.bgSine.fill = design["Full Vibe1"]

      p5_sk.bgSquare = new SquareWave(0, (1 / 3) * 562.2 + waveDistance, 562.2, bgWaveHeight)
      p5_sk.bgSquare.fillH = 562.2 - (1 / 3) * 562.2
      p5_sk.bgSquare.color = p5_sk.color(design.Vibe2)
      p5_sk.bgSquare.fill = design["Full Vibe2"]

      p5_sk.bgSquare.y = (1 / 3) * 562.2 + waveDistance * design["This Creature Is High"]

      p5_sk.bgTriangle = new TriangleWave(0, (1 / 3) * 562.2 + waveDistance * 2, 562.2, bgWaveHeight)
      p5_sk.bgTriangle.fillH = 562.2 - (1 / 3) * 562.2
      p5_sk.bgTriangle.color = p5_sk.color(design.Vibe3)
      p5_sk.bgTriangle.fill = design["Full Vibe3"]

      p5_sk.bgTriangle.y = (1 / 3) * 562.2 + 2 * waveDistance * design["This Creature Is High"]

      p5_sk.bgSawtooth = new SawtoothWave(0, (1 / 3) * 562.2 + waveDistance * 3, 562.2, bgWaveHeight)
      p5_sk.bgSawtooth.fillH = 562.2 - (1 / 3) * 562.2
      p5_sk.bgSawtooth.color = p5_sk.color(design.Vibe4)
      p5_sk.bgSawtooth.fill = design["Full Vibe4"]

      p5_sk.bgSawtooth.y = (1 / 3) * 562.2 + 3 * waveDistance * design["This Creature Is High"]

      setBGWaveParams(p5_sk.bgSawtooth, design)
      setBGWaveParams(p5_sk.bgTriangle, design)
      setBGWaveParams(p5_sk.bgSquare, design)
      setBGWaveParams(p5_sk.bgSine, design)
      sketches.push(p5_sk)
    })
  },
  errorObject => {
    console.log("The read failed: " + errorObject.name)
  }
)

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
