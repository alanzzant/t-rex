import {getRandomValue} from './Utils.js'

class Cactus {
  constructor(initialX, initialY, dx, expand = 0, img) {
    this.x = initialX
    this.y = initialY
    this.dx = dx
    this.expand = expand
    this.width = 17 + this.expand
    this.height = 35 + this.expand
    this.wichCactus = getRandomValue(0, 5)

    this.img = img
  }

  update(ctx) {
    this.x -= this.dx

    this.draw(ctx)
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      228 + this.wichCactus * (this.width - this.expand),
      2,
      this.width - this.expand,
      this.height - this.expand,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }
}

export default Cactus