namespace SpriteKind {
    export const LeftPaddles = SpriteKind.create()
    export const RightPaddles = SpriteKind.create()
    export const Block = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.RightPaddles, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.y = 22
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Block, function (sprite, otherSprite) {
    uderzonybloczek = 0
    if (sprite.vx < 0) {
        if (sprite.x >= otherSprite.x + 4) {
            sprite.vx = sprite.vx * -1
            uderzonybloczek = 1
        }
    } else {
        if (sprite.x + 5 <= otherSprite.x) {
            sprite.vx = Math.abs(sprite.vx) * -1
            uderzonybloczek = 1
        }
    }
    if (sprite.vy > 0) {
        if (sprite.y + 7 <= otherSprite.y) {
            sprite.vy = Math.abs(sprite.vy) * -1
            uderzonybloczek = 1
        }
    } else {
        if (sprite.y >= otherSprite.y + 7) {
            sprite.vy = Math.abs(sprite.vy)
            uderzonybloczek = 1
        }
    }
    if (uderzonybloczek == 1) {
        otherSprite.z = otherSprite.z - 1
        if (otherSprite.z <= 0) {
            otherSprite.destroy()
            howmanyblocks += -1
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    create_bloczek()
})
// let tileMap: Image = null
// 
// let orangeBlock: Image = null
// 
// orangeBlock = image.create(16, 16)
// 
// orangeBlock.fill(4)
// 
// orangeBlock.drawRect(0, 0, 16, 16, 11)
// 
// scene.setTile(1, orangeBlock, true)
// 
// tileMap = image.create(scene.screenWidth() / 16 + 1, scene.screenHeight() / 16)
// 
// tileMap.drawLine(scene.screenWidth() / 32, 0, scene.screenWidth() / 32, scene.screenHeight() / 16, 1)
// 
// scene.setTileMap(tileMap)
sprites.onOverlap(SpriteKind.Player, SpriteKind.RightPaddles, function (sprite, otherSprite) {
    if (sprite.vx > 0) {
        sprite.vx = sprite.vx * -1
        info.player2.changeScoreBy(1)
    }
})
function create_bloczek () {
    if (howmanyblocks < 8) {
        if (Math.percentChance(50)) {
            nowybloczek = sprites.create(img`
                6 7 7 6 
                7 7 7 7 
                7 7 7 7 
                7 7 7 7 
                7 7 7 7 
                7 7 7 7 
                7 7 7 7 
                6 7 7 6 
                `, SpriteKind.Block)
            nowybloczek.z = 1
        } else if (Math.percentChance(50)) {
            nowybloczek = sprites.create(img`
                6 2 2 6 
                2 2 2 2 
                2 2 2 2 
                2 2 2 2 
                2 2 2 2 
                2 2 2 2 
                2 2 2 2 
                6 2 2 6 
                `, SpriteKind.Block)
            nowybloczek.z = 2
        } else {
            nowybloczek = sprites.create(img`
                6 2 2 6 
                d d d d 
                d d d d 
                2 5 5 2 
                2 5 5 2 
                d d d d 
                d d d d 
                6 2 2 6 
                `, SpriteKind.Block)
            nowybloczek.z = 4
        }
        nowybloczek.x = randint(60, 100)
        nowybloczek.y = randint(25, 110)
        howmanyblocks += 1
    }
}
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
    nowybloczek = sprites.create(img`
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
    controller.player1.moveSprite(nowybloczek, 0, 150)
    nowybloczek.setFlag(SpriteFlag.StayInScreen, true)
    nowybloczek.x = 1
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
    ball.x = randint(40, 120)
    ball.y = randint(50, 70)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.LeftPaddles, function (sprite, otherSprite) {
    if (sprite.vx < 0) {
        sprite.vx = sprite.vx * -1
        info.player1.changeScoreBy(1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.vy = Math.abs(sprite.vy)
})
sprites.onOverlap(SpriteKind.LeftPaddles, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.y = 22
})
let ball: Sprite = null
let right_paddle: Sprite = null
let nowybloczek: Sprite = null
let uderzonybloczek = 0
let howmanyblocks = 0
howmanyblocks = 0
create_ball()
create_left_paddle()
create_right_paddle()
info.player1.setLife(3)
info.player2.setLife(3)
info.player1.setScore(0)
info.player2.setScore(0)
let mySprite = sprites.create(image.create(320, 1), SpriteKind.Enemy)
mySprite.setPosition(0, 15)
mySprite.image.fill(1)
game.onUpdate(function () {
    if (ball.x <= 4) {
        info.player1.changeLifeBy(-1)
    }
    if (ball.x >= 156) {
        info.player2.changeLifeBy(-1)
    }
})
game.onUpdateInterval(2000, function () {
    create_bloczek()
})
