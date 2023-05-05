const background = document.getElementById("background")!;
const content = document.getElementById("content")!;

window.addEventListener("scroll", function() {
  let scrollPosition = window.pageYOffset;
  background.style.transform = "translate3d(0, " + scrollPosition/2 + "px, 0)";
  content.style.transform = "translate3d(0, -" + scrollPosition/3 + "px, 0) rotateZ(" + scrollPosition/10 + "deg)";
});