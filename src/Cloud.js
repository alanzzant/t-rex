class Cloud {
  constructor(initialX, initialY, dx, img) {
    this.x = initialX
    this.y = initialY
    this.width = 46
    this.height = 13
    this.dx = dx

    this.img = img
  }

  update(ctx) {
    this.x -= this.dx

    this.draw(ctx)
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      86,
      2,
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

  getWidth() {
    return this.width
  }

  getImage() {
    return this.img
  }
}

export default Cloud