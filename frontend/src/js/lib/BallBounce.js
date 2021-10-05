import p5 from 'p5';

export const BallBounce = ( p ) => {

  let balls = [];
  const size = 50;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    for(let i = 0; i < 50; i++) {
      balls.push({positionX: p.windowWidth/2, positionY: p.windowHeight/2, speedX: p.random(8), speedY: p.random(8), colorR: p.random(255), colorG: p.random(255), colorB: p.random(255)});
    }
  }

  p.draw = () => {
    p.background(220, 60);
    p.noStroke();

    for(let i = 0; i < 50; i++) {
      let ball = balls[i];
      p.fill(ball.colorR, ball.colorG, ball.colorB);
      ball.positionX = ball.positionX + ball.speedX;
      ball.positionY = ball.positionY + ball.speedY;
      if (ball.positionX < 0 + size*0.5 || ball.positionX > p.windowWidth - size*0.5) {
        ball.speedX = ball.speedX * -1;
      }
      if (ball.positionY < 0 + size*0.5 || ball.positionY > p.windowHeight - size*0.5) {
        ball.speedY = ball.speedY * -1;
      }
      p.ellipse(ball.positionX, ball.positionY, size, size);
    }
  }
};

const ball = new p5(BallBounce, document.body);
