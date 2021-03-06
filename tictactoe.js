let playerswitch = true;

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
    const declarePlayerTurn = () => {
    currentPlayer = getPlayerTurn();
    currentToken = undefined;
    if(currentPlayer === "player1"){
        currentToken = "X";
    } else if(currentPlayer === "player2"){
        currentToken = "O";
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
                gameBoard.boardArr.push(currentToken);
                }
                })
            }) 
            
        }
    
        return { placeMarker, declarePlayerTurn }
})();

//Player Function Factory

const createPlayer = (name, token) => {
    const isPlayerTurn = () => {
        if(getPlayerTurn() === name){
            return true;
        } else return false;
    }
    const makeMove = () => {
    
       displayController.placeMarker();
      getPlayerTurn();
    }
  return { name, token, makeMove, isPlayerTurn };
};

function getPlayerTurn(){
    let activeSpaces = 0;
    for(let i = 0; i < gameBoard.boardArr.length; i++){
        if(gameBoard.boardArr[i] === "X" || gameBoard.boardArr[i] === "O"){
            activeSpaces++;
        }
    }
    if(gameBoard.boardArr.length % activeSpaces === 0){
        return "player2";
    } else return "player1";
}


//Render Board And Create Players

gameBoard.renderBoard();
let player1 = createPlayer("player1","X");
let player2 = createPlayer("player2","O");
displayController.declarePlayerTurn();
player1.makeMove();
player2.makeMove();

