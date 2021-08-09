window.onload = function() {
    var game = new Game()
    window.addEventListener('keydown', e => {
        game.snake.controller.updateDirection(e.code)
    })
    game.loop()
};


class Vector2{
    constructor(x, y){
        this.x = x
        this.y = y
    }
    
    toString(){
        return `x:${this.x} y:${this.y}`
    }

    add(vec2){
        this.x += vec2.x
        this.y += vec2.y
    }
}

class Snake {
    constructor(){
        this.position = new Vector2(0, 0)
        this.controller = new PlayerController()
    }

    move(){
        this.position.add(this.controller.direction)
        console.log(`position: ${this.position}`)
    }
}



class PlayerController{
    constructor(){
        this.direction = new Vector2(0, 0)
    }

    updateDirection(code) {
        var vectors = {
            ArrowLeft:  new Vector2(-1,  0),
            ArrowDown:  new Vector2( 0, -1),
            ArrowRight: new Vector2( 1,  0),
            ArrowUp:    new Vector2( 0,  1)
        }

        if(vectors[code])
            this.direction = vectors[code]
    }

}

class Game{
    constructor(){
        this.snake = new Snake()
    }

    frame() {
        this.snake.move()
    }

    loop(){
        setTimeout(() => {
            this.frame()
            this.loop()
        }, 500) 
    }
}