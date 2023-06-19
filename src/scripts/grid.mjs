export default function grid() {
  const newSquares = [];

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const squareSize = 20;
  const numRows = Math.floor(windowHeight / squareSize);
  const numCols = Math.floor(windowWidth / squareSize);
  const totalSquares = numRows * numCols;

  function handleMouseEnter(e) {
    e.target.className = "square bright-square";
    e.target.style.zIndex = 1;
  }

  function handleMouseLeave(e) {
    e.target.className = "square";
    e.target.style.zIndex = 0;
  }

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.className = "square";
    square.addEventListener("mouseenter", handleMouseEnter);
    square.addEventListener("mouseleave", handleMouseLeave);
    newSquares.push(square);
    for (let square of newSquares) {
      document.querySelector(".grid").appendChild(square);
    }
  }
}
window.addEventListener("load", grid);

// TODO make glowing squares dance with a song!
