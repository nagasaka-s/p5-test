import p5 from 'p5';

export const Sketch = ( p ) => {

  const x = 50;
  const y = 100;

  let prevX = null;
  let prevY = null;
  let button;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
    p.strokeWeight(10);
    p.noStroke();
    p.stroke(255, 0, 0);
    button = p.createButton('changeColor');
    button.mousePressed(p.changeColor);
    p.rect(120, 15, 10, 15);
  }

  p.draw = () => {
    if(p.mouseIsPressed) {
      if(prevX !== null) {
        p.line(prevX, prevY, p.mouseX, p.mouseY);
      }
      prevX = p.mouseX;
      prevY = p.mouseY;
    } else {
      prevX = null;
      prevY = null;
    }

    if(p.keyIsPressed) {
      if(p.keyCode === p.ESCAPE) {
        p.background(0);
        p.rect(120, 15, 10, 15);
      }
    }
  }

  p.changeColor = () => {
    p.stroke(p.random(255), p.random(255), p.random(255));
    p.rect(120, 15, 10, 15);
  }
};

const sketch = new p5(Sketch, document.body);
