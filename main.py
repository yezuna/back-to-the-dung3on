def setSprites():
    global mainPlayer
    mainPlayer = sprites.create(img("""
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
        """),
        SpriteKind.player)
    controller.move_sprite(mainPlayer)
    scene.camera_follow_sprite(mainPlayer)
    mainPlayer.set_position(130, 200)
    mainPlayer.set_stay_in_screen(True)
def setTiles():
    global lvlmapy, lvlmapx
    if level == 0:
        tiles.set_tilemap(tilemap("""
            level0
        """))
    if level == 1:
        lvlmapy = 0
        lvlmapx = 0
        scene.center_camera_at(0, 0)
        tiles.set_tilemap(tilemap("""
            level1x0y0
        """))
        mainPlayer.set_position(80, 100)
# from start screen to dungeon

def on_overlap_tile(sprite, location):
    global level, textSprite
    level += 1
    setTiles()
    pause(100)
    scene.center_camera_at(0, 0)
    textSprite = textsprite.create("Level: " + ("" + str(level)), 0, 2)
    pause(500)
scene.on_overlap_tile(SpriteKind.player,
    sprites.castle.tile_dark_grass3,
    on_overlap_tile)

def levelMapCheck():
    global prevlocation
    if level == 1 and lvlmapy == -1 and lvlmapx == 0:
        tiles.set_tilemap(tilemap("""
            level1x0y-1
        """))
        mainPlayer.set_position(80, 20)
    elif level == 1 and lvlmapy == 0 and lvlmapx == 0:
        tiles.set_tilemap(tilemap("""
            level1x0y0
        """))
        if prevlocation == "x":
            mainPlayer.set_position(140, 60)
            prevlocation = "null"
        else:
            mainPlayer.set_position(80, 110)
    elif level == 1 and lvlmapy == 0 and lvlmapx == 1:
        tiles.set_tilemap(tilemap("""
            level1x1y0
        """))
        mainPlayer.set_position(20, 60)
    elif level == 1 and lvlmapy == 0 and lvlmapx == -1:
        tiles.set_tilemap(tilemap("""
            level1x0y0
        """))
        mainPlayer.set_position(140, 60)
    else:
        pass
prevlocation = ""
textSprite: TextSprite = None
lvlmapx = 0
lvlmapy = 0
mainPlayer: Sprite = None
level = 0
setTiles()
setSprites()
level = 0
# tests if player is at any dungeon edge

def on_on_update():
    global lvlmapy, lvlmapx, prevlocation
    if level == 1 and mainPlayer.bottom == 122:
        lvlmapy += -1
        levelMapCheck()
    if level == 1 and mainPlayer.top == 0:
        lvlmapy += 1
        levelMapCheck()
    if level == 1 and mainPlayer.right == 162:
        lvlmapx += 1
        levelMapCheck()
    if level == 1 and mainPlayer.left == -1:
        prevlocation = "x"
        lvlmapx += -1
        levelMapCheck()
game.on_update(on_on_update)
