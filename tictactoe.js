//Game board module

const gameBoard = (function(){
    const boardArr = new Array(9).fill("");
    const numToWin = Math.floor(Math.sqrt(boardArr.length));
    const renderBoard = () => {
        //Render Board to HTML
        const board = document.getElementById("board");
        let spaceID = 0;
        const lineType = "2px solid white";
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
    const isDimensionWinner = (dim) => {
        gameArr = [];
        if(dim === "row"){
            for(let i = 0; i < boardArr.length; i+=numToWin){
            gameArr.push(boardArr.slice(i,i+numToWin));
            }
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
    const changeBoardColors = () => {
        
    }
    return { renderBoard, boardArr, isDimensionWinner, checkForWinner, changeBoardColors };
})();

//Display Controller Module

const displayController = (function(){
    const winnerText = document.getElementById("winnerText");
    const getPlayerTurn = () => {
        activeSpaces = 0;
        for(let i = 0; i < gameBoard.boardArr.length; i++){
            if(gameBoard.boardArr[i] !== ""){
                activeSpaces++;
            }
        }
        if(activeSpaces === gameBoard.boardArr.length){
            if(!gameBoard.checkForWinner()){
                winnerText.innerHTML = `${blankSpace(4)}It's a CAT! (uh, that means tie...)<br>${blankSpace(7)}Click <a id = "restart" href="javascript:restartGame()">here</a> to play again!`;
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
        if(gameBoard.checkForWinner()){
            winnerText.innerHTML = `${blankSpace(7)}${currentPlayer} has won!<br>Click <a id = "restart" href="javascript:restartGame()">here</a> to play again!`;
            tokens = document.querySelectorAll(".board-space");
            console.log(tokens);
            // if(gameBoard.isDimensionWinner("row")){
            //    switch(Number(winningspace)){
            //        case 0:
            //        case 1:
            //        case 2:
            //           tokens[0].style = `color: green`;
            //           tokens[1].style = `color: green`;
            //           tokens[2].style = `color: green`;
            //           break;
            //        case 3:
            //        case 4:
            //        case 5:
            //            tokens[3].style = `color: green`;
            //            tokens[4].style = `color: green`;
            //            tokens[5].style = `color: green`;
            //            break;
            //         case 6:
            //         case 7:
            //         case 8:
            //             tokens[6].style = `color: green`;
            //             tokens[7].style = `color: green`;
            //             tokens[8].style = `color: green`;
            //             break;
            //    }
            // }
            
            return currentPlayer;
        }
        if(getPlayerTurn() === player1.name){
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
                console.log(`${currentPlayer} places a ${currentToken} on square ${space.id}`);
                gameBoard.boardArr[space.id[space.id.length-1]] = currentToken;
                nextTurn(space.id[space.id.length-1]);
                }
                })
            }) 
        }
        return { placeMarker, getPlayerTurn, nextTurn }
})();

//Player Function Factory

const createPlayer = (name, token) => {
    const makeMove = () => {
       displayController.getPlayerTurn();
       displayController.placeMarker();
    }
  return { name, token, makeMove };
};

//Utility Functions

function startGame(){
    gameBoard.renderBoard();
    player1 = createPlayer("player1","X");
    player2 = createPlayer("player2","O");
    displayController.nextTurn();
}

function restartGame(){
    location.reload();
}

function blankSpace(num){
    spaceStr = "";
    for(let i = 0; i < num; i++){
        spaceStr += "&nbsp;"
    }
    return spaceStr;
}

function chunkArrayInGroups(arr, size) {
    let newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

//End of Functions

//Start Game

startGame();




// function gameLoop(){
//     const emptySpace = (elem) => elem === "";
//     if(gameBoard.boardArr.some(emptySpace)){
//         return true;
//     }  else return false;
// }