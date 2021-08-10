window.onload = function () {
    var game = Game()
    game.loop()
};

const Vector2 = (function (x, y) {
    return {
        x: x,
        y: y,
        add(v2) {
            x += v2.x
            y += v2.y
        },
        eq(v2) { return x == v2.x && y == v2.y },
        toString() { return `x:${x} y:${y}` }
    }
})

const Game = (function () {
    var score = 0
    const snake = Snake()
    const map = GameMap()

    function frame() {
        snake.move()
        map.update(snake)
    }

    function loop() {
        setTimeout(() => {
            frame()
            loop()
        }, Math.max(250 - score, 30))
    }

    return {
        score: score,
        loop: loop
    }
})

// checkFood(){
//     for (let i = 0; i < map.foods.length; i++) {
//         const food = map.foods[i];
//         if(snake.position.eq(food)){
//             score++
//             map.foods.splice(i, 1)
//             snake.add()
//         }
//     }
// }

const Snake = (function () {
    var position = Vector2(0, 0),
        controller = PlayerController(),
        body = [Vector2(0, 0)]

    return {
        position: position,
        move() {
            
            position.add(controller.direction)
            console.log(position)
        }
    }

    // move() {
    //     body.pop()
    //     position.add(controller.direction)
    //     body.push(position)
    //     console.log(body)
    // }

    // add() {
    //     body.push(body[body.length - 1])
    // }
})

const PlayerController = (function () {
    var direction = Vector2(1, 0)

    function updateDirection(code) {
        let vectors = {
            ArrowLeft: new Vector2(-1, 0),
            ArrowRight: new Vector2(1, 0),
            ArrowDown: new Vector2(0, 1),
            ArrowUp: new Vector2(0, -1),
            Space: new Vector2(0, 0)
        }

        if (vectors[code])
            direction = vectors[code]
    }

    window.addEventListener('keydown', e => {
        updateDirection(e.code)
    })

    return {
        direction: direction
    }
})

const GameMap = (function () {
    canvas = document.getElementById('game-canvas')
    content = canvas.getContext('2d')
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    foods = []
    cellSize = 20
    cellCount = Vector2(Math.floor(canvas.width / cellSize), Math.floor(canvas.height / cellSize))

    function generateFood() {
        var position = new Vector2(Math.floor(Math.random() * cellCount.x), Math.floor(Math.random() * cellCount.y))
        foods.push(position)
    }

    function drawBox(pos, size){
        content.fillStyle = '#2a9d8f'
        content.fillRect(cellSize * pos.x, cellSize * pos.y, size, size)
    }

    function drawFood(pos, size){
        content.fillStyle = '#e9c46a'
        content.beginPath();
        content.arc(cellSize * (pos.x + 0.5), cellSize * (pos.y + 0.5), size, 0, Math.PI * 2, true);
        content.fill();
    }

    return {
        update(snake) {
            content.clearRect(0, 0, canvas.width, canvas.height);
            if (!foods.length || Math.random() > 0.9) generateFood()
            foods.forEach(pos => drawFood(pos, cellSize / 2))
            drawBox(snake.position, cellSize)
        }
    }
})

// // #e9c46a
// // #f4a261
// // #e76f51