class Floor {
  constructor(initialX, initialY, dx) {
    this.x = initialX
    // this.initialX = initialX
    this.y = initialY
    this.dx = dx
    this.height = 14
    this.width = 1204

    this.img = new Image()
    this.img.src = '../res/sprite.png'
  }

  update(ctx) {
    this.x -= this.dx
    
    this.draw(ctx)
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      0,
      54,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  getX() {
    return this.x
  }

  setX(x) {
    this.x = x
  }

  getImage() {
    return this.img
  }
}

export default Floor