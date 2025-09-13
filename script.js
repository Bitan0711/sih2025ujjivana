// Navigation toggle for mobile
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}

// Quiz functionality for Learn page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the learn page with a quiz
    const quizSubmit = document.getElementById('quiz-submit');
    if (quizSubmit) {
        quizSubmit.addEventListener('click', checkQuizAnswers);
    }
    
    // Challenge progress functionality
    setupChallengeProgress();
    
    // Form validation for contact page
    setupFormValidation();
});

function checkQuizAnswers() {
    // This would be connected to a backend API in the future
    // For now, we'll use dummy correct answers
    
    const correctAnswers = {
        'q1': 'b',
        'q2': 'a',
        'q3': 'c'
    };
    
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    
    for (const question in correctAnswers) {
        const selectedOption = document.querySelector(`input[name=${question}]:checked`);
        if (selectedOption && selectedOption.value === correctAnswers[question]) {
            score++;
        }
    }
    
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.style.display = 'block';
    
    if (score === totalQuestions) {
        resultDiv.innerHTML = `<p>Great job! You got ${score} out of ${totalQuestions} correct!</p>`;
        resultDiv.style.backgroundColor = '#e8f5e9';
        resultDiv.style.color = '#2e7d32';
    } else {
        resultDiv.innerHTML = `<p>You got ${score} out of ${totalQuestions} correct. Try again!</p>`;
        resultDiv.style.backgroundColor = '#ffebee';
        resultDiv.style.color = '#c62828';
    }
    
    // Future: Send score to backend API for progress tracking
    console.log(`Quiz score: ${score}/${totalQuestions}`);
}

function setupChallengeProgress() {
    // This would be connected to a backend API in the future
    // For now, we'll initialize with dummy data
    
    const challenges = document.querySelectorAll('.challenge-card');
    challenges.forEach((challenge, index) => {
        const progressFill = challenge.querySelector('.progress-fill');
        const actionBtn = challenge.querySelector('.challenge-action');
        
        if (progressFill && actionBtn) {
            // Set random initial progress for demo purposes
            const randomProgress = Math.floor(Math.random() * 100);
            progressFill.style.width = `${randomProgress}%`;
            
            if (randomProgress === 100) {
                actionBtn.textContent = 'Completed';
                actionBtn.disabled = true;
                actionBtn.style.backgroundColor = '#9e9e9e';
            }
            
            // Add click handler for demo purposes
            actionBtn.addEventListener('click', function() {
                // In a real implementation, this would update via API
                let currentWidth = parseInt(progressFill.style.width);
                if (currentWidth < 100) {
                    currentWidth += 25;
                    if (currentWidth > 100) currentWidth = 100;
                    progressFill.style.width = `${currentWidth}%`;
                    
                    if (currentWidth === 100) {
                        actionBtn.textContent = 'Completed';
                        actionBtn.disabled = true;
                        actionBtn.style.backgroundColor = '#9e9e9e';
                        
                        // Future: Send completion status to backend
                        console.log(`Challenge ${index + 1} completed!`);
                    }
                }
            });
        }
    });
}

function setupFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation for demo purposes
            // In a real implementation, this would be more comprehensive
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                highlightError(nameInput);
                isValid = false;
            } else {
                removeHighlight(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            } else {
                removeHighlight(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                highlightError(messageInput);
                isValid = false;
            } else {
                removeHighlight(messageInput);
            }
            
            if (isValid) {
                // In a real implementation, this would submit to a backend API
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }
}

function highlightError(input) {
    input.style.borderColor = '#f44336';
}

function removeHighlight(input) {
    input.style.borderColor = '#ddd';
}

function isValidEmail(email) {
    // Simple email validation for demo
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Future: Functions that would connect to backend APIs
/*
function getUserProgress() {
    // This would fetch user progress from backend API
    console.log('Fetching user progress from API...');
}

function updateLeaderboard() {
    // This would fetch latest leaderboard data from backend API
    console.log('Updating leaderboard from API...');
}

function submitContactForm(data) {
    // This would submit the contact form to backend API
    console.log('Submitting contact form to API...', data);
}
*/