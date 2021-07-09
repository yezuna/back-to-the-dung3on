function setSprites () {
    mainPlayer = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(mainPlayer)
    scene.cameraFollowSprite(mainPlayer)
    mainPlayer.setPosition(130, 200)
    mainPlayer.setStayInScreen(true)
}
function setTiles () {
    if (level == 0) {
        tiles.setTilemap(tilemap`level0`)
    }
    if (level == 1) {
        lvlmapy = 0
        lvlmapx = 0
        scene.centerCameraAt(0, 0)
        tiles.setTilemap(tilemap`level1x0y0`)
        mainPlayer.setPosition(80, 100)
    }
}
// from start screen to dungeon
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileDarkGrass3, function (sprite, location) {
    level += 1
    setTiles()
    textSprite = textsprite.create("Level: " + ("" + level), 0, 15)
    textSprite.setMaxFontHeight(10)
    textSprite.setPosition(80, 55)
    textSprite.destroy(effects.ashes, 2000)
})
function levelMapCheck () {
    if (level == 1 && lvlmapy == -1 && lvlmapx == 0) {
        tiles.setTilemap(tilemap`level1x0y-1`)
        mainPlayer.setPosition(80, 20)
    } else if (level == 1 && lvlmapy == 0 && lvlmapx == 0) {
        tiles.setTilemap(tilemap`level1x0y0`)
        if (prevlocation == "x") {
            mainPlayer.setPosition(140, 60)
            prevlocation = "null"
        } else {
            mainPlayer.setPosition(80, 110)
        }
    } else if (level == 1 && lvlmapy == 0 && lvlmapx == 1) {
        tiles.setTilemap(tilemap`level1x1y0`)
        mainPlayer.setPosition(20, 60)
    } else if (level == 1 && lvlmapy == 0 && lvlmapx == -1) {
        tiles.setTilemap(tilemap`level1x0y0`)
        mainPlayer.setPosition(140, 60)
    } else {
    	
    }
}
let prevlocation = ""
let textSprite: TextSprite = null
let lvlmapx = 0
let lvlmapy = 0
let mainPlayer: Sprite = null
let level = 0
setTiles()
setSprites()
level = 0
// tests if player is at any dungeon edge
game.onUpdate(function () {
    if (level == 1 && mainPlayer.bottom == 122) {
        lvlmapy += -1
        levelMapCheck()
    }
    if (level == 1 && mainPlayer.top == 0) {
        lvlmapy += 1
        levelMapCheck()
    }
    if (level == 1 && mainPlayer.right == 162) {
        lvlmapx += 1
        levelMapCheck()
    }
    if (level == 1 && mainPlayer.left == -1) {
        prevlocation = "x"
        lvlmapx += -1
        levelMapCheck()
    }
})
