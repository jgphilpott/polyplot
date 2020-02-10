$(document).ready(function() {

  // Credit: https://codepen.io/jacquelinclem/pen/udnwI
  // GitHub: https://github.com/jacquelinclem
  function summonParticleWeb() {

    particles = []
    particleCount = 42
    colors = [red, orange, yellow, green, blue, purple, pink]

    canvas = document.getElementById("canvas")
    dpi = window.devicePixelRatio || 1

    context = canvas.getContext("2d")
    context.scale(dpi, dpi)

    function Particle() {

      this.radius = Math.round((Math.random() * 3) + 5)
      this.x = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("width").slice(0, -2) * dpi) - this.radius + 1) + this.radius))
      this.y = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * dpi) - this.radius + 1) + this.radius))
      this.speedx = Math.round((Math.random() * 201) + 0) / 100
      this.speedy = Math.round((Math.random() * 201) + 0) / 100
      this.color = colors[Math.floor(Math.random() * colors.length)]

      switch (Math.round(Math.random() * colors.length)) {

        case 1:
          this.speedx *= 1
          this.speedy *= 1
          break

        case 2:
          this.speedx *= -1
          this.speedy *= 1
          break

        case 3:
          this.speedx *= 1
          this.speedy *= -1
          break

        case 4:
          this.speedx *= -1
          this.speedy *= -1
          break

      }

      this.move = function() {

        context.beginPath()
        context.globalCompositeOperation = "source-over"
        context.fillStyle = this.color
        context.globalAlpha = 1
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fill()
        context.closePath()

        this.x = this.x + this.speedx
        this.y = this.y + this.speedy

        if (this.x <= 0 + this.radius) {

          this.speedx *= -1

        }

        if (this.x >= canvas.width - this.radius) {

          this.speedx *= -1

        }

        if (this.y <= 0 + this.radius) {

          this.speedy *= -1

        }

        if (this.y >= canvas.height - this.radius) {

          this.speedy *= -1

        }

        for (var j = 0; j < particleCount; j++){

          particleActuelle = particles[j]
          yd = particleActuelle.y - this.y
          xd = particleActuelle.x - this.x
          d  = Math.sqrt(xd * xd + yd * yd)

          if (d < 200) {

            context.beginPath()
            context.globalAlpha = (200 - d) / (200 - 0)
            context.globalCompositeOperation = "destination-over"
            context.lineWidth = 1
            context.moveTo(this.x, this.y)
            context.lineTo(particleActuelle.x, particleActuelle.y)
            context.strokeStyle = this.color
            context.lineCap = "round"
            context.stroke()
            context.closePath()

          }

        }

      }

    }

    function dpiFix() {

      styleWidth = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)
      styleHeight = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2)

      canvas.setAttribute("width", styleWidth * dpi)
      canvas.setAttribute("height", styleHeight * dpi)

    }

    for (var i = 0; i < particleCount; i++) {

      dpiFix()
      particle = new Particle()
      particles.push(particle)

    }

    function animate() {

      dpiFix()

      context.clearRect(0, 0, canvas.width, canvas.height)

      for (var i = 0; i < particleCount; i++) {

        particles[i].move()

      }

      window.requestAnimFrame = function() {

        return (

          window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||

          function(callback) {

            window.setTimeout(callback, 1000 / 60)

          }

        )

      }()

      requestAnimFrame(animate)

    }

    animate()

  }

  summonParticleWeb()

})
