import { createTable, draw, drawSquare, search, drawLine, searchManhattan} from "./board.js"


var board = document.querySelector('.board')

var inicio = [0, 0]
var final = [29, 29]
var flagstart = 0
var flagend = 0

var table = createTable(inicio, final)
draw(table, board)


document.addEventListener('click', () => {

    if (flagstart) {
        for (var i = 0; i < 30; i++) {
            for (var j = 0; j < 30; j++) {
                if (table[i][j] == 2 || table[i][j] == 4 || table[i][j] == 5) table[i][j] = 0
            }
        }
        drawSquare(table, window.event.target, 2)
        draw(table, board)
        inicio = [parseInt(window.event.target.style.gridRowStart) - 1, parseInt(window.event.target.style.gridColumnStart) - 1]
    } else if (flagend) {
        for (var i = 0; i < 30; i++) {
            for (var j = 0; j < 30; j++) {
                if (table[i][j] == 3 || table[i][j] == 4 || table[i][j] == 5) table[i][j] = 0
            }
        }
        drawSquare(table, window.event.target, 3)
        draw(table, board)
        final = [parseInt(window.event.target.style.gridRowStart) - 1, parseInt(window.event.target.style.gridColumnStart) - 1]

        
    } else {
        if (window.event.target.classList.contains('wall')) {
            drawSquare(table, window.event.target, 0)
        } else
            drawSquare(table, window.event.target, 1)
        for (var i = 0; i < 30; i++) {
            for (var j = 0; j < 30; j++) {
                if (table[i][j] == 4 || table[i][j] == 5) table[i][j] = 0
            }
        }
        draw(table, board)
    }
})

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'e':
            for (var i = 0; i < 30; i++) {
                for (var j = 0; j < 30; j++) {
                    if (table[i][j] == 4 || table[i][j] == 5) table[i][j] = 0
                }
            }
            var path = search(inicio, final, table)
            drawLine(path, table, board)
            break
        case 'm':
            for (var i = 0; i < 30; i++) {
                for (var j = 0; j < 30; j++) {
                    if (table[i][j] == 4 || table[i][j] == 5) table[i][j] = 0
                }
            }
            var path = searchManhattan(inicio, final, table)
            drawLine(path, table, board)
            break
        case 'i':
            if (flagstart == 0) flagstart = 1
            else flagstart = 0
            break
        case 'f':
            if (flagend == 0) flagend = 1
            else flagend = 0
            break
        case 'r':
            for (var i = 0; i < 30; i++) {
                for (var j = 0; j < 30; j++) {
                    if (table[i][j] == 1 || table[i][j] == 4 || table[i][j] == 5) table[i][j] = 0
                }
            }
            for (var i = 0; i < 30; i++) {
                for (var j = 0; j < 30; j++) {
                    if (table[i][j] != 2 && table[i][j] != 3) {
                        if (Math.random() > 0.7) {
                            table[i][j] = 1
                        }
                    }
                }
            }
            draw(table, board)
            break
    }

    
})