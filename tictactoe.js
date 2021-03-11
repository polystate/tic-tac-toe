//Game board module

const gameBoard = (function(){
    const board = document.getElementById("board");
    const boardArr = new Array(9).fill("");
    const numToWin = Math.floor(Math.sqrt(boardArr.length));
    const renderBoard = (lineType) => {
        //Render Board to HTML
        let spaceID = 0;
        boardArr.forEach(() => {
        boardSpace = document.createElement("p");
            boardSpace.setAttribute("class","board-space");
            boardSpace.setAttribute("id",`space-${spaceID}`);
            switch(spaceID){
                case 1:
                case 4:
                    boardSpace.style = `border-left: ${lineType}; border-right: ${lineType}; border-bottom: ${lineType};`;
                break;
                case 0:
                case 2:
                case 3:
                case 5:
                    boardSpace.style = `border-bottom: ${lineType};`
                    break;
                case 7:
                    boardSpace.style = `border-left: ${lineType}; border-right: ${lineType};`
            }
            board.appendChild(boardSpace);
            spaceID++;
        })
    }
    //Check for three in a row in rows, columns, and diagonals
    const isDimensionWinner = (dim) => {
        const chunkArrayInGroups = (arr, size) => {
            newArr = [];
            for (let i = 0; i < arr.length; i += size) {
              newArr.push(arr.slice(i, i + size));
            }
            return newArr;
          }
        gameArr = [];
        if(dim === "row"){
            gameArr = [...chunkArrayInGroups(boardArr,numToWin)];
        } else if(dim === "column"){
            columns = 0;
            while(columns < numToWin){
                for(let i = 0; i < boardArr.length; i+=numToWin){
                gameArr.push(boardArr[i+columns]);
                } columns++;
            }
            gameArr = [...chunkArrayInGroups(gameArr,numToWin)];
        } else if(dim === "diagonal"){
            for(let i = 0; i < boardArr.length; i+=numToWin+1){
                gameArr.push(boardArr[i]);
            }
            for(let i = numToWin-1; i < boardArr.length-1; i+=numToWin-1){
                gameArr.push(boardArr[i]);
            }
            gameArr = [...chunkArrayInGroups(gameArr,numToWin)];
        }
        p1token = (val) => val === player1.token;
        p2token = (val) => val === player2.token;
        for(dimension in gameArr){
            if(gameArr[dimension].every(p1token) || gameArr[dimension].every(p2token)){
                return true;
            }
        } return false;
    }
    const checkForWinner = () => {
        if(isDimensionWinner("row") || isDimensionWinner("column") || isDimensionWinner("diagonal")){
        return true;
        } return false;
    }
    const markWinningLine = (lineObj,winningspace) => {
        spaces = document.querySelectorAll(".board-space");
        lineWinningSpaces = findWinningLine(lineObj,winningspace);
        for(let i = 0; i < lineWinningSpaces.length; i++){
            spaces[lineWinningSpaces[i]].childNodes[0].style = "color: gold;";
        }
    }
    const findWinningLine = (lineObj,winningspace) => {
        for(let prop in lineObj){
            for(let space in lineObj[prop]){
                if(winningspace == lineObj[prop][space]){
                    return lineObj[prop];
                }
            }
        }
    }
    const clappingSound = () => {
        clapping = document.createElement("audio");
        clapping.setAttribute("autoplay","autoplay");
        clapping.innerHTML = "<source src=clapping.mp3 />"
        board.appendChild(clapping);
    }
    const updateBoardResult = (result,winningspace) => {
        if(result === "draw"){
            setTimeout(catStyle,1700);
            function catStyle(){
            catSound = document.createElement("audio");
            catSound.setAttribute("autoplay","autoplay");
            catSound.innerHTML = "<source src=meow.mp3 />"
            board.innerHTML = "";
            catPhoto = document.createElement("img");
            catPhoto.setAttribute("src","cat.jpg");
            catPhoto.setAttribute("id","catphoto");
            catPhoto.setAttribute("title","Scratch that cat! It's a tie!")
            board.appendChild(catSound);
            board.appendChild(catPhoto);
            }
        } else {
            if(isDimensionWinner("row")){
                rowObj = {
                row1: [0,1,2],
                row2: [3,4,5],
                row3: [6,7,8]
                }
                markWinningLine(rowObj,winningspace);
                clappingSound();
            } else if(isDimensionWinner("column")){
                colObj = {
                    col1: [0,3,6],
                    col2: [1,4,7],
                    col3: [2,5,8]
                }
                markWinningLine(colObj,winningspace);
                clappingSound();
            } else {
                diagObj = {
                    diag1: [0,4,8],
                    diag2: [2,4,6]
                }
                markWinningLine(diagObj,winningspace);
                clappingSound();
            }
        }
    }
    
    return { board, renderBoard, boardArr, isDimensionWinner, checkForWinner, updateBoardResult };
})();

//Display Controller Module

const displayController = (function(){
    const winnerText = document.getElementById("winnerText");
    const overlay = document.getElementById("overlay");
    let menuAppear = false;
    const blankSpace = (num) => {
        spaceStr = "";
        for(let i = 0; i < num; i++){
            spaceStr += "&nbsp;"
        }
        return spaceStr;
    }
    const menuInput = () => {
        p1name = document.getElementById("p1name").value;
        p2name = document.getElementById("p2name").value;
        p1token = document.getElementById("p1token").value;
        p2token = document.getElementById("p2token").value;
        //Defaults if nothing is entered
        if(!p1name) p1name = "Player 1";
        if(!p1token) p1token = "X";
        if(!p2name) p2name = "Player 2";
        if(!p2token) p2token = "O";
        //
        player1 = createPlayer(`${p1name}`,`${p1token}`);
        player2 = createPlayer(`${p2name}`,`${p2token}`);
    }
    const toggleMenu = () => {
        menu = document.getElementById("menu");
        if(menuAppear) {menu.style = "display: unset;"}
        else menu.style = "display: none;"
        menuAppear = !menuAppear;
    }
    const startGame = () => {
        localStorage.clear();
        menuInput();
        overlay.remove();
        gameBoard.renderBoard("2px solid white");
        displayController.nextTurn();
    };
    const restartGame = () => {location.reload();};
    const getPlayerTurn = () => {
        activeSpaces = 0;
        for(let i = 0; i < gameBoard.boardArr.length; i++){
            if(gameBoard.boardArr[i] !== ""){
                activeSpaces++;
            }
        }
        if(activeSpaces === gameBoard.boardArr.length){
            if(!gameBoard.checkForWinner()){
                winnerText.innerHTML = `${blankSpace(10)}It's a draw!<br>Click <a class = "restart" href="javascript:displayController.restartGame()">here</a> to play again!`;
                gameBoard.updateBoardResult("draw");
            } 
        } else if(activeSpaces % 2 === 0){
            currentPlayer = `${player1.name}`;
            currentToken = `${player1.token}`;
        } else {
            currentPlayer = `${player2.name}`;
            currentToken = `${player2.token}`;
        } 
        return currentPlayer;
    }

    const nextTurn = (winningspace) => {
        //Check if there was a winner first
        if(gameBoard.checkForWinner()){
            winnerText.innerHTML = `${blankSpace(7)}${currentPlayer} has won!<br>Click <a class = "restart" href="javascript:displayController.restartGame()">here</a> to play again!`;
            gameBoard.updateBoardResult(`${currentPlayer}`,winningspace);
            return currentPlayer;
        } else if(getPlayerTurn() === player1.name){
            player1.makeMove();
        } else player2.makeMove();
    }
    
    const placeMarker = () => {
        boardSpaces = document.querySelectorAll(".board-space");
        boardSpaces.forEach(space => {
            space.addEventListener('click',function(){
                if((!space.hasChildNodes()) && (!gameBoard.checkForWinner())){
                playertoken = document.createElement("p");
                playertoken.setAttribute("class","token");
                playertoken.innerHTML = currentToken;
                space.appendChild(playertoken);
                headerText = document.getElementById("header");
                headerText.style = "font-size: 2.5rem;"
                headerText.innerText = `${currentPlayer} places ${currentToken} on space ${Number(space.id[space.id.length-1])+1}`
                gameBoard.boardArr[space.id[space.id.length-1]] = currentToken;
                nextTurn(space.id[space.id.length-1]);
                }
                })
            
            }) 
        }
        return { placeMarker, getPlayerTurn, nextTurn, startGame, restartGame, menuInput, toggleMenu }
})();

//Player Function Factory

const createPlayer = (name, token) => {
    const makeMove = () => {
       displayController.getPlayerTurn();
       displayController.placeMarker();
    }
  return { name, token, makeMove };
};


