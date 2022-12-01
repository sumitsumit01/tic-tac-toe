const boardState = [
    null, null, null,
    null, null, null,
    null, null, null

];
//win condition array
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],

];
//active player

let activeplayer = 0;

//cell
const cells = document.querySelectorAll("td");

cells.forEach(function (cell, index) {
    cell.dataset.index = index;
    cell.onmouseover = function () {
        cell.style.backgroundColor = "#ccc";
        cell.style.transition = "1s";
    }

    cell.onmouseout = function () {
        cell.style.backgroundColor = "#fff";
    }

    cell.addEventListener("click", clicked);

});

function clicked(event) {

    const index = Number(event.target.dataset.index);
    const letter = activeplayer ? "o" : "x";
    const cell = event.target;
    event.target.textContent = letter;
    boardState[index] = activeplayer;
    cell.removeEventListener("click", clicked);
    cell.onmouseover = null;

    if (hasWon()) {
        window.location = "./winner.html";
    }
    if (hasDraw()) {
        window.location = "./draw.html";
    }
    activeplayer = activeplayer ? 0 : 1;

}

function hasWon() {
    console.clear();
    for (const condition of winCondition) {

        const boardValues = condition.map(function (item) {
            return boardState[item];
        });

        const playerPieces = boardValues.filter(function (item) {

            return item === activeplayer;
        });

        if (playerPieces.length === 3) return true;

    }
    return false;

}

function hasDraw() {
    const boardCapacity = boardState.filter(function (item) {
        return item !== null;
    });
    return boardCapacity.length === boardState.length;
}

const again = document.querySelector("#again");
if (again) {
    again.onclick = (event) => {
        event.preventDefault();
        window.location = "./";
    }
}