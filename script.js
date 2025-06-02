let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
  document.addEventListener('mousemove', (e) => {
    if (!this.rotating) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;
    }

    const dirX = e.clientX - this.mouseTouchX;
    const dirY = e.clientY - this.mouseTouchY;
    const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
    const dirNormalizedX = dirX / dirLength;
    const dirNormalizedY = dirY / dirLength;

    const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
    let degrees = 180 * angle / Math.PI;
    degrees = (360 + Math.round(degrees)) % 360;
    if (this.rotating) {
      this.rotation = degrees;
    }

    if (this.holdingPaper) {
      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }
  });

  // 👇 Mouse events
  paper.addEventListener('mousedown', (e) => {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    paper.style.zIndex = highestZ++;
    this.mouseTouchX = this.mouseX = e.clientX;
    this.mouseTouchY = this.mouseY = e.clientY;
    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;

    if (e.button === 2) {
      this.rotating = true;
    }
  });

  // 👇 Touch events (for mobile)
  paper.addEventListener('touchstart', (e) => {
    this.holdingPaper = true;
    paper.style.zIndex = highestZ++;
    this.mouseTouchX = this.mouseX = e.touches[0].clientX;
    this.mouseTouchY = this.mouseY = e.touches[0].clientY;
    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;
  });

  document.addEventListener('touchmove', (e) => {
    if (this.holdingPaper) {
      this.mouseX = e.touches[0].clientX;
      this.mouseY = e.touches[0].clientY;
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    }
  });

  window.addEventListener('mouseup', () => {
    this.holdingPaper = false;
    this.rotating = false;
  });

  window.addEventListener('touchend', () => {
    this.holdingPaper = false;
    this.rotating = false;
  });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

function revealSecret(paper) {
  paper.classList.toggle('revealed');
}
