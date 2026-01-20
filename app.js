let quizzes = [
    {
        id: 1,
        title: "Algebra Basics",
        subject: "Mathematics",
        difficulty: "Easy",
        time: 15,
        date: Date.now() - 86400000
    },
    {
        id: 2,
        title: "World War II",
        subject: "History",
        difficulty: "Medium",
        time: 20,
        date: Date.now() - 172800000
    },
    {
        id: 3,
        title: "Photosynthesis",
        subject: "Science",
        difficulty: "Medium",
        time: 18,
        date: Date.now() - 259200000
    }
];

let events = [
    {
        id: 1,
        title: "Math Exam",
        desc: "Final exam for Algebra",
        date: Date.now() + 86400000 * 3,
        type: "exam"
    },
    {
        id: 2,
        title: "Study Session",
        desc: "Review chemistry notes",
        date: Date.now() + 86400000,
        type: "study_session"
    },
    {
        id: 3,
        title: "Project Deadline",
        desc: "Submit history essay",
        date: Date.now() + 86400000 * 5,
        type: "deadline"
    }
];

const subjects = [
    { name: "Mathematics", score: 85, count: 4 },
    { name: "Science", score: 78, count: 3 },
    { name: "History", score: 72, count: 3 },
    { name: "Literature", score: 80, count: 2 }
];

const recentActivity = [
    { title: "Algebra Basics", subject: "Mathematics", score: 85, date: "Today" },
    { title: "World War II", subject: "History", score: 72, date: "Yesterday" },
    { title: "Photosynthesis", subject: "Science", score: 90, date: "2 days ago" }
];

const chatResponses = {
    math: "Great math question! 📐\n\nKey Tips:\n1. Read carefully\n2. Identify known values\n3. Choose the right formula\n4. Show your work\n5. Check your answer\n\nQuadratic Formula: x = (-b ± √(b²-4ac)) / 2a\n\nWant me to explain more?",
    science: "Excellent science question! 🔬\n\nPhotosynthesis:\n6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂\n\nSteps:\n1. Light Absorption\n2. Water Splitting\n3. Carbon Fixation\n4. Oxygen Release\n\nWant to learn more?",
    history: "Fascinating history topic! 📜\n\nWWI (1914-1918):\n• Trigger: Assassination of Archduke Franz Ferdinand\n• Alliances: Allied vs Central Powers\n• New tech: Tanks, aircraft, chemical weapons\n\nStudy Tips:\n1. Create timelines\n2. Understand cause & effect\n3. Use primary sources",
    study: "Top study strategies! 📚\n\nTechniques:\n1. Pomodoro - 25 min study, 5 min break\n2. Active Recall - Test yourself\n3. Spaced Repetition - Review at intervals\n4. Teach Others - Explain concepts\n5. Sleep Well - 7-9 hours\n\nWhat subject are you studying?",
    default: "Hello! 👋 I'm your AI Study Assistant!\n\nI help with:\n• 📐 Math\n• 🔬 Science\n• 📜 History\n• 📚 Study Tips\n\nTry asking:\n- Explain photosynthesis\n- Help with algebra\n- Study tips for exams\n\nWhat would you like to learn?"
};

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.remove("active");
    });

    document.querySelectorAll(".nav-item, .mobile-nav-item").forEach(function(item) {
        item.classList.remove("active");
    });

    var targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add("active");
    }

    document.querySelectorAll('[data-page="' + pageId + '"]').forEach(function(item) {
        item.classList.add("active");
    });

    window.scrollTo(0, 0);
}

function renderQuizzes() {
    var quizGrid = document.getElementById("quiz-grid");
    var recentQuizzes = document.getElementById("recent-quizzes");

    var quizHTML = "";
    quizzes.forEach(function(quiz) {
        quizHTML += '<div class="quiz-card">';
        quizHTML += '<h4>' + quiz.title + '</h4>';
        quizHTML += '<p class="subject">' + quiz.subject + '</p>';
        quizHTML += '<div class="quiz-meta">';
        quizHTML += '<span class="quiz-badge ' + quiz.difficulty.toLowerCase() + '">' + quiz.difficulty + '</span>';
        quizHTML += '<span class="quiz-info">⏱️ ' + quiz.time + ' min</span>';
        quizHTML += '<span class="quiz-info">📅 ' + timeAgo(quiz.date) + '</span>';
        quizHTML += '</div>';
        quizHTML += '<button class="btn btn-primary btn-full" onclick="startQuiz(' + quiz.id + ')">▶️ Start Quiz</button>';
        quizHTML += '</div>';
    });
    quizGrid.innerHTML = quizHTML;

    if (recentQuizzes) {
        var recentHTML = "";
        quizzes.slice(0, 3).forEach(function(quiz) {
            recentHTML += '<div class="quiz-card">';
            recentHTML += '<h4>' + quiz.title + '</h4>';
            recentHTML += '<p class="subject">' + quiz.subject + '</p>';
            recentHTML += '<div class="quiz-meta">';
            recentHTML += '<span class="quiz-badge ' + quiz.difficulty.toLowerCase() + '">' + quiz.difficulty + '</span>';
            recentHTML += '<span class="quiz-info">⏱️ ' + quiz.time + ' min</span>';
            recentHTML += '</div>';
            recentHTML += '</div>';
        });
        recentQuizzes.innerHTML = recentHTML || '<p style="color: rgb(100, 116, 139);">No quizzes yet</p>';
    }

    updateQuizStats();
}

function renderEvents() {
    var eventsGrid = document.getElementById("events-grid");
    var upcomingEvents = document.getElementById("upcoming-events");

    var typeIcons = {
        study_session: "📚",
        deadline: "📝",
        exam: "🎯"
    };

    var typeClasses = {
        study_session: "study",
        deadline: "deadline",
        exam: "exam"
    };

    var sortedEvents = events.slice().sort(function(a, b) {
        return a.date - b.date;
    });

    var eventsHTML = "";
    sortedEvents.forEach(function(event) {
        eventsHTML += '<div class="event-card">';
        eventsHTML += '<div class="event-icon ' + typeClasses[event.type] + '">' + typeIcons[event.type] + '</div>';
        eventsHTML += '<div class="event-content">';
        eventsHTML += '<h4>' + event.title + '</h4>';
        eventsHTML += '<p>' + (event.desc || "") + '</p>';
        eventsHTML += '<span class="event-date">📅 ' + formatDate(event.date) + '</span>';
        eventsHTML += '</div>';
        eventsHTML += '</div>';
    });
    eventsGrid.innerHTML = eventsHTML || '<p style="color: rgb(100, 116, 139);">No events scheduled</p>';

    if (upcomingEvents) {
        var futureEvents = sortedEvents.filter(function(event) {
            return event.date > Date.now();
        }).slice(0, 3);

        var upcomingHTML = "";
        futureEvents.forEach(function(event) {
            upcomingHTML += '<div class="event-card" style="margin-bottom: 1rem;">';
            upcomingHTML += '<div class="event-icon ' + typeClasses[event.type] + '">' + typeIcons[event.type] + '</div>';
            upcomingHTML += '<div class="event-content">';
            upcomingHTML += '<h4>' + event.title + '</h4>';
            upcomingHTML += '<span class="event-date">📅 ' + formatDate(event.date) + '</span>';
            upcomingHTML += '</div>';
            upcomingHTML += '</div>';
        });
        upcomingEvents.innerHTML = upcomingHTML || '<p style="color: rgb(100, 116, 139);">No upcoming events</p>';
    }
}

function renderAnalytics() {
    var subjectPerformance = document.getElementById("subject-performance");
    var recentActivityEl = document.getElementById("recent-activity");

    if (subjectPerformance) {
        var subjectHTML = "";
        subjects.forEach(function(subject) {
            var colorClass = "green";
            if (subject.score < 80) {
                colorClass = "amber";
            }
            if (subject.score < 60) {
                colorClass = "red";
            }

            subjectHTML += '<div class="subject-item">';
            subjectHTML += '<div class="subject-header">';
            subjectHTML += '<span class="subject-name">' + subject.name + '</span>';
            subjectHTML += '<span class="subject-score">' + subject.score + '%</span>';
            subjectHTML += '</div>';
            subjectHTML += '<div class="progress-bar">';
            subjectHTML += '<div class="progress-fill ' + colorClass + '" style="width: ' + subject.score + '%"></div>';
            subjectHTML += '</div>';
            subjectHTML += '<small style="color: rgb(100, 116, 139);">' + subject.count + ' quizzes completed</small>';
            subjectHTML += '</div>';
        });
        subjectPerformance.innerHTML = subjectHTML;
    }

    if (recentActivityEl) {
        var activityHTML = "";
        recentActivity.forEach(function(activity) {
            var scoreClass = "high";
            if (activity.score < 80) {
                scoreClass = "medium";
            }
            if (activity.score < 60) {
                scoreClass = "low";
            }

            activityHTML += '<div class="activity-item">';
            activityHTML += '<div class="activity-info">';
            activityHTML += '<h4>' + activity.title + '</h4>';
            activityHTML += '<p>' + activity.subject + ' • ' + activity.date + '</p>';
            activityHTML += '</div>';
            activityHTML += '<span class="activity-score ' + scoreClass + '">' + activity.score + '%</span>';
            activityHTML += '</div>';
        });
        recentActivityEl.innerHTML = activityHTML;
    }
}

function updateQuizStats() {
    document.getElementById("total-quizzes").textContent = quizzes.length;

    var easyCount = quizzes.filter(function(q) {
        return q.difficulty === "Easy";
    }).length;

    var mediumCount = quizzes.filter(function(q) {
        return q.difficulty === "Medium";
    }).length;

    var hardCount = quizzes.filter(function(q) {
        return q.difficulty === "Hard";
    }).length;

    document.getElementById("easy-quizzes").textContent = easyCount;
    document.getElementById("medium-quizzes").textContent = mediumCount;
    document.getElementById("hard-quizzes").textContent = hardCount;
}

function getAIResponse(message) {
    var lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("math") || lowerMessage.includes("algebra") || lowerMessage.includes("equation") || lowerMessage.includes("quadratic")) {
        return chatResponses.math;
    }

    if (lowerMessage.includes("science") || lowerMessage.includes("photosynthesis") || lowerMessage.includes("biology") || lowerMessage.includes("chemistry")) {
        return chatResponses.science;
    }

    if (lowerMessage.includes("history") || lowerMessage.includes("war") || lowerMessage.includes("world war")) {
        return chatResponses.history;
    }

    if (lowerMessage.includes("study") || lowerMessage.includes("tips") || lowerMessage.includes("exam") || lowerMessage.includes("test")) {
        return chatResponses.study;
    }

    return chatResponses.default;
}

function addMessage(content, isUser) {
    var messagesContainer = document.getElementById("chat-messages");
    var welcomeMessage = messagesContainer.querySelector(".chat-welcome");

    if (welcomeMessage) {
        welcomeMessage.remove();
    }

    var messageDiv = document.createElement("div");
    messageDiv.className = "message " + (isUser ? "user" : "bot");

    var avatarDiv = document.createElement("div");
    avatarDiv.className = "message-avatar";
    avatarDiv.textContent = isUser ? "👤" : "🤖";

    var contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    contentDiv.innerHTML = content.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage(e) {
    e.preventDefault();

    var input = document.getElementById("chat-input");
    var message = input.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, true);
    input.value = "";

    setTimeout(function() {
        addMessage(getAIResponse(message), false);
    }, 800 + Math.random() * 500);
}

function sendQuickMessage(message) {
    document.getElementById("chat-input").value = message;
    sendMessage({ preventDefault: function() {} });
}

function openQuizModal() {
    document.getElementById("quiz-modal").classList.add("active");
}

function closeQuizModal() {
    document.getElementById("quiz-modal").classList.remove("active");
}

function openEventModal() {
    document.getElementById("event-modal").classList.add("active");
}

function closeEventModal() {
    document.getElementById("event-modal").classList.remove("active");
}

function generateQuiz(e) {
    e.preventDefault();

    var topic = document.getElementById("quiz-topic").value;
    var subject = document.getElementById("quiz-subject").value;
    var difficulty = document.getElementById("quiz-difficulty").value;
    var count = parseInt(document.getElementById("quiz-count").value);

    var newQuiz = {
        id: Date.now(),
        title: topic,
        subject: subject,
        difficulty: difficulty,
        time: count * 2,
        date: Date.now()
    };

    quizzes.unshift(newQuiz);
    closeQuizModal();
    renderQuizzes();

    document.getElementById("quiz-topic").value = "";
    document.getElementById("quiz-subject").value = "";

    alert("Quiz generated successfully! 🎉");
}

function addEvent(e) {
    e.preventDefault();

    var title = document.getElementById("event-title").value;
    var desc = document.getElementById("event-desc").value;
    var date = document.getElementById("event-date").value;
    var time = document.getElementById("event-time").value || "00:00";
    var type = document.getElementById("event-type").value;

    var newEvent = {
        id: Date.now(),
        title: title,
        desc: desc,
        date: new Date(date + "T" + time).getTime(),
        type: type
    };

    events.push(newEvent);
    closeEventModal();
    renderEvents();

    document.getElementById("event-title").value = "";
    document.getElementById("event-desc").value = "";
    document.getElementById("event-date").value = "";
    document.getElementById("event-time").value = "";

    alert("Event added successfully! 📅");
}

function startQuiz(quizId) {
    var quiz = quizzes.find(function(q) {
        return q.id === quizId;
    });

    if (quiz) {
        alert("Starting quiz: " + quiz.title + "\n\nThis is a demo. In a full version, the quiz would start here!");
    }
}

function timeAgo(timestamp) {
    var diff = Date.now() - timestamp;
    var days = Math.floor(diff / 86400000);

    if (days === 0) {
        return "Today";
    }

    if (days === 1) {
        return "Yesterday";
    }

    return days + " days ago";
}

function formatDate(timestamp) {
    var date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

document.querySelectorAll(".nav-item, .mobile-nav-item").forEach(function(item) {
    item.addEventListener("click", function(e) {
        e.preventDefault();
        showPage(item.dataset.page);
    });
});

document.querySelectorAll(".modal").forEach(function(modal) {
    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    renderQuizzes();
    renderEvents();
    renderAnalytics();
});
