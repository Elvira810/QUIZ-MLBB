/* ========================================
   MLBB QUIZ — JAVASCRIPT ♡
======================================== */

const questions = [
    {
        question: "Siapa nama pacar Granger?",
        options: ["Elvira", "Elpiji", "Vira", "El"],
        answer: 0,
        explanation: "Makasih sudah mendukung hubungan ini ♡"
    },
    {
        question: "Kalau lu lost streak 10 kali, apa yang lu lakukan?",
        options: ["Nangis", "Istirahat", "Ngatain tim bot", "Evaluasi gameplay"],
        answer: 3,
        explanation: "Sakit memang, tapi introspeksi tidak membuat bintang makin hilang."
    },
    {
        question: "Suara hati yang rispek ketika mabar sama teman bot?",
        options: [
            "Sabar, mungkin dia lagi lag",
            "Ni orang main pake kaki apa gimana?",
            "Teman apa beban berjalan",
            "It's okay, mungkin masih belajar"
        ],
        answer: 3,
        explanation: "Rispek sama kamu yang masih mau mabar sama teman bot"
    },
    {
        question: "Siapa yang harus mengambil buff di Land of Dawn?",
        options: ["Roamer", "EXP Laner", "Miya", "Gold Laner"],
        answer: 2,
        explanation: "TERSERAH YANG PUNYA LOGO LAH"
    },
    {
        question: "Kalau tim lu feeding semua, lu bakal...",
        options: [
            "Menyalahkan jungler",
            "Ngetik 'def' sambil panik",
            "Evaluasi gameplay juga",
            "Nyerah sebelum Lord spawn"
        ],
        answer: 2,
        explanation: "Kadang masalahnya bukan cuma tim. Ego juga perlu di-recall."
    },
    {
        question: "Hero yang mengandalkan basic attack jarak jauh biasanya ber-role...",
        options: ["Marksman", "Tank", "Support", "Fighter"],
        answer: 0,
        explanation: "Marksman biasanya jadi sumber demek jarak jauh"
    },
    {
        question: "Monster besar yang membantu tim mendorong lane adalah...",
        options: ["Turtle", "Lord", "Lithowanderer", "Buff biru"],
        answer: 1,
        explanation: "Lord datang membantu push, bukan merusak hubungan kayak dia"
    },
    {
        question: "Apa fungsi utama Battle Spell Flicker?",
        options: [
            "Memulihkan seluruh HP",
            "Berpindah posisi dan menabrak tembok",
            "Kebal selamanya",
            "Reset semua skill"
        ],
        answer: 1,
        explanation: "Flicker bisa menyelamatkan hidup kalau nggak nabrak tembok"
    },
    {
        question: "Hero yang biasanya menghabisi lawan dengan cepat disebut...",
        options: ["Assassin", "Tank", "Support", "Roamer"],
        answer: 0,
        explanation: "Assassin mengincar target rentan. Jangan malah jadi target"
    },
    {
        question: "Tujuan utama pertandingan MLBB adalah...",
        options: [
            "Melatih kesabaran",
            "Menghancurkan base lawan",
            "Memperbanyak pahala",
            "Membunuh Lord terus"
        ],
        answer: 1,
        explanation: "Kill banyak itu bonus, Base hancur baru kelar bro"
    },
    {
        question: "Tebak rank yang banyak player jago",
        options: [
            "Immortal",
            "Epic",
            "Honor",
            "Legend"
        ],
        answer: 1,
        explanation: "Player epic jago semua"
    },
    {
        question: "Siapa pro player di grup ini",
        options: ["Yanto", "Jule", "Narachan", "Adits"],
        answer: 3,
        explanation: "semuanya benar, kalian pro suka menggendong gw👍🏻"
    },
    {
        question: "Dapat MVP tapi kalah, rasanya...",
        options: [
            "Bahagia",
            "Bangga tanpa beban",
            "Mau tidur selamanya",
            "Bangga sekaligus sakit hati"
        ],
        answer: 3,
        explanation: "Medali dapat, bintang hilang. Kombo penderitaan."
    },
    {
        question: "Musuh recall di depan muka lu. Lu bakal...",
        options: ["Ikut recall", "Kasih bunga", "Langsung serang", "Foto bareng"],
        answer: 2,
        explanation: "Dia bukan ngajak dance. Itu undangan perang!"
    },
    {
        question: "Player yang bilang 'easy' setelah menang tipis itu...",
        options: [
            "Rendah hati",
            "Kalem",
            "Pede kebangetan",
            "Takut kalah rematch"
        ],
        answer: 2,
        explanation: "Menang satu hit turret, bacotnya satu server."
    }
];

// NAMA FOTO SESUAI NOMOR SOAL ♡
const questionImages = {
    1: "granger.jpg",
    2: "barbie.jpg",
    3: "dingin tetapi.jpg",
    4: "buff.jpg",
    5: "meme.jpg",
    6: "Nah ini.jpg",
    7: "Gord.jpg",
    8: "flicker.jpg",
    9: "izin kompe.jpg",
    10: "luar biasa.jpg",
    11: "odgj.jpg",
    12: "imut.jpg",
    13: "kocak.jpg",
    14: "maksud.jpg",
    15: "ngakak.jpg"
};

// AMBIL ELEMEN HTML
const $ = id => document.getElementById(id);

const startScreen = $("start-screen");
const quizScreen = $("quiz-screen");
const resultScreen = $("result-screen");

const startBtn = $("start-btn");
const nextBtn = $("next-btn");
const restartBtn = $("restart-btn");

const questionCounter = $("question-counter");
const currentScore = $("current-score");
const progressBar = $("progress-bar");
const progressTrack = $("progress-track");
const questionNumber = $("question-number");
const questionText = $("question-text");
const answerOptions = $("answer-options");
const feedback = $("feedback");
const questionImage = $("question-image");

let currentQuestion = 0;
let score = 0;
let answered = false;

// GANTI TAMPILAN
function showScreen(screenToShow) {
    [startScreen, quizScreen, resultScreen].forEach(screen => {
        screen.classList.remove("active");
    });

    screenToShow.classList.add("active");
}

// MULAI / ULANG QUIZ
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    currentScore.textContent = "0";
    progressBar.style.width = "0%";
    progressTrack.setAttribute("aria-valuenow", "0");

    $("result-progress-bar").style.width = "0%";

    showScreen(quizScreen);
    showQuestion();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// TAMPILKAN PERTANYAAN DAN FOTO
function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];
    const number = currentQuestion + 1;

    questionCounter.textContent =
        `QUESTION ${String(number).padStart(2, "0")} / ${questions.length}`;

    questionNumber.textContent =
        `QUESTION ${String(number).padStart(2, "0")}`;

    questionText.textContent = q.question;
    currentScore.textContent = score;

    // PILIH FOTO SESUAI NOMOR SOAL
    const imagePath = questionImages[number];

    if (imagePath) {
        questionImage.innerHTML = `
            <img src="${imagePath}" alt="Foto soal ${number}">
            <span>${number === 1
                ? "♡ granger main detected ♡"
                : `♡ foto soal ${number} ♡`
            }</span>
        `;

        questionImage.style.display = "flex";

        const image = questionImage.querySelector("img");

        image.addEventListener("error", () => {
            questionImage.innerHTML = `
                <p class="image-error">
                    🎀 Foto "${imagePath}" tidak ditemukan.
                    Cek nama file dan foldernya!
                </p>
            `;
        }, { once: true });
    } else {
        questionImage.innerHTML = "";
        questionImage.style.display = "none";
    }

    // PROGRESS BAR
    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    progressTrack.setAttribute("aria-valuenow", currentQuestion);

    // RESET JAWABAN SEBELUMNYA
    answerOptions.innerHTML = "";
    feedback.textContent = "";
    feedback.className = "feedback";

    nextBtn.disabled = true;

    nextBtn.innerHTML = number === questions.length
        ? 'LIHAT HASIL <span>🏆</span>'
        : 'LANJUT <span>→</span>';

    // BUAT PILIHAN JAWABAN
    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer-btn";

        const letter = document.createElement("span");
        letter.className = "answer-letter";
        letter.textContent = String.fromCharCode(65 + index);

        const text = document.createElement("span");
        text.textContent = option;

        button.append(letter, text);

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        answerOptions.appendChild(button);
    });
}

// CEK JAWABAN
function selectAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];
    const buttons = answerOptions.querySelectorAll(".answer-btn");
    const isCorrect =
    q.question === "Siapa pro player di grup ini" ||
    selectedIndex === q.answer;
    const correctLetter = String.fromCharCode(65 + q.answer);

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === q.answer) {
            button.classList.add("correct");
        }
    });

    if (isCorrect) {
        score++;

        feedback.textContent = `♡ BENAR, BESTIE! ${q.explanation}`;
        feedback.classList.add("good");
    } else {
        selectedButton.classList.add("wrong");

        feedback.textContent =
            `✗ SALAH WOI Jawaban benar: ${correctLetter}. ${q.explanation}`;

        feedback.classList.add("bad");
    }

    currentScore.textContent = score;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    progressTrack.setAttribute("aria-valuenow", currentQuestion + 1);

    nextBtn.disabled = false;
}

// LANJUT KE SOAL BERIKUTNYA
function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        showResult();
    }
}

// TAMPILKAN HASIL AKHIR
function showResult() {
    showScreen(resultScreen);

    const total = questions.length;
    const wrong = total - score;
    const accuracy = Math.round((score / total) * 100);

    $("final-score").textContent = score;
    $("correct-count").textContent = score;
    $("wrong-count").textContent = wrong;
    $("final-percent").textContent = `${accuracy}%`;
    $("result-progress-bar").style.width = `${accuracy}%`;

    const title = $("result-title");
    const message = $("result-message");
    const emoji = $("result-emoji");

    if (score >= 14) {
        emoji.textContent = "👑";
        title.textContent = "LAND OF DAWN LEGEND";
        message.textContent =
            "LU HAFAL BANGET YAK, Tinggal buktikan di ranked!";
    } else if (score >= 11) {
        emoji.textContent = "💎";
        title.textContent = "MYTHIC MATERIAL";
        message.textContent =
            "mayan gacor! pengetahuan MLBB lu udah oke beb";
    } else if (score >= 8) {
        emoji.textContent = "⚔️";
        title.textContent = "RANKED WARRIOR";
        message.textContent =
            "Lumayan, Masih ada yang kudu dipelajari.";
    } else if (score >= 4) {
        emoji.textContent = "🎀";
        title.textContent = "CALON MVP";
        message.textContent =
            "Masih proses berkembang, bestie. Gas belajar lagi!";
    } else {
        emoji.textContent = "🐣";
        title.textContent = "MINION APPRECIATOR";
        message.textContent =
            "WKWKWK Lu sama Land of Dawn masih tahap perkenalan!";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// EVENT TOMBOL
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);