onload = () => {
  document.body.classList.remove("container");
  const overlay = document.getElementById("overlay");
  let overlayVisible = false;

  document.addEventListener("click", function (e) {
    if (!overlayVisible) {
      overlay.classList.add("active");
      overlayVisible = true;
    } else {
      const isClickInside = overlay.contains(e.target);
      if (isClickInside) return;
      overlay.classList.remove("active");
      overlayVisible = false;
    }
  });
  const botaoNao = document.getElementById("nao");
  if (botaoNao) {
    botaoNao.addEventListener("click", function (e) {
      e.stopPropagation(); // Impede que a overlay seja fechada
      const maxX = window.innerWidth - botaoNao.offsetWidth;
      const maxY = window.innerHeight - botaoNao.offsetHeight;
      const randX = Math.random() * maxX;
      const randY = Math.random() * maxY;
      botaoNao.style.position = "absolute";
      botaoNao.style.left = randX + "px";
      botaoNao.style.top = randY + "px";
    });
  }
};

document.getElementById("sim").addEventListener("click", function () {
  window.location.href = "main.html"; // ou pode ser uma URL completa
});
