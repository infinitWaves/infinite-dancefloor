class Wave {
  constructor(x, y, w, h) {
    console.log("In constructor")
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = p5_sk.color(0, 0, 0)
    this.lineWidth = 10
    this.amplitude = 1
    this.waveNumber = 2
    this.pulse = p5_sk.TWO_PI * 0.0 // 2 * PI * nombre de pulsation par seconde
    this.phase = (3 * p5_sk.PI) / 2
    this.lastUpdate = this.getTime()
    this.fill = true
    this.fillH = 0
  }

  getTime() {
    let d = new Date()
    return d.getTime()
  }

  getAngle(x) {
    return p5_sk.map(x, 0, this.w, this.phase, p5_sk.TWO_PI * this.waveNumber + this.phase)
  }

  getWaveValue(angle) {
    return this.amplitude * p5_sk.sin(angle)
  }

  getYValue(waveValue) {
    return p5_sk.map(waveValue, -1, 1, 0, this.h)
  }

  update() {
    let now = this.getTime()
    let elapsed = now - this.lastUpdate
    this.lastUpdate = now
    this.phase += this.pulse * (elapsed / 1000)
    this.phase %= p5_sk.TWO_PI
  }

  display() {
    this.update()
    p5_sk.push()
    p5_sk.translate(this.x, this.y)

    if (!this.fill) {
      p5_sk.noFill()
      p5_sk.stroke(this.color)
      p5_sk.strokeWeight(this.lineWidth)
    } else {
      p5_sk.noStroke()
      p5_sk.fill(this.color)
    }
    p5_sk.beginShape()
    for (let x = 0; x < this.w; x++) {
      p5_sk.vertex(x, this.getYValue(this.getWaveValue(this.getAngle(x))))
    }
    if (this.fill) {
      p5_sk.vertex(this.w, this.fillH)
      p5_sk.vertex(0, this.fillH)
      p5_sk.endShape(p5_sk.CLOSE)
    } else {
      p5_sk.endShape()
    }
    p5_sk.noFill()
    p5_sk.pop()
  }
}

//======================================================================

class SineWave extends Wave {
  getWaveValue(angle) {
    return this.amplitude * p5_sk.sin(angle)
  }
}

//======================================================================

class SquareWave extends Wave {
  constructor(x, y, w, h) {
    super(x, y, w, h)
    this.phase = -0.005
  }

  getWaveValue(angle) {
    let newAngle = angle % p5_sk.TWO_PI
    if (newAngle > p5_sk.PI || (newAngle < 0 && newAngle > -p5_sk.PI)) {
      return -1 * this.amplitude
    } else {
      return 1 * this.amplitude
    }
  }
}

//======================================================================

class TriangleWave extends Wave {
  constructor(x, y, w, h) {
    super(x, y, w, h)
    this.phase = p5_sk.PI / 2 - 0.01
  }

  getWaveValue(angle) {
    //LA FONCTION DE L'ONDE QUI VA DEFINIR onde, PRENDS UN ANGLE EN PARAMETRE ET RETOURNE UNE VALEURE ENTRE -1 ET 1
    return ((2 * this.amplitude) / p5_sk.PI) * p5_sk.asin(p5_sk.sin(angle))
  }
}

//======================================================================

class SawtoothWave extends Wave {
  constructor(x, y, w, h) {
    super(x, y, w, h)
    this.phase = -0.01
  }

  getWaveValue(angle) {
    return ((2 * this.amplitude) / p5_sk.PI) * p5_sk.atan(1 / p5_sk.tan(angle / 2))
  }
}

//======================================================================
