const tilesContainer = document.querySelector(".tiles");
const colors = ["aqua", "crimson", "blue", "green", "gold", "greenyellow", "teal", "aquamarine"];
const colorsPickList = [...colors, ...colors];
const tileCount = colorsPickList.length;

//Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndofMove = false;


function buildTile(color){
    const element = document.createElement('div');

    element.classList.add('tile');
    element.setAttribute("data-color", color);
    element.setAttribute("data-reveald", "false");
    
    element.addEventListener('click', () => {
        const revealed = element.getAttribute("data-revealed");


        if(awaitingEndofMove
            || revealed === "true"
            || element === activeTile)
        {
            return;
        }

        element.style.backgroundColor = color;
        if(!activeTile){
            activeTile = element;
            return;
        }

        const colorToMatch = activeTile.getAttribute("data-color");

        if(colorToMatch ===  color){
            activeTile.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");

            activeTile = null; 
            awaitingEndofMove = false;
            revealedCount +=2;

            if(revealedCount === tileCount){
                alert("Congratulations!!! You Win! Refresh to play again.")
            }
            return;
        }

        awaitingEndofMove = true;
        setTimeout(() => {
            activeTile.style.backgroundColor = null;
            element.style.backgroundColor = null;
            awaitingEndofMove = false;
            activeTile = null;
        }, 1000)

    });

    return element;
}



//build tiles
for(let i = 0; i<tileCount; i++){
    const randomIndex = Math.floor(Math.random() * colorsPickList.length);
    const color = colorsPickList[randomIndex];
    const tile = buildTile(color);

    //removes the possibility of generating more than twice
    colorsPickList.splice(randomIndex, 1);
    tilesContainer.appendChild(tile);
}