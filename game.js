var level = 1;
var elem_pxl = 20;
var magic_number = 2;
var field_height = Math.floor(magic_number * level);
var field_width = Math.floor(magic_number * level);
var field_height_pxl = Math.floor(magic_number * level * elem_pxl);
var field_width_pxl = Math.floor(magic_number * level * elem_pxl);

var complete = false;

var game = new Phaser.Game(field_height_pxl, field_width_pxl, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

var field = new Array();
for (i = 0; i < field_width; i += 1) {
  field[i] = new Array();
};


function preload() {
  sprite = game.load.image('test','img/test.jpg');
};


function create() {
    var i, j, tile;

    for (i = 0; i < field_width; i += 1 ) {
        for (j = 0; j < field_height; j += 1){
            tile = {
                pos:  Math.floor(Math.random() * 4),
                x: i,
                y: j,
                img: game.add.sprite(i * elem_pxl + elem_pxl / 2, j * elem_pxl + elem_pxl / 2, 'test')
            }

            tile.img.anchor.setTo(0.5, 0.5);
            tile.img.angle = tile.pos * 90;
            tile.img.inputEnabled = true;
            tile.img.input.pixelPerfectClick = true;

            tile.img.events.onInputDown.add(roll, tile);
            if (complete == true) {
                alert("Level "+level+" complete!");
                level += 1;
                //new Phaser.Game(field_height_pxl, field_width_pxl, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
                //create();
            };

            field[i][j] = tile;
            console.log(i,j,tile.pos);
        }
    }
};

function roll() {
    if ( complete ) {
        return alert("Level "+level+" complete!");
    }
    if (this.pos == 3) {
        this.pos = 0;
    } else {
        this.pos += 1
    };
    this.img.angle = this.pos * 90;
    console.log(this.pos);

    if ( this.pos == 0 ) {
        check();
    }

};

function check() {
    for (i = 0; i < field_width; i += 1 ) {
        for (j = 0; j < field_height; j += 1) {
            if (field[i][j].pos != 0) {
                return;
            }
        }
    }
    complete = true;
};

function update() {
};
