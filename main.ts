namespace SpriteKind {
    export const chest = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    mainPlayer.setImage(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    animation.runImageAnimation(
    mainPlayer,
    assets.animation`playerWalkUp`,
    100,
    true
    )
})
function setSprites () {
    mainPlayer = sprites.create(assets.image`playerDown`, SpriteKind.Player)
    info.setLife(3)
    mainPlayer.z = 1
    controller.moveSprite(mainPlayer)
    scene.cameraFollowSprite(mainPlayer)
    mainPlayer.setPosition(130, 200)
    mainPlayer.setStayInScreen(true)
    mainPlayer.say("" + prevlocation)
    snake = sprites.create(assets.image`snake`, SpriteKind.Enemy)
    snake.destroy()
}
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, mainPlayer)
    mainPlayer.setImage(img`
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
        `)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mainPlayer.setImage(assets.image`playerLeft`)
    animation.runImageAnimation(
    mainPlayer,
    assets.animation`playerWalkLeft`,
    100,
    true
    )
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, mainPlayer)
    mainPlayer.setImage(assets.image`playerRight`)
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, mainPlayer)
    mainPlayer.setImage(img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `)
})
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
    textSprite.destroy(effects.disintegrate, 1000)
})
function levelMapCheck () {
    if (level == 1 && lvlmapy == -1 && lvlmapx == 0) {
        scene.centerCameraAt(0, 0)
        tiles.setTilemap(tilemap`level1x0y-1`)
        spawnSide()
        snake.follow(mainPlayer, 0)
        snake.setFlag(SpriteFlag.Ghost, true)
        snake.setFlag(SpriteFlag.Invisible, true)
    } else if (level == 1 && lvlmapy == 0 && lvlmapx == 0) {
        tiles.setTilemap(tilemap`level1x0y0`)
        spawnSide()
    } else if (level == 1 && lvlmapy == 0 && lvlmapx == 1) {
        tiles.setTilemap(tilemap`level1x1y0`)
        spawnSide()
    } else if (level == 1 && lvlmapy == -1 && lvlmapx == -1) {
        tiles.setTilemap(tilemap`level1x-1y-1`)
        spawnSide()
    } else if (level == 1 && lvlmapy == -1 && lvlmapx == 1) {
        tiles.setTilemap(tilemap`lvl1x1y-1`)
        enemyCheck()
        spawnSide()
        scene.cameraFollowSprite(mainPlayer)
    } else if (level == 1 && lvlmapy == -2 && lvlmapx == 0) {
        tiles.setTilemap(tilemap`level1x0y-2`)
        spawnSide()
    } else {
    	
    }
}
function enemyCheck () {
    if (level == 1 && lvlmapy == -1 && lvlmapx == 1 && hadEnemy == 0) {
        snake = sprites.create(assets.image`snake`, SpriteKind.Enemy)
        snake.setPosition(158, 55)
        snake.follow(mainPlayer, 50)
        hadEnemy = 1
    } else if (level == 1 && lvlmapy == -1 && lvlmapx == 1 && hadEnemy == 1) {
        snake.setFlag(SpriteFlag.Ghost, false)
        snake.setFlag(SpriteFlag.Invisible, false)
        snake.follow(mainPlayer, 50)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mainPlayer.setImage(assets.image`playerRight`)
    animation.runImageAnimation(
    mainPlayer,
    [img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e e e d d d f . . . 
        . . . . . f 4 d d e 4 e f . . . 
        . . . . . f e d d e 2 2 f . . . 
        . . . . f f f e e f 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `,img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . 4 d d e 4 4 4 e f . . . 
        . . . . e d d e 2 2 2 2 f . . . 
        . . . . f e e f 4 4 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `],
    100,
    true
    )
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, mainPlayer)
    mainPlayer.setImage(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.chest, function (sprite, otherSprite) {
    mainPlayer.x += 10
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    mainPlayer.setImage(img`
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
        `)
    animation.runImageAnimation(
    mainPlayer,
    assets.animation`playerWalkDown`,
    100,
    true
    )
})
function spawnSide () {
    if (prevlocation == "right") {
        mainPlayer.setPosition(140, 60)
        prevlocation = "null"
    } else if (prevlocation == "bottom") {
        mainPlayer.setPosition(80, 110)
        prevlocation = "null"
    } else if (prevlocation == "left") {
        mainPlayer.setPosition(10, 60)
        prevlocation = "null"
    } else if (prevlocation == "top") {
        mainPlayer.setPosition(80, 10)
        prevlocation = "null"
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    mainPlayer.say("ouch", 1000)
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
let hadEnemy = 0
let textSprite: TextSprite = null
let lvlmapx = 0
let lvlmapy = 0
let snake: Sprite = null
let prevlocation = ""
let mainPlayer: Sprite = null
let level = 0
setTiles()
setSprites()
level = 0
// tests if player is at any dungeon edge
game.onUpdate(function () {
    if (level == 1 && mainPlayer.bottom == 122) {
        prevlocation = "top"
        lvlmapy += -1
        levelMapCheck()
    }
    if (level == 1 && mainPlayer.top == 0) {
        prevlocation = "bottom"
        lvlmapy += 1
        levelMapCheck()
    }
    if (level == 1 && mainPlayer.right == 162) {
        prevlocation = "left"
        lvlmapx += 1
        levelMapCheck()
    }
    if (level == 1 && mainPlayer.left == -1) {
        prevlocation = "right"
        lvlmapx += -1
        levelMapCheck()
    }
})
