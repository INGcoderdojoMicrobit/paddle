namespace SpriteKind {
    export const LeftPaddles = SpriteKind.create()
    export const RightPaddles = SpriteKind.create()
}
/**
 * let tileMap: Image = null
 * 
 * let orangeBlock: Image = null
 * 
 * orangeBlock = image.create(16, 16)
 * 
 * orangeBlock.fill(4)
 * 
 * orangeBlock.drawRect(0, 0, 16, 16, 11)
 * 
 * scene.setTile(1, orangeBlock, true)
 * 
 * tileMap = image.create(scene.screenWidth() / 16 + 1, scene.screenHeight() / 16)
 * 
 * tileMap.drawLine(scene.screenWidth() / 32, 0, scene.screenWidth() / 32, scene.screenHeight() / 16, 1)
 * 
 * scene.setTileMap(tileMap)
 */
sprites.onOverlap(SpriteKind.Player, SpriteKind.RightPaddles, function (sprite, otherSprite) {
    sprite.vx = sprite.vx * -1
    info.player2.changeScoreBy(1)
})
function create_right_paddle () {
    right_paddle = sprites.create(img`
        3 3 
        5 3 
        3 4 
        5 3 
        3 4 
        5 3 
        3 4 
        5 3 
        3 4 
        5 3 
        3 4 
        5 3 
        3 4 
        3 3 
        `, SpriteKind.RightPaddles)
    controller.player2.moveSprite(right_paddle, 0, 150)
    right_paddle.setFlag(SpriteFlag.StayInScreen, true)
    right_paddle.x = 159
}
function create_left_paddle () {
    left_paddle = sprites.create(img`
        3 3 
        3 5 
        4 3 
        3 5 
        4 3 
        3 5 
        4 3 
        3 5 
        4 3 
        3 5 
        4 3 
        3 5 
        4 3 
        3 3 
        `, SpriteKind.LeftPaddles)
    controller.player1.moveSprite(left_paddle, 0, 150)
    left_paddle.setFlag(SpriteFlag.StayInScreen, true)
    left_paddle.x = 1
}
function create_ball () {
    ball = sprites.create(img`
        . . 5 5 5 5 . . 
        . 5 5 5 5 5 5 . 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        . 5 5 5 5 5 5 . 
        . . 5 5 5 5 . . 
        `, SpriteKind.Player)
    ball.setVelocity(40, 40)
    ball.setFlag(SpriteFlag.BounceOnWall, true)
    ball.setFlag(SpriteFlag.ShowPhysics, true)
    ball.x = randint(0, 120)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.LeftPaddles, function (sprite, otherSprite) {
    sprite.vx = sprite.vx * -1
    info.player1.changeScoreBy(1)
})
let ball: Sprite = null
let left_paddle: Sprite = null
let right_paddle: Sprite = null
create_ball()
create_left_paddle()
create_right_paddle()
info.player1.setLife(3)
info.player2.setLife(3)
game.onUpdate(function () {
    if (ball.x <= 4) {
        info.player1.changeLifeBy(-1)
        scene.cameraShake(4, 200)
    }
    if (ball.x >= 156) {
        info.player2.changeLifeBy(-1)
        scene.cameraShake(4, 200)
    }
})
