//make board in center
let boardElem = document.getElementById('board');

if(window.innerWidth > window.innerHeight){
    //width > height
    
    boardElem.style.width = "90vh";
    boardElem.style.height = "90vh";
}else{
    //width < height
    
    boardElem.style.width = "95vw";
    boardElem.style.height = "95vw";
}

window.onload = maxWindow;

function maxWindow() {
    window.moveTo(0, 0);

    if (document.all) {
        top.window.resizeTo(screen.availWidth, screen.availHeight);
    }

    else if (document.layers || document.getElementById) {
        if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
            top.window.outerHeight = screen.availHeight;
            top.window.outerWidth = screen.availWidth;
        }
    }
}





// document.documentElement.requestFullscreen();

let cellWidth = document.getElementsByClassName('cell')[0].getBoundingClientRect().width;





class DamaPiece{
    // type;
    // isKing;
    // row;
    // column;
    // cellElem;
    // imgElem;
    // eatableTo;
    // canEat;

    constructor(type, isKing, row, column){
        this.type = type;
        this.isKing = isKing;
        this.row = row;
        this.column = column;
        this.cellElem = document.querySelector('.cell[data-row="' + this.row + '"][data-column="' + this.column + '"]');
        this.playableTo = null;
        this.eatableTo = null;
        this.imgElem = null;
        this.canEat = null;
    }

    oppositeOf(damaPiece){
        return (this.type === 'yellow' && damaPiece.type === 'black') || (this.type === 'black' && damaPiece.type === 'yellow');
    }
    
    oppositeType(){
        if(this.type === 'black')
            return 'yellow';
        else if(this.type === 'yellow')
            return 'black';
        else
            throw 'No opposite of null';
    }

    makeEatableTo(damaPiece, canEat){
        //this is a tile
        //damaPiece who can eat
        //canEat who will get eaten

        this.eatableTo = damaPiece;
        this.canEat = canEat;
        this.makePlayableTo(damaPiece);
    }

    makePlayableTo(damaPiece){
        //this is tile

        this.playableTo = damaPiece;
        this.cellElem.classList.add('playable');
    }

    clearPlayable(){
        this.playableTo = null;
        this.eatableTo = null;
        this.canEat = null;
    }

    makeNull(){
        this.type = null;
        this.isKing = false;
        this.clearPlayable();
    }

    eaten(){
        // let j = $(this.imgElem);
        
        // return j.animate({
        //     opacity: "0",
        // }, 500, () => {
        //     this.makeNull();
        // }).promise();

        return TweenMax.to(this.imgElem, 0.5, {
            opacity: 0, 
            onComplete: () => {
                this.makeNull();
            }
        });
    }

    checkKing(){
        if(this.type === 'yellow' && this.row === 0){
            this.isKing = true;
        }else if(this.type === 'black' && this.row === 7){
            this.isKing = true;
        }
    }
}

// class canEat{
//     constructor(){
//
//     }
// }


class Board{
    // boardPieces;
    // turn;
    // canEat; [] of objects
    // yellowImage;
    // yellowKingImage;
    // blackImage;
    // blackKingImage;

    constructor(){
        // let boardColors = [
        //     ['yellow', null, null, null, null, null, null, null],
        //     ['yellow', 'black', 'black', 'black', 'black', null, 'black', null],
        //     ['black', 'black', 'black', 'black', 'black', 'black', 'black', null],
        //     [null, null, null, null, null, null, null, null],
        //     [null, null, 'black', 'yellow', null, null, null, null],
        //     ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', null],
        //     ['black', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', null],
        //     ['black', null, null, null, null, null, null, 'yellow'],
        // ];
        //for Testing

        let boardColors = [
            [null, null, null, null, null, null, null, null],
            ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'],
            ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'],
            // [null, null, null, null, null, null, null, 'black'],
            // [null, null, null, null, null, null, null, null],
            // [null, null, null, null, null, null, null, 'yellow'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
            ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
            [null, null, null, null, null, null, null, null],
        ];
        
        
        this.boardPieces = boardColors.map((rowArray, row) => {
            return rowArray.map((cellItem, column) => {
                if(cellItem === null)
                    return new DamaPiece(null, false, row, column);
                else if(cellItem === 'black')
                    return new DamaPiece('black', false, row, column);
                else if(cellItem === 'yellow')
                    return new DamaPiece('yellow', false, row, column);
            });
        });


        this.turn = 'yellow';

        this.canEatAgain = false;
        
        this.canEat = [];
        
        // this.getDamaPieceOn(7, 7).isKing = true; //FIXME DELETE FOR TESTING ONLY!
        // this.getDamaPieceOn(1, 5).isKing = true; //FIXME DELETE FOR TESTING ONLY!
        // this.getDamaPieceOn(1, 6).isKing = true; //FIXME DELETE FOR TESTING ONLY!
        // this.getDamaPieceOn(2, 6).isKing = true; //FIXME DELETE FOR TESTING ONLY!
        // this.getDamaPieceOn(5, 6).isKing = true; //FIXME DELETE FOR TESTING ONLY!
        // this.getDamaPieceOn(0, 7).isKing = true; //FIXME DELETE FOR TESTING ONLY!

        // let image = new Image();
        // image.src = 'assets/YellowDama.png';
        // image.classList.add('damaPiece');
        // this.yellowImage = image;
        //
        // image = new Image();
        // image.src = 'assets/YellowDamaKing.png';
        // image.classList.add('damaPiece');
        // this.yellowKingImage = image;
        //
        // image = new Image();
        // image.src = 'assets/BlackDama.png';
        // image.classList.add('damaPiece');
        // this.blackImage = image;
        //
        // image = new Image();
        // image.src = 'assets/BlackDamaKing.png';
        // image.classList.add('damaPiece');
        // this.blackKingImage = image;
        
        this.render();
    }

    isTurn(damaPiece) {
        return this.turn === damaPiece.type;
    }
    
    changeTurn(damaPiece){
        if(this.turn === 'yellow')
            this.turn = 'black';
        else
            this.turn = 'yellow';
        
        this.updateCanEat();
    }

    getDamaPieceOn(row, column){
        return this.boardPieces[row][column];
    };
    setDamaPieceOn(damaPiece, row, column){
        // console.log(this.boardPieces);
        let damaPieceNew = new DamaPiece(damaPiece.type, damaPiece.isKing, row, column);
        this.boardPieces[row][column] = damaPieceNew;
        return damaPieceNew;
    };

    // {
    //     damaPiece //who can eat
    //     canEat //who will get eaten
    //     tile //tile to set on
    // }
    
    // pushCanEat(damaPiece, canEat, tile){
    pushCanEat(damaPiece){
        // let object = {
        //     damaPiece: damaPiece,
        //     canEat: canEat,
        //     tile: tile,
        // };

        this.canEat.push(damaPiece);
    }

    updateCanEat(){
        for(let piece of this.canEat){
            if(!this.showEatable(piece, false)){
                //cant eat anymore
                this.removeCanEat(piece);
            }
            
            if(piece.type === null)
                this.removeCanEat(piece);
        }
    }

    getForwardDamaPieceOfYellow(damaPiece){
        let row = damaPiece.row;
        let column = damaPiece.column;

        if(row === 0)
            return null; //means out of bound

        let forwardRow = row - 1;
        let forwardColumn = column;

        return this.getDamaPieceOn(forwardRow, forwardColumn);
    }
    getForwardDamaPieceOfBlack(damaPiece){
        let row = damaPiece.row;
        let column = damaPiece.column;

        if(row === 7)
            return null; //means out of bound

        let forwardRow = row + 1;
        let forwardColumn = column;

        return this.getDamaPieceOn(forwardRow, forwardColumn);
    }
    /**
     *
     * @param damaPiece DamaPiece to look forward of
     * @param steps optional number of steps forward
     * @param base
     * @returns {DamaPiece, null} DamaPiece if inside Board and null if out of bound.
     */
    getForwardDamaPiece(damaPiece, steps = 1, base = damaPiece){
        if(damaPiece == null)
            return null; //out of bound !important

        if(steps === 0){
            return damaPiece;
        }

        if(steps > 0){
            let forwardPiece;
            if(base.type === 'yellow')
                forwardPiece = this.getForwardDamaPieceOfYellow(damaPiece);
            else if(base.type === 'black')
                forwardPiece = this.getForwardDamaPieceOfBlack(damaPiece);
            else
                throw "calling on null dama piece.";

            // console.log(steps - 1);
            // console.log(forwardPiece);
            return this.getForwardDamaPiece(forwardPiece, steps - 1, base);
        }
    }

    getRightDamaPieceOfYellow(damaPiece){
        let row = damaPiece.row;
        let column = damaPiece.column;

        if(column === 7)
            return null; //means out of bound

        let rightRow = row;
        let rightColumn = column + 1;

        return this.getDamaPieceOn(rightRow, rightColumn);
    }
    getRightDamaPieceOfBlack(damaPiece){
        let row = damaPiece.row;
        let column = damaPiece.column;

        if(column === 0)
            return null; //means out of bound

        let rightRow = row;
        let rightColumn = column - 1;

        return this.getDamaPieceOn(rightRow, rightColumn);
    }
    getRightDamaPiece(damaPiece, steps = 1, base = damaPiece){
        if(damaPiece == null)
            return null; //out of bound !important

        if(steps === 0){
            return damaPiece;
        }

        if(steps > 0){
            let rightPiece;
            if(base.type === 'yellow')
                rightPiece = this.getRightDamaPieceOfYellow(damaPiece);
            else if(base.type === 'black')
                rightPiece = this.getRightDamaPieceOfBlack(damaPiece);
            else
                throw "calling on null dama piece.";

            return this.getRightDamaPiece(rightPiece, steps - 1, base);
        }
    }

    getLeftDamaPieceOfYellow(damaPiece){
        let row = damaPiece.row;
        let column = damaPiece.column;

        if(column === 0)
            return null; //means out of bound

        let rightRow = row;
        let rightColumn = column - 1;

        return this.getDamaPieceOn(rightRow, rightColumn);
    }
    getLeftDamaPieceOfBlack(damaPiece){
        let row = damaPiece.row;
        let column = damaPiece.column;

        if(column === 7)
            return null; //means out of bound

        let rightRow = row;
        let rightColumn = column + 1;

        return this.getDamaPieceOn(rightRow, rightColumn);
    }
    getLeftDamaPiece(damaPiece, steps = 1, base = damaPiece){
        if(damaPiece == null)
            return null; //out of bound !important

        if(steps === 0){
            return damaPiece;
        }

        if(steps > 0){
            let leftPiece;
            if(base.type === 'yellow')
                leftPiece = this.getLeftDamaPieceOfYellow(damaPiece);
            else if(base.type === 'black')
                leftPiece = this.getLeftDamaPieceOfBlack(damaPiece);
            else
                throw "calling on null dama piece.";

            return this.getLeftDamaPiece(leftPiece, steps - 1, base);
        }
    }

    getBackwardDamaPieceOfYellow(damaPiece){
        let row = damaPiece.row;
        let column = damaPiece.column;

        if(row === 7)
            return null; //means out of bound

        let backwardRow = row + 1;
        let backwardColumn = column;

        return this.getDamaPieceOn(backwardRow, backwardColumn);
    }
    getBackwardDamaPieceOfBlack(damaPiece){
        let row = damaPiece.row;
        let column = damaPiece.column;

        if(row === 0)
            return null; //means out of bound

        let backwardRow = row - 1;
        let backwardColumn = column;

        return this.getDamaPieceOn(backwardRow, backwardColumn);
    }
    getBackwardDamaPiece(damaPiece, steps = 1, base = damaPiece){
        if(damaPiece == null)
            return null; //out of bound !important

        if(steps === 0){
            return damaPiece;
        }

        if(steps > 0){
            let backwardPiece;
            if(base.type === 'yellow')
                backwardPiece = this.getBackwardDamaPieceOfYellow(damaPiece);
            else if(base.type === 'black')
                backwardPiece = this.getBackwardDamaPieceOfBlack(damaPiece);
            else
                throw "calling on null dama piece.";

            return this.getBackwardDamaPiece(backwardPiece, steps - 1, base);
        }
    }

    getPlayableTo(damaPiece){
        let cellElem = damaPiece.cellElem;
        let playableTo = $(cellElem).data('playable');

        if(playableTo !== "")
            return playableTo;
        else
            return null;
    }

    removeCanEat(damaPiece){
        this.canEat = this.canEat.filter(e => e !== damaPiece);
    }

    //FIXME:: STORE PLAYABLE TILES AND ONLY CLEAR THOSE;
    clearAllPlayable(){
        this.boardPieces.forEach(function(row) {
            row.forEach(function(damaPiece) {
                damaPiece.clearPlayable();
            });
        });
        let playable = $('.playable');
        playable.removeClass('playable');
        
    }

    relationBetween(damaPiece, tile){
        if(damaPiece.row < tile.row){
            return 'above';
        }
        if(damaPiece.row > tile.row){
            return 'below';
        }
        if(damaPiece.column > tile.column){
            return 'right';
        }
        if(damaPiece.column < tile.column){
            return 'left';
        }
    }

    diffBetweenDamaPieces(damaPiece1, damaPiece2){
        let damaPiece1Bounding = damaPiece1.cellElem.getBoundingClientRect();
        let damaPiece2Bounding = damaPiece2.cellElem.getBoundingClientRect();

        let diffX = damaPiece1Bounding.x - damaPiece2Bounding.x;
        let diffY = damaPiece1Bounding.y - damaPiece2Bounding.y;

        return {
            x: diffX,
            y: diffY,
        };
    }

    
    
    onMove(damaPiece, tile){
        let newRow = tile.row;
        let newColumn = tile.column;

        let oldRow = damaPiece.row;
        let oldColumn = damaPiece.column;

        let newDamaPiece = this.getDamaPieceOn(newRow, newColumn);
        
        newDamaPiece.checkKing();
        // console.log(newDamaPiece);
        
        if(!this.canEatAgain){
            this.changeTurn();
        }
        this.checkCanEat(newRow, newColumn, oldRow, oldColumn);
        // this.changeTurn();
        // this.checkCanEat(newRow, newColumn, oldRow, oldColumn);
        
        this.render();
    }

    move(damaPiece, tile){
        let imgElem = damaPiece.imgElem;
        
        let diff = this.diffBetweenDamaPieces(damaPiece, tile);
        let animationObj = {
            bottom: diff.y,
            right: diff.x,
            lazy: true,
            onComplete: () => {
                this.setDamaPieceOn(damaPiece, tile.row, tile.column);
                this.setDamaPieceOn(tile, damaPiece.row, damaPiece.column);
            },
        };
        this.clearAllPlayable();

        // let newRow = tile.row;
        // let newColumn = tile.column;
        //
        // let oldRow = damaPiece.row;
        // let oldColumn = damaPiece.column;
        
        // animate
        // return $(imgElem).animate(animationObj, 300, () => {
        //     this.setDamaPieceOn(damaPiece, tile.row, tile.column);
        //     this.setDamaPieceOn(tile, damaPiece.row, damaPiece.column);
        // }).promise();
        
        return TweenMax.to(imgElem, 0.3, animationObj);
        // $(imgElem).animate(animationObj, 300, () => {
        //     this.setDamaPieceOn(damaPiece, tile.row, tile.column);
        //     this.setDamaPieceOn(tile, damaPiece.row, damaPiece.column);
        // }).promise();


    }
    
    showFreeSpaceToMoveForKing(damaPiece, direction, base = damaPiece){
        let tile;
        let directions = ['forward', 'backward', 'right', 'left'];

        for(let direction of directions){
            if(direction === 'forward')
                tile = this.getForwardDamaPiece(damaPiece, 1, base);
            else if(direction === 'backward')
                tile = this.getBackwardDamaPiece(damaPiece, 1, base);
            else if(direction === 'right')
                tile = this.getRightDamaPiece(damaPiece, 1, base);
            else if(direction === 'left')
                tile = this.getLeftDamaPiece(damaPiece, 1, base);

            while(tile !== null && tile.type === null){
                tile.makePlayableTo(base);

                if(direction === 'forward')
                    tile = this.getForwardDamaPiece(tile, 1, base);
                else if(direction === 'backward')
                    tile = this.getBackwardDamaPiece(tile, 1, base);
                else if(direction === 'right')
                    tile = this.getRightDamaPiece(tile, 1, base);
                else if(direction === 'left')
                    tile = this.getLeftDamaPiece(tile, 1, base);
            }
        }
    }

    showFreeSpaceToMoveForMan(damaPiece) {
        let forwardPiece = this.getForwardDamaPiece(damaPiece);
        let rightPiece = this.getRightDamaPiece(damaPiece);
        let leftPiece = this.getLeftDamaPiece(damaPiece);

        let surroundingPieces = [forwardPiece, rightPiece, leftPiece];
        for(let tile of surroundingPieces){
            if(tile === null) //out of bound
                continue;

            if(tile.type === null)
                tile.makePlayableTo(damaPiece);
        }
    }

    fakePlayable(damaPiece){
        damaPiece.cellElem.classList.add('playable');
    }

    showFreeSpaceToMove(damaPiece) {
        this.clearAllPlayable();

        if(damaPiece === null)
            throw "Calling on null dama piece!";

        // this.fakePlayable(damaPiece);
        if(damaPiece.isKing === false){
            this.showFreeSpaceToMoveForMan(damaPiece);
        }else if(damaPiece.isKing === true){
            this.showFreeSpaceToMoveForKing(damaPiece);
        }

    }
    
    firstEncounterForward(damaPiece, base = damaPiece){
        let surroundingPiece = this.getForwardDamaPiece(damaPiece, 1, base);
        // console.log(forwardPiece);
        if(surroundingPiece === null)
            return null;
        
        if(surroundingPiece.type === null)
            return this.firstEncounterForward(surroundingPiece, base);
        else if(surroundingPiece.type !== null)
            return surroundingPiece;
    }
    firstEncounterBackward(damaPiece, base = damaPiece){
        let surroundingPiece = this.getBackwardDamaPiece(damaPiece, 1, base);
        // console.log(forwardPiece);
        if(surroundingPiece === null)
            return null;

        if(surroundingPiece.type === null)
            return this.firstEncounterBackward(surroundingPiece, base);
        else if(surroundingPiece.type !== null)
            return surroundingPiece;
    }
    firstEncounterRight(damaPiece, base = damaPiece){
        let surroundingPiece = this.getRightDamaPiece(damaPiece, 1, base);
        // console.log(forwardPiece);
        if(surroundingPiece === null)
            return null;

        if(surroundingPiece.type === null)
            return this.firstEncounterRight(surroundingPiece, base);
        else if(surroundingPiece.type !== null)
            return surroundingPiece;
    }
    firstEncounterLeft(damaPiece, base = damaPiece){
        let surroundingPiece = this.getLeftDamaPiece(damaPiece, 1, base);
        // console.log(forwardPiece);
        if(surroundingPiece === null)
            return null;

        if(surroundingPiece.type === null)
            return this.firstEncounterLeft(surroundingPiece, base);
        else if(surroundingPiece.type !== null)
            return surroundingPiece;
    }
    
    showEatableForKing(damaPiece, show = true){
        // console.log(damaPiece);
        let canEat = false;
        
        let forwardPiece = this.firstEncounterForward(damaPiece);
        let doubleForwardPiece = this.getForwardDamaPiece(forwardPiece, 1, damaPiece);
        let forwardNotNull = forwardPiece !== null && doubleForwardPiece !== null;

        let backwardPiece = this.firstEncounterBackward(damaPiece);
        let doubleBackwardPiece = this.getBackwardDamaPiece(backwardPiece, 1, damaPiece);
        let backwardNotNull = backwardPiece !== null && doubleBackwardPiece !== null;

        let rightPiece = this.firstEncounterRight(damaPiece);
        let doubleRightPiece = this.getRightDamaPiece(rightPiece, 1, damaPiece);
        let rightNotNull = rightPiece !== null && doubleRightPiece !== null;

        let leftPiece = this.firstEncounterLeft(damaPiece);
        let doubleLeftPiece = this.getLeftDamaPiece(leftPiece, 1, damaPiece);
        let leftNotNull = leftPiece !== null && doubleLeftPiece !== null;

        // console.log(forwardPiece, backwardPiece, rightPiece, leftPiece);
        // console.log(doubleForwardPiece, doubleBackwardPiece, doubleRightPiece, doubleLeftPiece);
        
        if(forwardNotNull && forwardPiece.oppositeOf(damaPiece) && doubleForwardPiece.type === null){
            // console.log('can eat:', forwardPiece);

            while(doubleForwardPiece !== null && doubleForwardPiece.type === null){
                if(show === true)
                    doubleForwardPiece.makeEatableTo(damaPiece, forwardPiece);
                canEat = true;

                doubleForwardPiece = this.getForwardDamaPiece(doubleForwardPiece, 1, damaPiece);
            }
        }
        
        if(backwardNotNull && backwardPiece.oppositeOf(damaPiece) && doubleBackwardPiece.type === null){
            while(doubleBackwardPiece !== null && doubleBackwardPiece.type === null){
                if(show === true)
                    doubleBackwardPiece.makeEatableTo(damaPiece, backwardPiece);
                canEat = true;

                doubleBackwardPiece = this.getBackwardDamaPiece(doubleBackwardPiece, 1, damaPiece);
            }
        }

        if(rightNotNull && rightPiece.oppositeOf(damaPiece) && doubleRightPiece.type === null){
            while(doubleRightPiece !== null && doubleRightPiece.type === null){
                if(show === true)
                    doubleRightPiece.makeEatableTo(damaPiece, rightPiece);
                canEat = true;

                doubleRightPiece = this.getRightDamaPiece(doubleRightPiece, 1, damaPiece);
            }
        }

        if(leftNotNull && leftPiece.oppositeOf(damaPiece) && doubleLeftPiece.type === null){
            while(doubleLeftPiece !== null && doubleLeftPiece.type === null){
                if(show === true)
                    doubleLeftPiece.makeEatableTo(damaPiece, leftPiece);
                canEat = true;

                doubleLeftPiece = this.getLeftDamaPiece(doubleLeftPiece, 1, damaPiece);
            }
        }
        
        return canEat;
        
        // let directions = ['forward', 'backward', 'right', 'left']; //TODO HAVE (this.firstEncounter) (this.get-DIR-DamaPiece) accepet direction as String to use loops
        //
        // for(let direction of directions){
        //     let piece = this.firstEncounterForward(damaPiece);
        //     let doublePiece = this.getForwardDamaPiece(forwardPiece, 1, damaPiece);
        //     let piecesNotNull = piece !== null && doublePiece !== null;
        // }
    }
    
    showEatableForMan(damaPiece, show = true){
        let canEat = false;
        let forwardPiece = this.getForwardDamaPiece(damaPiece);
        let doubleForwardPiece = this.getForwardDamaPiece(forwardPiece, 1, damaPiece);
        let rightPiece = this.getRightDamaPiece(damaPiece);
        let doubleRightPiece = this.getRightDamaPiece(rightPiece, 1, damaPiece);
        let leftPiece = this.getLeftDamaPiece(damaPiece);
        let doubleLeftPiece = this.getLeftDamaPiece(leftPiece, 1, damaPiece);

        let surroundingPieces = [forwardPiece, rightPiece, leftPiece];
        let doubleSurroundingPieces = [doubleForwardPiece, doubleRightPiece, doubleLeftPiece];

        for(let i = 0; i < surroundingPieces.length; i++){
            let surroundingPiece = surroundingPieces[i];
            let doubleSurroundingPiece = doubleSurroundingPieces[i];

            if(surroundingPiece === null) //out of bound
                continue;

            if (surroundingPiece.type !== null && surroundingPiece.oppositeOf(damaPiece) && doubleSurroundingPiece !== null && doubleSurroundingPiece.type === null) {
                if(show === true)
                    doubleSurroundingPiece.makeEatableTo(damaPiece, surroundingPiece);
                canEat = true;
            }
            // this.makePlayable(tile, damaPiece);
        }
        
        return canEat;
    }
    
    showEatable(damaPiece, show = true){
        this.clearAllPlayable();

        let canEat = false;

        if(damaPiece === null)
            throw "Calling on null";

        if(damaPiece.type === null)
            return false;

        if(damaPiece.isKing === false){
            canEat = this.showEatableForMan(damaPiece, show);
        }else if(damaPiece.isKing === true){
            canEat = this.showEatableForKing(damaPiece, show);
        }

        return canEat;
    }
    
    checkCanEat(newRow, newColumn, oldRow, oldColumn){
        let toCheck = [];
        
        for(let piece of this.boardPieces[newRow]){
            //check on newRow
            toCheck.push(piece);
            // console.log(piece);
        }
        
        for(let row = 0; row < 8; row++){
            //check on newColumn
            if(row === newRow)
                continue; //to prevent checking twice
            
            let piece = this.getDamaPieceOn(row, newColumn);
            toCheck.push(piece);
        }
        
        if(newRow === oldRow) {
            //check 2 column 1 row -- moved horizontally
            //check oldColumn
            for (let row = 0; row < 8; row++) {
                //check on newColumn
                let piece = this.getDamaPieceOn(row, oldColumn);
                toCheck.push(piece);
            }
        }else{
            //check 1 column 2 row -- moved verticaly
            //check oldRow
            for (let piece of this.boardPieces[oldRow])
                toCheck.push(piece);
        }

        for (let piece of toCheck) {
            // if(this.isTurn(piece) && this.showEatable(piece, false)) {
            if(this.showEatable(piece, false)) {
                this.pushCanEat(piece);
                // console.log(this.canEat);
            }
        }
    }
    
    typeCanEat(type){
        for(let piece of this.canEat){
            if(piece.type === type) {
                return true;
            }
        }
    }

    handleClickDamaPiece(damaPiece){
        if(damaPiece.type === this.turn) {
            if(this.canEat.length !== 0 && this.typeCanEat(damaPiece.type)){
                //some dama piece can eat
                if (this.canEat.includes(damaPiece)) {
                    //should eat
                    this.showEatable(damaPiece);
                }
            }else{
                let canEat = this.showEatable(damaPiece);
                if (!canEat)
                    this.showFreeSpaceToMove(damaPiece);
            }
        }
    }

    handleClickTile(tile){
        let playableTo = tile.playableTo;

        if(playableTo !== null){
            if(tile.canEat !== null){
                //has eaten, remove from this.canEat
                let damaPiece = tile.eatableTo; //who can eat
                this.removeCanEat(damaPiece);
                
                var eaten = tile.canEat.eaten();
            }
            // else{
            //     this.canEatAgain = false;
            // }
            
            var moved = this.move(playableTo, tile);

            $.when(eaten, moved).then(() => {
                if(eaten !== undefined){
                    let damaPiece = this.getDamaPieceOn(tile.row, tile.column);
                    this.canEatAgain = this.showEatable(damaPiece, false);
                }
                
                this.onMove(playableTo, tile);
            });
        }
    }

    handleClick(row, column){
        let damaPiece = this.getDamaPieceOn(row, column);

        if(damaPiece.type !== null) {
            this.handleClickDamaPiece(damaPiece);
        }else{
            this.handleClickTile(damaPiece);
        }
    }

    setImage(damaPiece) {
        let image = new Image();
        image.classList.add('damaPiece');
        if(damaPiece.type === 'black') {
            image.classList.add('blackDamaPiece');
        }

        if (damaPiece.type === null) {
            return;
        }

        if(damaPiece.type === 'black') {
            if (damaPiece.isKing)
                image.src = 'assets/BlackDamaKing-m-min.png';
            else
                image.src = 'assets/BlackDama-m-min.png';
        }else if(damaPiece.type === 'yellow') {
            if (damaPiece.isKing)
                image.src = 'assets/YellowDamaKing-m-min.png';
            else
                image.src = 'assets/YellowDama-m-min.png';
        }
        
        damaPiece.cellElem.append(image); //FIXME NOOOWW!!!!!
        // console.log($(damaPiece.cellElem).append('<div class="circle"></div>').children()[0]);
        
        damaPiece.imgElem = image;
        // damaPiece.imgElem = $(damaPiece.cellElem).append('<div class="circle"></div>').children()[0]; //FIXME :: image
    }
    clearImages(){
        $('.damaPiece').remove();
    }

    checkWin(yellowCount, blackCount){
        let wonText = null;
        if(yellowCount === 0){
            wonText = 'فاز الأسود!';
        }else if(blackCount === 0){
            wonText = 'فاز الأصفر!';
        }
        
        if(wonText !== null)
            $('#winner').css({
                display: 'flex'
            });
        
        $('#winner').append(wonText);
        
        console.log(wonText);
    }

    render(){
        let blackCount = 0;
        let yellowCount = 0;
        this.clearImages();

        for(let row = 0; row < this.boardPieces.length; row++){
            let boardPiecesRow = this.boardPieces[row];
            for(let column = 0; column < boardPiecesRow.length; column++) {
                let damaPiece = this.boardPieces[row][column];
                if(damaPiece.type === 'black')
                    blackCount++;
                if(damaPiece.type === 'yellow')
                    yellowCount++;
                this.setImage(damaPiece);
            }
        }

        this.checkWin(yellowCount, blackCount);
    }
    
    renderPiece(damaPiece){
        this.clearImages();

        for(let row = 0; row < this.boardPieces.length; row++){
            let boardPiecesRow = this.boardPieces[row];
            for(let column = 0; column < boardPiecesRow.length; column++) {
                let damaPiece = this.boardPieces[row][column];
                this.setImage(damaPiece);
            }
        }
    }

}

let boardObj = new Board();
//
// document.getElementsByTagName('body').ontouchstart = (e) => {
//     alert('tock');
//     e.preventDefault();
// };

//handle on click on  cell's
$('.cell').click(function (e) {
    let row = $(this).data('row');
    let column = $(this).data('column');

    boardObj.handleClick(row, column);
});
