        var myGamePiece;
        var myObstacles = [];
        var myScore;
        var scores = JSON.parse(localStorage.getItem('scores')) || [];
        
        function startGame() {
            myGamePiece = new component(30, 30, "red", 10, 120);
            myScore = new component("30px", "Consolas", "black", 280, 40, "text");
            myGameArea.start();
        }

        function updateScores() {
            scores.push(myGameArea.frameNo);
            localStorage.setItem('scores', JSON.stringify(scores));
        }
        
        var myGameArea = {
            canvas : document.createElement("canvas"),
            start : function() {
                this.canvas.width = 480;
                this.canvas.height = 270;
                this.context = this.canvas.getContext("2d");
                document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                this.frameNo = 0;
                this.interval = setInterval(updateGameArea, 20);
                },
            clear : function() {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },
            stop : function() {
                clearInterval(this.interval);
            }
        }
        
        function component(width, height, color, x, y, type) {
            this.type = type;
            this.width = width;
            this.height = height;
            this.speedX = 0;
            this.speedY = 0;    
            this.x = x;
            this.y = y; 
            this.color = color;  
            this.update = function() {
                ctx = myGameArea.context;
                if (this.type == "text") {
                    ctx.font = this.width + " " + this.height;
                    ctx.fillStyle = color;
                    ctx.fillText(this.text, this.x, this.y);
                } else {
                    ctx.fillStyle = color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            }
            this.newPos = function() {
                this.x += this.speedX;
                this.y += this.speedY;        
            }
            this.crashWith = function(otherobj) {
                var myleft = this.x;
                var myright = this.x + (this.width);
                var mytop = this.y;
                var mybottom = this.y + (this.height);
                var otherleft = otherobj.x;
                var otherright = otherobj.x + (otherobj.width);
                var othertop = otherobj.y;
                var otherbottom = otherobj.y + (otherobj.height);
                var crash = true;
                if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                    crash = false;
                }
                return crash;
            }
        }

        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false; 
        })
        
        function updateGameArea() {
            var x, height, gap, minHeight, maxHeight, minGap, maxGap;
            for (i = 0; i < myObstacles.length; i += 1) {
                if (myGamePiece.crashWith(myObstacles[i])) {
                    if (myObstacles[i].color === "yellow") {
                        myGameArea.frameNo += 50; 
                    } else if (myObstacles[i].color === "blue") {
                        myGameArea.frameNo -= 50; 
                    } else if (myObstacles[i].color === "green") {
                        myGameArea.stop(); 
                        updateScores(); 
                        showResults();
                        return;
                    }
                    myObstacles.splice(i, 1);
                    break; 
                } 
            }
            myGameArea.clear();
            myGameArea.frameNo += 1;
            if (myGameArea.frameNo == 1 || everyinterval(150)) {
                x = myGameArea.canvas.width;
                minHeight = 20;
                maxHeight = 200;
                height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
                minGap = 50;
                maxGap = 200;
                gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
                var circleColor = Math.random() < 0.5 ? "yellow" : "blue";
                myObstacles.push(new component(10, height, "green", x, 0));
                myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
                var circleX = x - (gap / 2);
                var circleY = height + (gap / 2);
                myObstacles.push(new component(10, 10, circleColor, circleX, circleY, "circle"));

            }
            for (i = 0; i < myObstacles.length; i += 1) {
                myObstacles[i].speedX = -1;
                myObstacles[i].newPos();
                myObstacles[i].update();
            }
            myScore.text="SCORE: " + myGameArea.frameNo;
            myScore.update();
            myGamePiece.newPos();    
            myGamePiece.update();
            if (myGameArea.keys && myGameArea.keys[37]) {moveleftkey(-1)}
            if (myGameArea.keys && myGameArea.keys[39]) {moverightkey(1)}
            if (myGameArea.keys && myGameArea.keys[40]) {moveupkey(1)}
            if (myGameArea.keys && myGameArea.keys[38]) {movedownkey(-1)}
        }

        function showResults() {
            var lastScore = scores[scores.length - 1];
            var sortedScores = scores.slice().sort((a, b) => b - a);
            var message = 'LAST SCORE: ' + lastScore + '\n\nTOP 3 BEST SCORES:\n';
            for (var i = 0; i < Math.min(sortedScores.length, 3); i++) {
                message += (i + 1) + '. ' + sortedScores[i] + '\n';
            }
            message += '\nBOTTOM 3 WORST SCORES:\n';
            var worstScores = sortedScores.slice().reverse();
            for (var i = 0; i < Math.min(worstScores.length, 3); i++) {
                message += (i + 1) + '. ' + worstScores[i] + '\n';
            }
            alert(message);
        }
        
        function everyinterval(n) {
            if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
            return false;
        }
        
        function moveup() {
            myGamePiece.speedY = -1; 
        }
        
        function movedown() {
            myGamePiece.speedY = 1; 
        }
        
        function moveleft() {
            myGamePiece.speedX = -1; 
        }
        
        function moveright() {
            myGamePiece.speedX = 1; 
        } 

        function moveupkey() {
            if (myGamePiece.speedY === 0) {
                myGamePiece.speedY = 1;
            }
            else {
                myGamePiece.speedY = 0;
            }
        }
        
        function movedownkey() {
            if (myGamePiece.speedY === 0) {
                myGamePiece.speedY = -1;
            }
            else {
                myGamePiece.speedY = 0;
            }
        }
        
        function moveleftkey() {
            if (myGamePiece.speedX === 0) {
                myGamePiece.speedX = -1;
            }
            else {
                myGamePiece.speedX = 0;
            }
        }
        
        function moverightkey() {
            if (myGamePiece.speedX === 0) {
                myGamePiece.speedX = 1;
            }
            else {
                myGamePiece.speedX = 0;
            }
        }
        

        function clearmove() {
            myGamePiece.speedX = 0; 
            myGamePiece.speedY = 0; 
        }
        
        function restartGame() {
            myGameArea.clear();
            myObstacles = [];
            myGameArea.frameNo = 0;
            startGame();
        }

