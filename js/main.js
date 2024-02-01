const start = () =>{

    const header = document.querySelector(".game-title");
    const letters = document.querySelectorAll(".letter-btn");
    const answers = document.querySelector("#answers-container");
    const category = document.querySelector("#category");
    const status = document.querySelector("#status");
    const prog = document.querySelector("#progress");
    const life = document.querySelector("#life");
    const clueButton = document.querySelector("#clue-button");

    let correct = 0;
    let error = 0;
    let spaces = 0;
    let round = 1;
    let totalPoints = 0;

    const Questions = {
        easy: [
            {
                "genre": "Programming",
                "sub_genre": "Language",
                "q_item": "JavaScript"
            },
            {
                "genre": "Programming",
                "sub_genre": "Language",
                "q_item": "Python"
            },
            {
                "genre": "Mathematics",
                "sub_genre": "Algebra",
                "q_item": "Quadratic Equations"
            },
            {
                "genre": "Science",
                "sub_genre": "Biology",
                "q_item": "Photosynthesis"
            },
            {
                "genre": "Technology",
                "sub_genre": "Gadgets",
                "q_item": "Smartphones"
            },
            {
                "genre": "Geography",
                "sub_genre": "",
                "q_item": "Philippines"
            },
            {
                "genre": "History",
                "sub_genre": "",
                "q_item": "World War"
            },
            {
                "genre": "Literature",
                "sub_genre": "Poetry",
                "q_item": "Haiku"
            },
            {
                "genre": "Art",
                "sub_genre": "",
                "q_item": "Mona Lisa"
            },
            {
                "genre": "Music",
                "sub_genre": "",
                "q_item": "Mozart"
            }
        ],
        medium: [
            {
                genre: "Programming",
                sub_genre: "Algorithm",
                q_item: "Binary Search"
            },
            {
                genre: "Computer Science",
                sub_genre: "Data Structures",
                q_item: "Linked Lists"
            },
            {
                genre: "Web Development",
                sub_genre: "Frontend",
                q_item: "CSS Flexbox"
            },
            {
                genre: "Networking",
                sub_genre: "Protocols",
                q_item: "IP"
            },
            {
                genre: "Programming",
                sub_genre: "Backend",
                q_item: "API"
            },
            {
                genre: "Database Management",
                sub_genre: "SQL",
                q_item: "Tables"
            },
            {
                genre: "Cybersecurity",
                sub_genre: "Authentication",
                q_item: "OAuth"
            },
            {
                genre: "Software Engineering",
                sub_genre: "Version Control",
                q_item: "Git"
            },
            {
                genre: "Cloud Computing",
                sub_genre: "Services",
                q_item: "Amazon"
            },
            {
                genre: "Programming",
                sub_genre: "Design Patterns",
                q_item: "Observer Pattern"
            },
    
        ],
        hard: [
            {
                genre: "Linux",
                sub_genre: "Commands",
                q_item: "Grep"
            },
            {
                genre: "Java",
                sub_genre: "Basic Commands",
                q_item: "Const"
            },
            {
                genre: "Python",
                sub_genre: "Basic Commands",
                q_item: "Print"
            },
            {
                genre: "Linux",
                sub_genre: "Permissions",
                q_item: "chmod"
            },
            {
                genre: "HTML",
                sub_genre: "",
                q_item: "DOCTYPE"
            },
            {
                genre: "CSS",
                sub_genre: "",
                q_item: "Background Color"
            },
            {
                genre: "Linux",
                sub_genre: "System Control",
                q_item: "Systemctl"
            },
            {
                genre: "Java",
                sub_genre: "Exception Handling",
                q_item: "Try"
            },
            {
                genre: "HTML",
                sub_genre: "br",
                q_item: "Line Break"
            },
            {
                genre: "Linux",
                sub_genre: "Connect server",
                q_item: "SFTP"
            }
    
        ]
    };
    


    let difficulty = 'easy';

    let questionList;

    const randomizeQuestion = () => {
        let rand = Math.floor(Math.random() * questionList.length);
        console.log("Randomize");
        console.log("Item: " + rand);
        console.log("Length :" + questionList.length);

        if (questionList[rand].sub_genre === "") {
            category.innerText = `${questionList[rand].genre.toUpperCase()}`
        } else {
            category.innerText = `${questionList[rand].genre.toUpperCase()} / ${questionList[rand].sub_genre.toUpperCase()}`;
        }

        let questItem = questionList[rand].q_item.toLowerCase();

        Array.from(questItem).forEach(function (q) {
            console.log(q);
            const letDiv = document.createElement("div");
            const letSpan = document.createElement("span");
            letSpan.innerText = q;
            letDiv.appendChild(letSpan);
            answers.appendChild(letDiv);
            letSpan.style.display = "none";
            if (q === " ") {
                letDiv.style.opacity = "0%";
                spaces++;
            }
        })

        if (questionList.length >= 1) {
            questionList.splice(rand, 1);
        }
        console.log("Spaces: " + spaces);
        console.log(answers.children);
        return questItem;
    }

    const verifyAnswers = (ans, quest) => {
        let l1 = 0;
        const newQuestion = Array.from(quest);
    
        newQuestion.forEach(function (q, index) {
            let letDiv = answers.children[l1];
            let letSpan = letDiv.children[0].children[0];
            let letAns = answers.children[l1].children[0];
    
            if (q === ans) {
                letSpan.style.display = "block";
                correct++;
            }
    
            if (q === ans.toLowerCase() && letAns.style.display !== "block") {
                letAns.style.display = "block";
                correct++;
            }
    
            l1++;
        });
    
        if (newQuestion.every(function (qlet) {
            return qlet !== " ";
        })) {
            lvlComplete(correct, newQuestion);
        }
    
        if (newQuestion.every(function (qlet) {
            return qlet.toLowerCase() !== ans.toLowerCase();
        })) {
            if (error < 3) {
                p1.life--;
                life.children[error].style.backgroundColor = "red";
                life.children[error].style.transform = "scale(90%)";
                error++;
                console.log(p1.life);
            }
    
            if (error === 3) {
                let l1 = 0;
                header.innerText = "Game Over!";
                letters.forEach(function (let) {
                    let.disabled = true;
                    let.style.opacity = "50%";
                    let.style.pointerEvents = "none";
                });
    
                newQuestion.forEach(function (q) {
                    let letDiv = answers.children[l1];
                    let letSpan = letDiv.children[0].children[0];
                    let letAns = answers.children[l1].children[0];
    
                    letSpan.style.display = "block";
                    letAns.style.display = "block";
    
                    l1++;
                });
            }
        }
    
        lvlComplete(correct, newQuestion);
    };
    

    const lvlComplete = (corr, arr) => {
        console.log("len2: " + questionList.length);
        if (corr === arr.length - spaces) {
            correct = 0;
            spaces = 0;
            round++; 
            p1.updateScore(10);

            totalPoints = p1.score;
            const scoreElement = document.getElementById("score");
            scoreElement.innerHTML = `<span>Points: ${totalPoints}</span>`;
            console.log(correct);
            letters.forEach(function (let) {
                let.disabled = false;
                let.style.opacity = "100%";
            });

            const ansChilds = Array.from(answers.children);
            setTimeout(() => {
                ansChilds.forEach(function (ansChild) {
                    ansChild.remove();
                });
            }, 1000);

            if (questionList.length !== 0) {
                setTimeout(() => {
                    questItem = randomizeQuestion();
                    header.innerText = "("+[difficulty]+")" + ` Round ${round}`;
                }, 1000);
            } else {
                switch (difficulty) {
                    case 'easy':
                        difficulty = 'Medium';
                        break;
                    case 'medium':
                        difficulty = 'Hard';
                        break;
                    case 'hard':
                        header.innerText = "Completed";
                        letters.forEach(function (let) {
                            let.disabled = true;
                            let.style.opacity = "50%";
                            let.style.pointerEvents = "none";
                        });
                        break;
                    default:
                        throw new Error('Invalid difficulty level');
                }

                round = 1;
                correct = 0;
                spaces = 0;

                questionList = Questions[difficulty];
                questItem = randomizeQuestion();
                header.innerText = "("+[difficulty]+")" + ` Round ${round}`;
            }

            prog.children[round - 2].style.backgroundColor = "#ffffff";
            prog.children[round - 2].style.border = "none";
            console.log("round :" + (round - 2));
            console.log("len: " + questionList.length);
        }
    };

    
    const getClue = () => {
        const totalPoints = p1.score; // Assuming p1 is defined elsewhere
    
        if (totalPoints >= 25) {
            p1.updateScore(-25);
    
            const unrevealedIndices = [];
            const vowels = ['a', 'e', 'i', 'o', 'u'];
            const consonants = 'bcdfghjklmnpqrstvwxyz';
    
            for (let i = 0; i < questItem.length; i++) {
                
                    unrevealedIndices.push(i);
                
            }
    
            if (unrevealedIndices.length > 0) {
                let letterToReveal;
    
                const selectedClueType = document.querySelector('input[name="clueType"]:checked').value;
    
                if (selectedClueType === 'vowel') {
                    // Reveal a vowel
                    letterToReveal = vowels[Math.floor(Math.random() * vowels.length)];
                } else {
                    // Reveal a consonant
                    letterToReveal = consonants[Math.floor(Math.random() * consonants.length)];
                }
    
    
                alert(`Clue: ${questItem}`);
            } else {
                console.log("All letters are already revealed!");
            }
        } else {
            alert("Not enough points for a clue!");
        }
    };
    
    
    
    clueButton.addEventListener("click", getClue);

    class Player {
        constructor(name, life, score) {
            this.name = "Player";
            this.life = 3;
            this.score = 0;
        }
        updateScore(points) {
            this.score += points;
        }
    }

    class Game {
        constructor(round, question) {
            this.round = round;
            this.question = question;
        }
    }

    const p1 = new Player();

    difficulty = 'easy';
    questionList = Questions[difficulty];
    let rand = Math.floor(Math.random() * questionList.length);
    console.log("Item: " + rand);
    let questItem = randomizeQuestion();
    console.log("Selected Question: " + questItem);

    letters.forEach(function (letter) {
        letter.addEventListener("click", function () {
            this.disabled = true;
            this.style.opacity = "50%";
            verifyAnswers(this.innerText, questItem, correct);
            console.log(correct);
        });
    });
}

start();