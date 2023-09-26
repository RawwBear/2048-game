var board;
var rows = 4;
var columns = 4;
var score = 0;
var best = 0;


window.onload = function() {
    setGame();
}


function setGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    
    for (let i=0; i < rows; i++){
        for (let j=0; j < columns; j++){
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            num = board[i][j];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    
    setTwo();
    setTwo();
}


function setTwo(){
    let found = false;
    let row;
    let col;

    while (!found){

        row = Math.floor(Math.random()*rows);
        col = Math.floor(Math.random()*columns);
        if (board[row][col] === 0){
            found = true;
            board[row][col] = 2;
            let tile = document.getElementById(row.toString() + "-" + col.toString());
            updateTile(tile, 2);
        }
        
    }
    if (isGameOver()){
        //make gameover screen to show up 

    }
}


function isGameOver(){
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < columns; j++){
            if (board[i][j] !== 0){
                return false
            }
        }
    }
    return true;
}

function updateTile(tile, num) {
    tile.innerText = ""; 
    tile.classList.value = ""; //clear the classlist because we don't want to have any multiple classes
    tile.classList.add("tile");
    if (num > 1) {
        tile.innerText = num.toString();
        if (num <= 8192){
            tile.classList.add("x" + num.toString());
        }
        else{
            tile.classList.add("x8192");
        }
    }
    document.getElementById("score").innerText = score;
}


document.addEventListener("keyup", (e)=>{
    if (e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    }
    
    if (e.code == "ArrowRight"){
        slideRight();
        setTwo();

    }
    
    if (e.code == "ArrowDown"){
        slideDown();
        setTwo();

    }
    
    if (e.code == "ArrowUp"){
        slideUp();
        setTwo();

    }
})




function filterZero(row){
    return row.filter(num => num > 0); 
}


function slide(row){
    row = filterZero(row); //remove zeros

    for (let i = 0; i < row.length-1; i++){ //sum up values
        if (row[i] === row[i+1]){
            row[i] += row[i+1]
            row[i+1] = 0
            score += row[i];
        }
        
    }

    row = filterZero(row); //remove zeros in between

    //add zeros at the end of the row
    let i = row.length
    while (i < rows){
        row.push(0);
        i++;
    }
    return row;
}

function slideLeft(){
    for (let i = 0; i < rows; i++){
        let row = board[i];
        row = slide(row);
        board[i] = row;

        //upadate look on the website
        for (let j=0; j < columns; j++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            num = board[i][j];
            updateTile(tile, num);
    
        }
    }
}

function slideRight(){
    for (let i = 0; i < rows; i++){
        let row = board[i];
        row = slide(row.reverse());
        board[i] = row.reverse();

        for (let j=0; j < columns; j++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            num = board[i][j];
            updateTile(tile, num);
    
        }
    }
}

function slideUp(){ //similar to left
    for (let j = 0; j < columns; j++){
        let column = []
        for (let i=0; i < rows; i++){
            column.push(board[i][j])
        }
        column = slide(column);
        
        for (let i=0; i < rows;  i++){
            board[i][j] = column[i];
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            num = board[i][j];
            updateTile(tile, num); 
        }
    }
}


function slideDown(){ //similar to right
    for (let j = 0; j < columns; j++ ){
        let column = [];
        for (let i= 0; i < rows; i ++){
            column.push(board[i][j]);
        }

        column = slide(column.reverse())
        column = column.reverse()

        for (let i=0; i < rows;  i++){
            board[i][j] = column[i];
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            num = board[i][j];
            updateTile(tile, num); 
        }

    }
}