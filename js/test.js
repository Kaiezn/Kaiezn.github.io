const start = () =>{

    const header = document.querySelector(".game-title");
    const letters = document.querySelectorAll(".letter-btn");
    const answers = document.querySelector("#answers-container");
    const category = document.querySelector("#category");
    const status = document.querySelector("#status");
    const prog = document.querySelector("#progress");
    const life = document.querySelector("#life");
    // const answerLets = document.querySelectorAll("#answers-container div");
    let correct = 0;
    let error = 0;
    let spaces = 0;
    let round = 1;

    const Questions = [
        {
            genre: "Programming",
            sub_genre: "Language",
            q_item: "Javascript"
        },
        {
            genre: "Ph History",
            sub_genre: "Heroes",
            q_item: "Jose Rizal"
        },
        {
            genre: "Brand",
            sub_genre: "Cars",
            q_item: "Honda"
        },
        {
            genre: "Programming",
            sub_genre: "Language",
            q_item: "Php"
        },

        {
            genre: "Fruit",
            sub_genre: "",
            q_item: "Apple"
        },

       {
            genre: "Trees",
            sub_genre: "",
            q_item: "Narra"
        }
    ];


    let rand = Math.floor((Math.random() * Questions.length - 1) + 1);
    console.log("Item: " + rand);
    let questItem = Questions[rand].q_item.toLowerCase();
    if(Questions[rand].sub_genre === ""){
        category.innerText = `${Questions[rand].genre.toUpperCase()}`
    }else{
        category.innerText = `${Questions[rand].genre.toUpperCase()} / ${Questions[rand].sub_genre.toUpperCase()}`;
    }

    Array.from(questItem).forEach(function(q){
        console.log(q);
        const letDiv = document.createElement("div");
        const letSpan = document.createElement("span");
        letSpan.innerText = q;
            letDiv.appendChild(letSpan);
            answers.appendChild(letDiv);
            letSpan.style.display = "none";
        if(q === " "){
            letDiv.style.opacity = "0%";
            spaces++;
        }
    })

    Questions.splice(rand, 1);
    console.log("Spaces: " + spaces);
    console.log("Length: " + Questions.length);

    letters.forEach(function(letter){
        letter.addEventListener("click", function(){
            this.disabled = true;
            this.style.opacity = "50%";
            verifyAnswers(letter.value, questItem, correct);
            console.log(correct);
        });
    });

    // PLAYER's CLASS
    class Player{
        constructor(name, life, score){
            this.name = "Player";
            this.life = 3;
            this.score = 0;
        }
    }

    // GAME's CLASS
    class Game{
        constructor(round, question){
            this.round = round;
            this.question = question;
        }
    }

    // PLAYER's INSTANCE
    const p1 = new Player();

    // GAME UTILITIES

    const lvlComplete = (corr, arr)=>{
        console.log("len2: " + Questions.length);
        if(corr === (arr.length - spaces)){
            correct = 0;
            spaces = 0;
            round++;
            console.log(correct);
            letters.forEach(function(let){
                let.disabled = false;
                let.style.opacity = "100%";
            });

            const ansChilds = Array.from(answers.children);
            setTimeout(() =>{
                ansChilds.forEach(function(ansChild){
                    ansChild.remove();
                })
            }, 1000);

            if(Questions.length !== 0){
                setTimeout(() =>{
                questItem = randomizeQuestion();
                header.innerText = `Round ${round}`;
                }, 1000);
            }else{
                header.innerText = "Completed";
                letters.forEach(function(let){
                    let.disabled = true;
                    let.style.opacity = "50%";
                    let.style.pointerEvents = "none";
                });
            }
            prog.children[round - 2].style.backgroundColor = "#70E000";
            prog.children[round - 2].style.border = "none";
            console.log("round :" + (round - 2));
            console.log("len: " + Questions.length);
        }
    }

    // RANDOMIZE QUESTIONS

    const randomizeQuestion = () =>{
        let rand = Math.floor((Math.random() * Questions.length - 1) + 1);
        console.log("Randomize");
        console.log("Item: " + rand);
        console.log("Length :" + Questions.length);
        if(Questions[rand].sub_genre === ""){
            category.innerText = `${Questions[rand].genre.toUpperCase()}`
        }else{
            category.innerText = `${Questions[rand].genre.toUpperCase()} / ${Questions[rand].sub_genre.toUpperCase()}`;
        }
        let questItem = Questions[rand].q_item.toLowerCase();
     
        Array.from(questItem).forEach(function(q){
            console.log(q);
            const letDiv = document.createElement("div");
            const letSpan = document.createElement("span");
            letSpan.innerText = q;
            letDiv.appendChild(letSpan);
            answers.appendChild(letDiv);
            letSpan.style.display = "none";
            if(q === " "){
                letDiv.style.opacity = "0%";
                spaces++;
            }
        })
        if(Questions.length >= 1){
            Questions.splice(rand, 1);
        }
        console.log("Spaces: " + spaces);
        console.log(answers.children);
        return questItem;     
    }

    const verifyAnswers = (ans, quest)=>{
        let l1 = 0;
        const newQuestion = Array.from(quest);
        newQuestion.forEach(function(q){
            let letAns = answers.children[l1].children[0];
            if(q === ans){
                letAns.style.display = "block";
                correct++;
            }
            l1++;
        });
        if(newQuestion.every(function(qlet){
            return qlet !== ans; })){
                if(error < 4){
                    p1.life--;
                    life.children[error].style.backgroundColor = "red";
                    life.children[error].style.transform = "scale(90%)";
                    error++;
                    console.log(p1.life);
                }
                if(error === 4){
                    let l1 = 0;
                    header.innerText = "Game Over";
                    letters.forEach(function(let){
                        let.disabled = true;
                        let.style.opacity = "50%";
                        let.style.pointerEvents = "none";
                    });
                    newQuestion.forEach(function(q){
                        let ansLet = answers.children[l1].children[0];
                        ansLet.style.display = "block";
                        l1++;
                    });
                }
               
        }
        
        lvlComplete(correct, newQuestion);
    }
    
}

start();