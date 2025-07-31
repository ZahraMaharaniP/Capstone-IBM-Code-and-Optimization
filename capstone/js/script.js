// script.js for Enchanted Forest Trials Quiz Game

const questions = [
    {
        question: "Which Greek mythological creature is half-human and half-horse?",
        options: ["Minotaur", "Siren", "Centaur", "Gorgon"],
        correctAnswer: "Centaur"
    },
    {
        question: "In folklore, which magical plant has roots that scream when pulled from the ground?",
        options: ["Belladonna", "Mandrake", "Wolfsbane", "Hemlock"],
        correctAnswer: "Mandrake"
    },
    {
        question: "Which enchanted tree from folklore bears fruit that induces sleep?",
        options: ["Yew", "Oak", "Ash", "Willow"],
        correctAnswer: "Willow"
    },
    {
        question: "In J.K. Rowling's 'Harry Potter', what is the name of the magical plant that heals almost any ailment?",
        options: ["Mandrake", "Devil's Snare", "Fanged Geranium", "Wolfsbane"],
        correctAnswer: "Mandrake"
    },
    {
        question: "Which famous author wrote 'The Lord of the Rings' series, filled with enchanted forests and mythical creatures?",
        options: ["C.S. Lewis", "J.R.R. Tolkien", "Ursula K. Le Guin", "Philip Pullman"],
        correctAnswer: "J.R.R. Tolkien"
    },
    {
        question: "What is the name of the mystical forest in the Brothers Grimm's fairy tale where Rapunzel is imprisoned?",
        options: ["The Dark Forest", "The Enchanted Forest", "The Whispering Woods", "The Misty Grove"],
        correctAnswer: "The Enchanted Forest"
    },
    {
        question: "Which creature from Norse mythology guards a magical well in the enchanted forest?",
        options: ["Troll", "Giant", "Elf", "Dragon"],
        correctAnswer: "Elf"
    },
    {
        question: "In 'The Chronicles of Narnia' by C.S. Lewis, what is the name of the enchanted forest where children enter Narnia?",
        options: ["The Silver Sea", "The Green Wood", "The Wardrobe", "The Archway"],
        correctAnswer: "The Wardrobe"
    },
    {
        question: "What is the name of the ancient riddle from folklore: 'I speak without a mouth and hear without ears. I have no body, but I come alive with the wind.'?",
        options: ["The Riddle of the Sphinx", "The Enchanted Echo", "The Whispering Wind", "The Silent Riddle"],
        correctAnswer: "The Riddle of the Sphinx"
    },
    {
        question: "What mythical beast is often depicted as a serpent or dragon and guards treasure?",
        options: ["Dragon", "Basilisk", "Griffin", "Phoenix"],
        correctAnswer: "Dragon"
    }
];

// Global Variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let correctCount = 0;
let wrongCount = 0;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

// Mengubah nama variabel agar lebih jelas, tidak konflik dengan 'score' dan 'timeLeft' variabel
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const feedbackMessage = document.getElementById('feedback-message');

// Event Listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

document.addEventListener('DOMContentLoaded', () => {
    // Pengaturan tampilan awal layar menggunakan class 'hidden' dan 'active' sesuai CSS
    startScreen.classList.add('active'); // Tampilkan layar awal
    quizScreen.classList.add('hidden'); // Sembunyikan layar kuis
    resultScreen.classList.add('hidden'); // Sembunyikan layar hasil
    
    // Pastikan elemen score dan timer tampil di awal dengan nilai defaultnya
    scoreEl.textContent = score;
    timerEl.textContent = timeLeft;
});

// Core Game Functions
function startGame() {
    // Sembunyikan layar awal dan tampilkan layar kuis
    startScreen.classList.remove('active');
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    quizScreen.classList.add('active');

    // Reset semua variabel game
    score = 0;
    currentQuestionIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    timeLeft = 30;
    
    // Perbarui teks skor dan timer
    scoreEl.textContent = score; // Menggunakan scoreEl
    timerEl.textContent = timeLeft; // Menggunakan timerEl
    feedbackMessage.classList.remove('correct-feedback', 'wrong-feedback'); // Bersihkan kelas feedback
    feedbackMessage.style.display = 'none'; // Sembunyikan pesan feedback

    loadQuestion(); // Panggil fungsi untuk memuat pertanyaan pertama
    startTimer();   // Panggil fungsi untuk memulai timer
}

function loadQuestion() {
    // Jika semua pertanyaan sudah dijawab, akhiri game
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    // Perbarui teks pertanyaan dan nomor pertanyaan
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ''; // Kosongkan pilihan jawaban sebelumnya

    // Buat dan tambahkan tombol-tombol pilihan jawaban
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-button'; // Gunakan className untuk menambah kelas
        button.textContent = option;
        button.dataset.answer = option; // Simpan jawaban sebagai data atribut
        button.addEventListener('click', checkAnswer); // Tambahkan event listener
        optionsContainer.appendChild(button); // Tambahkan tombol ke container
    });
}

function checkAnswer(event) {
    const selectedAnswer = event.target.dataset.answer;
    const currentQuestion = questions[currentQuestionIndex];

    // Nonaktifkan semua tombol opsi untuk mencegah klik ganda selama jeda
    const buttons = optionsContainer.querySelectorAll('.option-button');
    buttons.forEach(button => button.disabled = true);

    // Hapus kelas feedback sebelumnya dan sembunyikan pesan
    feedbackMessage.classList.remove('correct-feedback', 'wrong-feedback');
    feedbackMessage.style.display = 'none'; 

    if (selectedAnswer === currentQuestion.correctAnswer) {
        event.target.classList.add('correct');
        score += 10;
        correctCount++;
        feedbackMessage.textContent = "Correct! A glimmer of ancient wisdom.";
        feedbackMessage.classList.add('correct-feedback');
    } else {
        event.target.classList.add('wrong');
        wrongCount++;
        feedbackMessage.textContent = "Incorrect. The forest path remains hidden.";
        feedbackMessage.classList.add('wrong-feedback');
        
        // Tampilkan jawaban yang benar
        const correctButton = Array.from(buttons).find(
            button => button.dataset.answer === currentQuestion.correctAnswer
        );
        if (correctButton) {
            correctButton.classList.add('correct'); // Tandai jawaban yang benar
        }
    }

    scoreEl.textContent = score; // Update skor

    // Jeda sebentar sebelum melanjutkan ke pertanyaan berikutnya
    setTimeout(() => {
        // Hapus kelas warna dari semua tombol dan aktifkan kembali
        buttons.forEach(button => {
            button.classList.remove('correct', 'wrong');
            button.disabled = false;
        });
        feedbackMessage.style.display = 'none'; // Sembunyikan pesan feedback
        nextQuestion(); // Panggil fungsi nextQuestion setelah jeda
    }, 1500); // Jeda 1.5 detik
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion(); // Muat pertanyaan berikutnya
}

function startTimer() {
    clearInterval(timer); // Pastikan tidak ada timer yang berjalan ganda
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft; // Update teks timer
        if (timeLeft <= 0) {
            clearInterval(timer); // Hentikan timer
            endGame(); // Akhiri game jika waktu habis
        }
    }, 1000); // Setiap 1 detik
}

function endGame() {
    clearInterval(timer); // Hentikan timer
    // Sembunyikan layar kuis dan tampilkan layar hasil
    quizScreen.classList.remove('active');
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    resultScreen.classList.add('active');

    finalScore.textContent = `Total Wisdom Gained: ${score}`; // Update skor akhir
    // Pesan hasil berdasarkan performa
    if (correctCount >= questions.length * 0.7) { // Jika lebih dari 70% benar
        resultMessage.textContent = "You mastered the trials! A true forest guardian!";
    } else if (correctCount >= questions.length * 0.5) { // Jika lebih dari 50% benar
        resultMessage.textContent = "You journeyed well. Seek more wisdom to truly master the forest.";
    } else {
        resultMessage.textContent = "The forest path remains hidden. You need more wisdom to complete the trials.";
    }
    
    // Bersihkan elemen-elemen di layar kuis (opsional, karena layar kuis sudah disembunyikan)
    questionNumber.textContent = '';
    questionText.textContent = '';
    optionsContainer.innerHTML = '';
}

function restartGame() {
    // Sembunyikan layar hasil dan tampilkan layar awal untuk memulai ulang
    resultScreen.classList.remove('active');
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    startScreen.classList.add('active'); // Pastikan layar awal muncul
    
    // startGame() akan dipanggil oleh event listener saat tombol 'Start Quiz' ditekan lagi
    // Tidak perlu memanggil startGame() langsung di sini, karena restartGame akan membawa user ke startScreen.
}

// ### Explanation:

// - **Question Data**: An array `questions` with multiple quiz questions is defined, covering various aspects of enchanted forests, myths, and fantasy literature.
// - **Global Variables**: Variables to track game state, including score, question index, timer, and counts for correct and wrong answers.
// - **DOM Elements**: References to HTML elements are stored for dynamic updates.
// - **Core Functions**: Implement the game logic including starting, loading, checking answers, managing timers, and ending the game.
// - **Event Listeners**: Set up interactions with the Start and Restart buttons, and ensure DOM is loaded before script execution.
// - **Initialization**: Ensures the start screen is visible initially, and game logic kicks in on Start button click.

// This script provides a comprehensive framework for the 'Enchanted Forest Trials' quiz game, with structured data, clear gameplay mechanics, and user interface interactions.