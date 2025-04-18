document.getElementById("btn").addEventListener("click", () => {
  const intro = document.getElementById("intro");
  const quiz = document.getElementById("quiz");

  intro.classList.add("hidden");
  setTimeout(() => {
    intro.style.display = "none";
    quiz.style.display = "flex";
    quiz.classList.remove("hidden");
    quiz.classList.add("show");
  }, 800);
});

const mensagensYudi = [
  "Boa, mas outra pessoa poderia saber",
  "Pode ser que seja você, mas eu tô de olho 😑",
  "Esse dia foi íncrivel 🥹",
  "Essa é mais específica, talvez seja você mesmo",
  "Essa é difícil, mas dá pra chutar certo",
  "Essa é bem pessoal, estou começando a acreditar que seja você",
  "Agora sim, com certeza é você minha princesa 🥰",
];

const mensagensIsa = [
  "Você deveria saber... 🤨",
  "Acontece esquecer, mas era pra você saber",
  "Se for você, saiba que estou muito triste 😔",
  "Você sabe essa, mas dá pra errar a potência 🫣",
  "Não acredito que você tenha errado essa... 😵",
  "Essa não dava pra errar",
  "Definitivamente não é você.",
];

const FINAL_INDEX = 6;

function setupOptionsForQuestion(questionEl, index) {
  const options = questionEl.querySelectorAll(".option");

  options.forEach((option) => {
    option.addEventListener("click", () => {
      if (option.classList.contains("selected")) return;

      const isCorrect = option.getAttribute("data-correct") === "true";

      options.forEach((opt) => {
        opt.style.pointerEvents = "none";
        opt.classList.remove("selected");
        const existingIcon = opt.querySelector(".icon");
        if (existingIcon) existingIcon.remove();
      });

      option.classList.add("selected");

      const icon = document.createElement("span");
      icon.classList.add("icon");
      icon.textContent = isCorrect ? "✓" : "✗";
      option.appendChild(icon);
      option.classList.add(isCorrect ? "correct" : "incorrect");

      const yudi = document.getElementById("yudi");
      const isa = document.getElementById("isa");
      const bubbleYudi = document.getElementById("bubble-yudi");
      const bubbleIsa = document.getElementById("bubble-isa");

      yudi.classList.add("hidden");
      isa.classList.add("hidden");
      bubbleYudi.classList.add("hidden");
      bubbleIsa.classList.add("hidden");

      if (isCorrect) {
        yudi.classList.remove("hidden");
        bubbleYudi.classList.remove("hidden");
        bubbleYudi.textContent = mensagensYudi[index] || mensagensYudi[0];

        setTimeout(() => {
          yudi.classList.add("hidden");
          bubbleYudi.classList.add("hidden");

          if (index === FINAL_INDEX) {
            fadeOutToFinal();
          } else {
            goToNextQuestion();
          }
        }, 2500);
      } else {
        isa.classList.remove("hidden");
        bubbleIsa.classList.remove("hidden");
        bubbleIsa.textContent = mensagensIsa[index] || mensagensIsa[0];

        showRetryButton(questionEl);
      }
    });
  });
}

function goToNextQuestion() {
  const current = document.querySelector(".question.active");
  const next = current.nextElementSibling;

  if (next && next.classList.contains("question")) {
    current.classList.add("fade-out");
    next.classList.add("fade-in");

    setTimeout(() => {
      current.classList.remove("active", "fade-out");
      next.classList.remove("fade-in");
      next.classList.add("active");
    }, 500);
  }
}

function showRetryButton(parentElement) {
  if (document.getElementById("retry-btn")) return;

  const retryBtn = document.createElement("button");
  retryBtn.id = "retry-btn";
  retryBtn.textContent = "Tentar novamente";
  retryBtn.className = "button";
  retryBtn.style.marginTop = "20px";

  retryBtn.addEventListener("click", () => {
    document.body.classList.add("fade-out-screen");
    setTimeout(() => {
      location.reload();
    }, 500); // espera a animação acabar
  });

  parentElement.appendChild(retryBtn);
}

function resetQuiz() {
  // Reset questions
  document.querySelectorAll(".question").forEach((q) => {
    q.classList.remove("active", "fade-in", "fade-out");
    q.querySelectorAll(".option").forEach((opt) => {
      opt.classList.remove("correct", "incorrect", "selected");
      const icon = opt.querySelector(".icon");
      if (icon) icon.remove();
      opt.style.pointerEvents = "auto";
    });
  });

  document
    .querySelector(`.question[data-question="0"]`)
    .classList.add("active");

  // Reset intro and quiz visibility
  const intro = document.getElementById("intro");
  const quiz = document.getElementById("quiz");
  intro.style.display = "flex"; // Garante centralização
  intro.classList.remove("hidden");
  intro.style.justifyContent = "center"; // Centraliza horizontalmente
  intro.style.alignItems = "center"; // Centraliza verticalmente
  quiz.style.display = "none";
  quiz.classList.add("hidden");

  // Reset characters and bubbles
  document.getElementById("yudi").classList.add("hidden");
  document.getElementById("isa").classList.add("hidden");
  document.getElementById("bubble-yudi").classList.add("hidden");
  document.getElementById("bubble-isa").classList.add("hidden");

  // Remove retry button
  const retry = document.getElementById("retry-btn");
  if (retry) retry.remove();

  // Reinitialize the quiz
  initializeQuiz();
}

function fadeOutToFinal() {
  document.getElementById("final-overlay").classList.add("show");
}

function initializeQuiz() {
  document.querySelectorAll(".question").forEach((q, index) => {
    setupOptionsForQuestion(q, index);
  });
}

initializeQuiz();
