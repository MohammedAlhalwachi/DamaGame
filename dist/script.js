"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//make board in center
var boardElem = document.getElementById('board');

if (window.innerWidth > window.innerHeight) {
  //width > height
  boardElem.style.width = "90vh";
  boardElem.style.height = "90vh";
} else {
  //width < height
  boardElem.style.width = "95vw";
  boardElem.style.height = "95vw";
}

window.onload = maxWindow;

function maxWindow() {
  window.moveTo(0, 0);

  if (document.all) {
    top.window.resizeTo(screen.availWidth, screen.availHeight);
  } else if (document.layers || document.getElementById) {
    if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
      top.window.outerHeight = screen.availHeight;
      top.window.outerWidth = screen.availWidth;
    }
  }
} // document.documentElement.requestFullscreen();


var cellWidth = document.getElementsByClassName('cell')[0].getBoundingClientRect().width;

var DamaPiece =
/*#__PURE__*/
function () {
  // type;
  // isKing;
  // row;
  // column;
  // cellElem;
  // imgElem;
  // eatableTo;
  // canEat;
  function DamaPiece(type, isKing, row, column) {
    _classCallCheck(this, DamaPiece);

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

  _createClass(DamaPiece, [{
    key: "oppositeOf",
    value: function oppositeOf(damaPiece) {
      return this.type === 'yellow' && damaPiece.type === 'black' || this.type === 'black' && damaPiece.type === 'yellow';
    }
  }, {
    key: "oppositeType",
    value: function oppositeType() {
      if (this.type === 'black') return 'yellow';else if (this.type === 'yellow') return 'black';else throw 'No opposite of null';
    }
  }, {
    key: "makeEatableTo",
    value: function makeEatableTo(damaPiece, canEat) {
      //this is a tile
      //damaPiece who can eat
      //canEat who will get eaten
      this.eatableTo = damaPiece;
      this.canEat = canEat;
      this.makePlayableTo(damaPiece);
    }
  }, {
    key: "makePlayableTo",
    value: function makePlayableTo(damaPiece) {
      //this is tile
      this.playableTo = damaPiece;
      this.cellElem.classList.add('playable');
    }
  }, {
    key: "clearPlayable",
    value: function clearPlayable() {
      this.playableTo = null;
      this.eatableTo = null;
      this.canEat = null;
    }
  }, {
    key: "makeNull",
    value: function makeNull() {
      this.type = null;
      this.isKing = false;
      this.clearPlayable();
    }
  }, {
    key: "eaten",
    value: function eaten() {
      var _this = this;

      // let j = $(this.imgElem);
      // return j.animate({
      //     opacity: "0",
      // }, 500, () => {
      //     this.makeNull();
      // }).promise();
      return TweenMax.to(this.imgElem, 0.5, {
        opacity: 0,
        onComplete: function onComplete() {
          _this.makeNull();
        }
      });
    }
  }, {
    key: "checkKing",
    value: function checkKing() {
      if (this.type === 'yellow' && this.row === 0) {
        this.isKing = true;
      } else if (this.type === 'black' && this.row === 7) {
        this.isKing = true;
      }
    }
  }]);

  return DamaPiece;
}(); // class canEat{
//     constructor(){
//
//     }
// }


var Board =
/*#__PURE__*/
function () {
  // boardPieces;
  // turn;
  // canEat; [] of objects
  // yellowImage;
  // yellowKingImage;
  // blackImage;
  // blackKingImage;
  function Board() {
    _classCallCheck(this, Board);

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
    var boardColors = [[null, null, null, null, null, null, null, null], ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'], ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'], // [null, null, null, null, null, null, null, 'black'],
    // [null, null, null, null, null, null, null, null],
    // [null, null, null, null, null, null, null, 'yellow'],
    [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'], ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'], [null, null, null, null, null, null, null, null]];
    this.boardPieces = boardColors.map(function (rowArray, row) {
      return rowArray.map(function (cellItem, column) {
        if (cellItem === null) return new DamaPiece(null, false, row, column);else if (cellItem === 'black') return new DamaPiece('black', false, row, column);else if (cellItem === 'yellow') return new DamaPiece('yellow', false, row, column);
      });
    });
    this.turn = 'yellow';
    this.canEatAgain = false;
    this.canEat = []; // this.getDamaPieceOn(7, 7).isKing = true; //FIXME DELETE FOR TESTING ONLY!
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

  _createClass(Board, [{
    key: "isTurn",
    value: function isTurn(damaPiece) {
      return this.turn === damaPiece.type;
    }
  }, {
    key: "changeTurn",
    value: function changeTurn(damaPiece) {
      if (this.turn === 'yellow') this.turn = 'black';else this.turn = 'yellow';
      this.updateCanEat();
    }
  }, {
    key: "getDamaPieceOn",
    value: function getDamaPieceOn(row, column) {
      return this.boardPieces[row][column];
    }
  }, {
    key: "setDamaPieceOn",
    value: function setDamaPieceOn(damaPiece, row, column) {
      // console.log(this.boardPieces);
      var damaPieceNew = new DamaPiece(damaPiece.type, damaPiece.isKing, row, column);
      this.boardPieces[row][column] = damaPieceNew;
      return damaPieceNew;
    }
  }, {
    key: "pushCanEat",
    // {
    //     damaPiece //who can eat
    //     canEat //who will get eaten
    //     tile //tile to set on
    // }
    // pushCanEat(damaPiece, canEat, tile){
    value: function pushCanEat(damaPiece) {
      // let object = {
      //     damaPiece: damaPiece,
      //     canEat: canEat,
      //     tile: tile,
      // };
      this.canEat.push(damaPiece);
    }
  }, {
    key: "updateCanEat",
    value: function updateCanEat() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.canEat[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var piece = _step.value;

          if (!this.showEatable(piece, false)) {
            //cant eat anymore
            this.removeCanEat(piece);
          }

          if (piece.type === null) this.removeCanEat(piece);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "getForwardDamaPieceOfYellow",
    value: function getForwardDamaPieceOfYellow(damaPiece) {
      var row = damaPiece.row;
      var column = damaPiece.column;
      if (row === 0) return null; //means out of bound

      var forwardRow = row - 1;
      var forwardColumn = column;
      return this.getDamaPieceOn(forwardRow, forwardColumn);
    }
  }, {
    key: "getForwardDamaPieceOfBlack",
    value: function getForwardDamaPieceOfBlack(damaPiece) {
      var row = damaPiece.row;
      var column = damaPiece.column;
      if (row === 7) return null; //means out of bound

      var forwardRow = row + 1;
      var forwardColumn = column;
      return this.getDamaPieceOn(forwardRow, forwardColumn);
    }
    /**
     *
     * @param damaPiece DamaPiece to look forward of
     * @param steps optional number of steps forward
     * @param base
     * @returns {DamaPiece, null} DamaPiece if inside Board and null if out of bound.
     */

  }, {
    key: "getForwardDamaPiece",
    value: function getForwardDamaPiece(damaPiece) {
      var steps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : damaPiece;
      if (damaPiece == null) return null; //out of bound !important

      if (steps === 0) {
        return damaPiece;
      }

      if (steps > 0) {
        var forwardPiece;
        if (base.type === 'yellow') forwardPiece = this.getForwardDamaPieceOfYellow(damaPiece);else if (base.type === 'black') forwardPiece = this.getForwardDamaPieceOfBlack(damaPiece);else throw "calling on null dama piece."; // console.log(steps - 1);
        // console.log(forwardPiece);

        return this.getForwardDamaPiece(forwardPiece, steps - 1, base);
      }
    }
  }, {
    key: "getRightDamaPieceOfYellow",
    value: function getRightDamaPieceOfYellow(damaPiece) {
      var row = damaPiece.row;
      var column = damaPiece.column;
      if (column === 7) return null; //means out of bound

      var rightRow = row;
      var rightColumn = column + 1;
      return this.getDamaPieceOn(rightRow, rightColumn);
    }
  }, {
    key: "getRightDamaPieceOfBlack",
    value: function getRightDamaPieceOfBlack(damaPiece) {
      var row = damaPiece.row;
      var column = damaPiece.column;
      if (column === 0) return null; //means out of bound

      var rightRow = row;
      var rightColumn = column - 1;
      return this.getDamaPieceOn(rightRow, rightColumn);
    }
  }, {
    key: "getRightDamaPiece",
    value: function getRightDamaPiece(damaPiece) {
      var steps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : damaPiece;
      if (damaPiece == null) return null; //out of bound !important

      if (steps === 0) {
        return damaPiece;
      }

      if (steps > 0) {
        var rightPiece;
        if (base.type === 'yellow') rightPiece = this.getRightDamaPieceOfYellow(damaPiece);else if (base.type === 'black') rightPiece = this.getRightDamaPieceOfBlack(damaPiece);else throw "calling on null dama piece.";
        return this.getRightDamaPiece(rightPiece, steps - 1, base);
      }
    }
  }, {
    key: "getLeftDamaPieceOfYellow",
    value: function getLeftDamaPieceOfYellow(damaPiece) {
      var row = damaPiece.row;
      var column = damaPiece.column;
      if (column === 0) return null; //means out of bound

      var rightRow = row;
      var rightColumn = column - 1;
      return this.getDamaPieceOn(rightRow, rightColumn);
    }
  }, {
    key: "getLeftDamaPieceOfBlack",
    value: function getLeftDamaPieceOfBlack(damaPiece) {
      var row = damaPiece.row;
      var column = damaPiece.column;
      if (column === 7) return null; //means out of bound

      var rightRow = row;
      var rightColumn = column + 1;
      return this.getDamaPieceOn(rightRow, rightColumn);
    }
  }, {
    key: "getLeftDamaPiece",
    value: function getLeftDamaPiece(damaPiece) {
      var steps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : damaPiece;
      if (damaPiece == null) return null; //out of bound !important

      if (steps === 0) {
        return damaPiece;
      }

      if (steps > 0) {
        var leftPiece;
        if (base.type === 'yellow') leftPiece = this.getLeftDamaPieceOfYellow(damaPiece);else if (base.type === 'black') leftPiece = this.getLeftDamaPieceOfBlack(damaPiece);else throw "calling on null dama piece.";
        return this.getLeftDamaPiece(leftPiece, steps - 1, base);
      }
    }
  }, {
    key: "getBackwardDamaPieceOfYellow",
    value: function getBackwardDamaPieceOfYellow(damaPiece) {
      var row = damaPiece.row;
      var column = damaPiece.column;
      if (row === 7) return null; //means out of bound

      var backwardRow = row + 1;
      var backwardColumn = column;
      return this.getDamaPieceOn(backwardRow, backwardColumn);
    }
  }, {
    key: "getBackwardDamaPieceOfBlack",
    value: function getBackwardDamaPieceOfBlack(damaPiece) {
      var row = damaPiece.row;
      var column = damaPiece.column;
      if (row === 0) return null; //means out of bound

      var backwardRow = row - 1;
      var backwardColumn = column;
      return this.getDamaPieceOn(backwardRow, backwardColumn);
    }
  }, {
    key: "getBackwardDamaPiece",
    value: function getBackwardDamaPiece(damaPiece) {
      var steps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : damaPiece;
      if (damaPiece == null) return null; //out of bound !important

      if (steps === 0) {
        return damaPiece;
      }

      if (steps > 0) {
        var backwardPiece;
        if (base.type === 'yellow') backwardPiece = this.getBackwardDamaPieceOfYellow(damaPiece);else if (base.type === 'black') backwardPiece = this.getBackwardDamaPieceOfBlack(damaPiece);else throw "calling on null dama piece.";
        return this.getBackwardDamaPiece(backwardPiece, steps - 1, base);
      }
    }
  }, {
    key: "getPlayableTo",
    value: function getPlayableTo(damaPiece) {
      var cellElem = damaPiece.cellElem;
      var playableTo = $(cellElem).data('playable');
      if (playableTo !== "") return playableTo;else return null;
    }
  }, {
    key: "removeCanEat",
    value: function removeCanEat(damaPiece) {
      this.canEat = this.canEat.filter(function (e) {
        return e !== damaPiece;
      });
    } //FIXME:: STORE PLAYABLE TILES AND ONLY CLEAR THOSE;

  }, {
    key: "clearAllPlayable",
    value: function clearAllPlayable() {
      this.boardPieces.forEach(function (row) {
        row.forEach(function (damaPiece) {
          damaPiece.clearPlayable();
        });
      });
      var playable = $('.playable');
      playable.removeClass('playable');
    }
  }, {
    key: "relationBetween",
    value: function relationBetween(damaPiece, tile) {
      if (damaPiece.row < tile.row) {
        return 'above';
      }

      if (damaPiece.row > tile.row) {
        return 'below';
      }

      if (damaPiece.column > tile.column) {
        return 'right';
      }

      if (damaPiece.column < tile.column) {
        return 'left';
      }
    }
  }, {
    key: "diffBetweenDamaPieces",
    value: function diffBetweenDamaPieces(damaPiece1, damaPiece2) {
      var damaPiece1Bounding = damaPiece1.cellElem.getBoundingClientRect();
      var damaPiece2Bounding = damaPiece2.cellElem.getBoundingClientRect();
      var diffX = damaPiece1Bounding.x - damaPiece2Bounding.x;
      var diffY = damaPiece1Bounding.y - damaPiece2Bounding.y;
      return {
        x: diffX,
        y: diffY
      };
    }
  }, {
    key: "onMove",
    value: function onMove(damaPiece, tile) {
      var newRow = tile.row;
      var newColumn = tile.column;
      var oldRow = damaPiece.row;
      var oldColumn = damaPiece.column;
      var newDamaPiece = this.getDamaPieceOn(newRow, newColumn);
      newDamaPiece.checkKing(); // console.log(newDamaPiece);

      if (!this.canEatAgain) {
        this.changeTurn();
      }

      this.checkCanEat(newRow, newColumn, oldRow, oldColumn); // this.changeTurn();
      // this.checkCanEat(newRow, newColumn, oldRow, oldColumn);

      this.render();
    }
  }, {
    key: "move",
    value: function move(damaPiece, tile) {
      var _this2 = this;

      var imgElem = damaPiece.imgElem;
      var diff = this.diffBetweenDamaPieces(damaPiece, tile);
      var animationObj = {
        bottom: diff.y,
        right: diff.x,
        lazy: true,
        onComplete: function onComplete() {
          _this2.setDamaPieceOn(damaPiece, tile.row, tile.column);

          _this2.setDamaPieceOn(tile, damaPiece.row, damaPiece.column);
        }
      };
      this.clearAllPlayable(); // let newRow = tile.row;
      // let newColumn = tile.column;
      //
      // let oldRow = damaPiece.row;
      // let oldColumn = damaPiece.column;
      // animate
      // return $(imgElem).animate(animationObj, 300, () => {
      //     this.setDamaPieceOn(damaPiece, tile.row, tile.column);
      //     this.setDamaPieceOn(tile, damaPiece.row, damaPiece.column);
      // }).promise();

      return TweenMax.to(imgElem, 0.3, animationObj); // $(imgElem).animate(animationObj, 300, () => {
      //     this.setDamaPieceOn(damaPiece, tile.row, tile.column);
      //     this.setDamaPieceOn(tile, damaPiece.row, damaPiece.column);
      // }).promise();
    }
  }, {
    key: "showFreeSpaceToMoveForKing",
    value: function showFreeSpaceToMoveForKing(damaPiece, direction) {
      var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : damaPiece;
      var tile;
      var directions = ['forward', 'backward', 'right', 'left'];

      for (var _i = 0, _directions = directions; _i < _directions.length; _i++) {
        var _direction = _directions[_i];
        if (_direction === 'forward') tile = this.getForwardDamaPiece(damaPiece, 1, base);else if (_direction === 'backward') tile = this.getBackwardDamaPiece(damaPiece, 1, base);else if (_direction === 'right') tile = this.getRightDamaPiece(damaPiece, 1, base);else if (_direction === 'left') tile = this.getLeftDamaPiece(damaPiece, 1, base);

        while (tile !== null && tile.type === null) {
          tile.makePlayableTo(base);
          if (_direction === 'forward') tile = this.getForwardDamaPiece(tile, 1, base);else if (_direction === 'backward') tile = this.getBackwardDamaPiece(tile, 1, base);else if (_direction === 'right') tile = this.getRightDamaPiece(tile, 1, base);else if (_direction === 'left') tile = this.getLeftDamaPiece(tile, 1, base);
        }
      }
    }
  }, {
    key: "showFreeSpaceToMoveForMan",
    value: function showFreeSpaceToMoveForMan(damaPiece) {
      var forwardPiece = this.getForwardDamaPiece(damaPiece);
      var rightPiece = this.getRightDamaPiece(damaPiece);
      var leftPiece = this.getLeftDamaPiece(damaPiece);
      var surroundingPieces = [forwardPiece, rightPiece, leftPiece];

      for (var _i2 = 0, _surroundingPieces = surroundingPieces; _i2 < _surroundingPieces.length; _i2++) {
        var tile = _surroundingPieces[_i2];
        if (tile === null) //out of bound
          continue;
        if (tile.type === null) tile.makePlayableTo(damaPiece);
      }
    }
  }, {
    key: "fakePlayable",
    value: function fakePlayable(damaPiece) {
      damaPiece.cellElem.classList.add('playable');
    }
  }, {
    key: "showFreeSpaceToMove",
    value: function showFreeSpaceToMove(damaPiece) {
      this.clearAllPlayable();
      if (damaPiece === null) throw "Calling on null dama piece!"; // this.fakePlayable(damaPiece);

      if (damaPiece.isKing === false) {
        this.showFreeSpaceToMoveForMan(damaPiece);
      } else if (damaPiece.isKing === true) {
        this.showFreeSpaceToMoveForKing(damaPiece);
      }
    }
  }, {
    key: "firstEncounterForward",
    value: function firstEncounterForward(damaPiece) {
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : damaPiece;
      var surroundingPiece = this.getForwardDamaPiece(damaPiece, 1, base); // console.log(forwardPiece);

      if (surroundingPiece === null) return null;
      if (surroundingPiece.type === null) return this.firstEncounterForward(surroundingPiece, base);else if (surroundingPiece.type !== null) return surroundingPiece;
    }
  }, {
    key: "firstEncounterBackward",
    value: function firstEncounterBackward(damaPiece) {
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : damaPiece;
      var surroundingPiece = this.getBackwardDamaPiece(damaPiece, 1, base); // console.log(forwardPiece);

      if (surroundingPiece === null) return null;
      if (surroundingPiece.type === null) return this.firstEncounterBackward(surroundingPiece, base);else if (surroundingPiece.type !== null) return surroundingPiece;
    }
  }, {
    key: "firstEncounterRight",
    value: function firstEncounterRight(damaPiece) {
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : damaPiece;
      var surroundingPiece = this.getRightDamaPiece(damaPiece, 1, base); // console.log(forwardPiece);

      if (surroundingPiece === null) return null;
      if (surroundingPiece.type === null) return this.firstEncounterRight(surroundingPiece, base);else if (surroundingPiece.type !== null) return surroundingPiece;
    }
  }, {
    key: "firstEncounterLeft",
    value: function firstEncounterLeft(damaPiece) {
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : damaPiece;
      var surroundingPiece = this.getLeftDamaPiece(damaPiece, 1, base); // console.log(forwardPiece);

      if (surroundingPiece === null) return null;
      if (surroundingPiece.type === null) return this.firstEncounterLeft(surroundingPiece, base);else if (surroundingPiece.type !== null) return surroundingPiece;
    }
  }, {
    key: "showEatableForKing",
    value: function showEatableForKing(damaPiece) {
      var show = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // console.log(damaPiece);
      var canEat = false;
      var forwardPiece = this.firstEncounterForward(damaPiece);
      var doubleForwardPiece = this.getForwardDamaPiece(forwardPiece, 1, damaPiece);
      var forwardNotNull = forwardPiece !== null && doubleForwardPiece !== null;
      var backwardPiece = this.firstEncounterBackward(damaPiece);
      var doubleBackwardPiece = this.getBackwardDamaPiece(backwardPiece, 1, damaPiece);
      var backwardNotNull = backwardPiece !== null && doubleBackwardPiece !== null;
      var rightPiece = this.firstEncounterRight(damaPiece);
      var doubleRightPiece = this.getRightDamaPiece(rightPiece, 1, damaPiece);
      var rightNotNull = rightPiece !== null && doubleRightPiece !== null;
      var leftPiece = this.firstEncounterLeft(damaPiece);
      var doubleLeftPiece = this.getLeftDamaPiece(leftPiece, 1, damaPiece);
      var leftNotNull = leftPiece !== null && doubleLeftPiece !== null; // console.log(forwardPiece, backwardPiece, rightPiece, leftPiece);
      // console.log(doubleForwardPiece, doubleBackwardPiece, doubleRightPiece, doubleLeftPiece);

      if (forwardNotNull && forwardPiece.oppositeOf(damaPiece) && doubleForwardPiece.type === null) {
        // console.log('can eat:', forwardPiece);
        while (doubleForwardPiece !== null && doubleForwardPiece.type === null) {
          if (show === true) doubleForwardPiece.makeEatableTo(damaPiece, forwardPiece);
          canEat = true;
          doubleForwardPiece = this.getForwardDamaPiece(doubleForwardPiece, 1, damaPiece);
        }
      }

      if (backwardNotNull && backwardPiece.oppositeOf(damaPiece) && doubleBackwardPiece.type === null) {
        while (doubleBackwardPiece !== null && doubleBackwardPiece.type === null) {
          if (show === true) doubleBackwardPiece.makeEatableTo(damaPiece, backwardPiece);
          canEat = true;
          doubleBackwardPiece = this.getBackwardDamaPiece(doubleBackwardPiece, 1, damaPiece);
        }
      }

      if (rightNotNull && rightPiece.oppositeOf(damaPiece) && doubleRightPiece.type === null) {
        while (doubleRightPiece !== null && doubleRightPiece.type === null) {
          if (show === true) doubleRightPiece.makeEatableTo(damaPiece, rightPiece);
          canEat = true;
          doubleRightPiece = this.getRightDamaPiece(doubleRightPiece, 1, damaPiece);
        }
      }

      if (leftNotNull && leftPiece.oppositeOf(damaPiece) && doubleLeftPiece.type === null) {
        while (doubleLeftPiece !== null && doubleLeftPiece.type === null) {
          if (show === true) doubleLeftPiece.makeEatableTo(damaPiece, leftPiece);
          canEat = true;
          doubleLeftPiece = this.getLeftDamaPiece(doubleLeftPiece, 1, damaPiece);
        }
      }

      return canEat; // let directions = ['forward', 'backward', 'right', 'left']; //TODO HAVE (this.firstEncounter) (this.get-DIR-DamaPiece) accepet direction as String to use loops
      //
      // for(let direction of directions){
      //     let piece = this.firstEncounterForward(damaPiece);
      //     let doublePiece = this.getForwardDamaPiece(forwardPiece, 1, damaPiece);
      //     let piecesNotNull = piece !== null && doublePiece !== null;
      // }
    }
  }, {
    key: "showEatableForMan",
    value: function showEatableForMan(damaPiece) {
      var show = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var canEat = false;
      var forwardPiece = this.getForwardDamaPiece(damaPiece);
      var doubleForwardPiece = this.getForwardDamaPiece(forwardPiece, 1, damaPiece);
      var rightPiece = this.getRightDamaPiece(damaPiece);
      var doubleRightPiece = this.getRightDamaPiece(rightPiece, 1, damaPiece);
      var leftPiece = this.getLeftDamaPiece(damaPiece);
      var doubleLeftPiece = this.getLeftDamaPiece(leftPiece, 1, damaPiece);
      var surroundingPieces = [forwardPiece, rightPiece, leftPiece];
      var doubleSurroundingPieces = [doubleForwardPiece, doubleRightPiece, doubleLeftPiece];

      for (var i = 0; i < surroundingPieces.length; i++) {
        var surroundingPiece = surroundingPieces[i];
        var doubleSurroundingPiece = doubleSurroundingPieces[i];
        if (surroundingPiece === null) //out of bound
          continue;

        if (surroundingPiece.type !== null && surroundingPiece.oppositeOf(damaPiece) && doubleSurroundingPiece !== null && doubleSurroundingPiece.type === null) {
          if (show === true) doubleSurroundingPiece.makeEatableTo(damaPiece, surroundingPiece);
          canEat = true;
        } // this.makePlayable(tile, damaPiece);

      }

      return canEat;
    }
  }, {
    key: "showEatable",
    value: function showEatable(damaPiece) {
      var show = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.clearAllPlayable();
      var canEat = false;
      if (damaPiece === null) throw "Calling on null";
      if (damaPiece.type === null) return false;

      if (damaPiece.isKing === false) {
        canEat = this.showEatableForMan(damaPiece, show);
      } else if (damaPiece.isKing === true) {
        canEat = this.showEatableForKing(damaPiece, show);
      }

      return canEat;
    }
  }, {
    key: "checkCanEat",
    value: function checkCanEat(newRow, newColumn, oldRow, oldColumn) {
      var toCheck = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.boardPieces[newRow][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _piece3 = _step2.value;
          //check on newRow
          toCheck.push(_piece3); // console.log(piece);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      for (var row = 0; row < 8; row++) {
        //check on newColumn
        if (row === newRow) continue; //to prevent checking twice

        var piece = this.getDamaPieceOn(row, newColumn);
        toCheck.push(piece);
      }

      if (newRow === oldRow) {
        //check 2 column 1 row -- moved horizontally
        //check oldColumn
        for (var _row = 0; _row < 8; _row++) {
          //check on newColumn
          var _piece = this.getDamaPieceOn(_row, oldColumn);

          toCheck.push(_piece);
        }
      } else {
        //check 1 column 2 row -- moved verticaly
        //check oldRow
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.boardPieces[oldRow][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _piece2 = _step3.value;
            toCheck.push(_piece2);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      for (var _i3 = 0, _toCheck = toCheck; _i3 < _toCheck.length; _i3++) {
        var _piece4 = _toCheck[_i3];

        // if(this.isTurn(piece) && this.showEatable(piece, false)) {
        if (this.showEatable(_piece4, false)) {
          this.pushCanEat(_piece4); // console.log(this.canEat);
        }
      }
    }
  }, {
    key: "typeCanEat",
    value: function typeCanEat(type) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.canEat[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var piece = _step4.value;

          if (piece.type === type) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }, {
    key: "handleClickDamaPiece",
    value: function handleClickDamaPiece(damaPiece) {
      if (damaPiece.type === this.turn) {
        if (this.canEat.length !== 0 && this.typeCanEat(damaPiece.type)) {
          //some dama piece can eat
          if (this.canEat.includes(damaPiece)) {
            //should eat
            this.showEatable(damaPiece);
          }
        } else {
          var canEat = this.showEatable(damaPiece);
          if (!canEat) this.showFreeSpaceToMove(damaPiece);
        }
      }
    }
  }, {
    key: "handleClickTile",
    value: function handleClickTile(tile) {
      var _this3 = this;

      var playableTo = tile.playableTo;

      if (playableTo !== null) {
        if (tile.canEat !== null) {
          //has eaten, remove from this.canEat
          var damaPiece = tile.eatableTo; //who can eat

          this.removeCanEat(damaPiece);
          var eaten = tile.canEat.eaten();
        } // else{
        //     this.canEatAgain = false;
        // }


        var moved = this.move(playableTo, tile);
        $.when(eaten, moved).then(function () {
          if (eaten !== undefined) {
            var _damaPiece = _this3.getDamaPieceOn(tile.row, tile.column);

            _this3.canEatAgain = _this3.showEatable(_damaPiece, false);
          }

          _this3.onMove(playableTo, tile);
        });
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(row, column) {
      var damaPiece = this.getDamaPieceOn(row, column);

      if (damaPiece.type !== null) {
        this.handleClickDamaPiece(damaPiece);
      } else {
        this.handleClickTile(damaPiece);
      }
    }
  }, {
    key: "setImage",
    value: function setImage(damaPiece) {
      var image = new Image();
      image.classList.add('damaPiece');

      if (damaPiece.type === 'black') {
        image.classList.add('blackDamaPiece');
      }

      if (damaPiece.type === null) {
        return;
      }

      if (damaPiece.type === 'black') {
        if (damaPiece.isKing) image.src = 'assets/BlackDamaKing-m-min.png';else image.src = 'assets/BlackDama-m-min.png';
      } else if (damaPiece.type === 'yellow') {
        if (damaPiece.isKing) image.src = 'assets/YellowDamaKing-m-min.png';else image.src = 'assets/YellowDama-m-min.png';
      }

      damaPiece.cellElem.append(image); //FIXME NOOOWW!!!!!
      // console.log($(damaPiece.cellElem).append('<div class="circle"></div>').children()[0]);

      damaPiece.imgElem = image; // damaPiece.imgElem = $(damaPiece.cellElem).append('<div class="circle"></div>').children()[0]; //FIXME :: image
    }
  }, {
    key: "clearImages",
    value: function clearImages() {
      $('.damaPiece').remove();
    }
  }, {
    key: "checkWin",
    value: function checkWin(yellowCount, blackCount) {
      var wonText = null;

      if (yellowCount === 0) {
        wonText = 'فاز الأسود!';
      } else if (blackCount === 0) {
        wonText = 'فاز الأصفر!';
      }

      if (wonText !== null) $('#winner').css({
        display: 'flex'
      });
      $('#winner').append(wonText);
      console.log(wonText);
    }
  }, {
    key: "render",
    value: function render() {
      var blackCount = 0;
      var yellowCount = 0;
      this.clearImages();

      for (var row = 0; row < this.boardPieces.length; row++) {
        var boardPiecesRow = this.boardPieces[row];

        for (var column = 0; column < boardPiecesRow.length; column++) {
          var damaPiece = this.boardPieces[row][column];
          if (damaPiece.type === 'black') blackCount++;
          if (damaPiece.type === 'yellow') yellowCount++;
          this.setImage(damaPiece);
        }
      }

      this.checkWin(yellowCount, blackCount);
    }
  }, {
    key: "renderPiece",
    value: function renderPiece(damaPiece) {
      this.clearImages();

      for (var row = 0; row < this.boardPieces.length; row++) {
        var boardPiecesRow = this.boardPieces[row];

        for (var column = 0; column < boardPiecesRow.length; column++) {
          var _damaPiece2 = this.boardPieces[row][column];
          this.setImage(_damaPiece2);
        }
      }
    }
  }]);

  return Board;
}();

var boardObj = new Board(); //
// document.getElementsByTagName('body').ontouchstart = (e) => {
//     alert('tock');
//     e.preventDefault();
// };
//handle on click on  cell's

$('.cell').click(function (e) {
  var row = $(this).data('row');
  var column = $(this).data('column');
  boardObj.handleClick(row, column);
});
//# sourceMappingURL=script.js.map