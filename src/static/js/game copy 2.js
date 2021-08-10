window.onload = function () {
    var game = new Game()
    window.addEventListener('keydown', e => {
        game.snake.controller.updateDirection(e.code)
    })
    game.loop()
};


class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    toString() {
        return `x:${this.x} y:${this.y}`
    }

    add(vec2) {
        this.x += vec2.x
        this.y += vec2.y
    }

    eq(vec2) {
        return this.x == vec2.x && this.y == vec2.y
    }
}

class Snake {
    constructor() {
        this.position = new Vector2(0, 0)
        this.controller = new PlayerController()
        this.body = [new Vector2(0, 0)]
    }

    move() {
        this.body.pop()
        this.position.add(this.controller.direction)
        this.body.push(this.position)
        console.log(this.body)
    }

    add() {
        this.body.push(this.body[this.body.length - 1])
    }
}

class PlayerController {
    constructor() {
        this.direction = new Vector2(0, 0)
    }

    updateDirection(code) {
        var vectors = {
            ArrowLeft: new Vector2(-1, 0),
            ArrowRight: new Vector2(1, 0),
            ArrowDown: new Vector2(0, 1),
            ArrowUp: new Vector2(0, -1),
            Space: new Vector2(0, 0)
        }

        if (vectors[code])
            this.direction = vectors[code]
    }

}

class Game {
    constructor() {
        this.snake = new Snake()
        this.map = new Map()
        this.score = 0
    }

    frame() {
        this.snake.move()
        this.checkFood()
        this.map.update(this.snake)
        console.log(this.score)
    }

    checkFood(){
        for (let i = 0; i < this.map.foods.length; i++) {
            const food = this.map.foods[i];
            if(this.snake.position.eq(food)){
                this.score++
                this.map.foods.splice(i, 1)
                this.snake.add()
            }
        }
    }

    loop() {
        setTimeout(() => {
            this.frame()
            this.loop()
        }, Math.max(250 - this.score, 30))
    }
}

class Map {
    constructor() {
        this.foods = []
        this.canvas = document.getElementById('game-canvas')
        this.content = this.canvas.getContext('2d')
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        this.cellSize = 20
        this.cellCount = new Vector2( Math.floor(this.canvas.width / this.cellSize), Math.floor(this.canvas.height / this.cellSize))
    }

    update(snake) {
        this.content.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.foods.length || Math.random() > 0.9) this.generateFood()
        this.foods.forEach(pos => this.drawFood(pos, this.cellSize / 2))
        this.drawBox(snake.position, this.cellSize)
    }

    generateFood() {
        var position = new Vector2(Math.floor(Math.random() * this.cellCount.x), Math.floor(Math.random() * this.cellCount.y))
        this.foods.push(position)
    }

    drawBox(pos, size){
        this.content.fillStyle = '#2a9d8f'
        this.content.fillRect(this.cellSize * pos.x, this.cellSize * pos.y, size, size)
    }

    drawFood(pos, size){
        this.content.fillStyle = '#e9c46a'
        this.content.beginPath();
        this.content.arc(this.cellSize * (pos.x + 0.5), this.cellSize * (pos.y + 0.5), size, 0, Math.PI * 2, true);
        this.content.fill();
    }
}

// #e9c46a
// #f4a261
// #e76f51