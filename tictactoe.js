//Game board module

const gameBoard = (function(){
    const boardArr = new Array(9).fill("");
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
    return { renderBoard, boardArr };
})();

//Display Controller Module

const displayController = (function(){
    const getPlayerTurn = () => {
        activeSpaces = 0;
        for(let i = 0; i < gameBoard.boardArr.length; i++){
            if(gameBoard.boardArr[i] !== ""){
                activeSpaces++;
            }
        }
        if(activeSpaces === gameBoard.boardArr.length){
            console.log('Game Over');
        } else if(activeSpaces % 2 === 0){
            currentPlayer = `${player1.name}`;
            currentToken = `${player1.token}`;
        } else {
            currentPlayer = `${player2.name}`;
            currentToken = `${player2.token}`;
        } 
    }
    
    const placeMarker = () => {
        boardSpaces = document.querySelectorAll(".board-space");
        boardSpaces.forEach(space => {
            space.addEventListener('click',function(){
                if((!space.hasChildNodes())){
                playertoken = document.createElement("p");
                playertoken.setAttribute("class","token");
                playertoken.innerHTML = currentToken;
                space.appendChild(playertoken);
                console.log(`${currentPlayer} places a ${currentToken} placed on ${space.id}`);
                gameBoard.boardArr[space.id[space.id.length-1]] = currentToken;
                nextTurn();
                }
                })
            }) 
        }
        return { placeMarker, getPlayerTurn }
})();

//Player Function Factory

const createPlayer = (name, token) => {
    const makeMove = () => {
       displayController.getPlayerTurn();
       displayController.placeMarker();
    }
  return { name, token, makeMove };
};

//Utiliy Functions

function startGame(){
    gameBoard.renderBoard();
    player1 = createPlayer("player1","X");
    player2 = createPlayer("player2","O");
    nextTurn();
}

function nextTurn(){
    if(displayController.getPlayerTurn() === player1.name){
        player1.makeMove();
    } else player2.makeMove();
}

function gameLoop(){
    const emptySpace = (elem) => elem === "";
    if(gameBoard.boardArr.some(emptySpace)){
        return true;
    }  else return false;
}

//End of Functions


//Start Game

startGame();


