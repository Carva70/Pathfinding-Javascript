import { Queue, PriorityQueue } from "./queue.js"

var typeOf = {
    0: 'blanco',
    1: 'wall',
    2: 'start',
    3: 'end',
    4: 'path',
    5: 'visited'
}

export function createTable(start, end) {
    var table = []
    for (var i = 0; i < 30; i++) {
        var row = []
        for (var j = 0; j < 30; j++) {
            if (i == start[0] && j == start[1]) row.push(2)
            else if (i == end[0] && j == end[1]) row.push(3)
            else row.push(0)
        }
        table.push(row)
    }
    return table
}

export function draw(table, board) {
    board.innerText = ''
    for (var i = 1; i < 31; i++) {
        for (var j = 1; j < 31; j++) {
            var square = document.createElement('div')
            
            square.classList.add(typeOf[table[i-1][j-1]])
            square.style.gridColumnStart = j
            square.style.gridRowStart = i
            board.appendChild(square)
        }
    }
}

export function drawSquare(table, target, c) {
    table[parseInt(target.style.gridRowStart) - 1][parseInt(target.style.gridColumnStart) - 1] = c
    target.classList = typeOf[c]
}

function getSuccesors(position, table) {
    var moves = []
    if (position[0] > 0)
        if (table[position[0] - 1][position[1]] != 1) moves.push([[position[0] - 1, position[1]], 'North'])
    
    if (position[0] < 29)
        if (table[position[0] + 1][position[1]] != 1) moves.push([[position[0] + 1, position[1]], 'South'])

    if (position[1] > 0)
        if (table[position[0]][position[1] - 1] != 1) moves.push([[position[0], position[1] - 1], 'West'])

    if (position[1] < 29)
        if (table[position[0]][position[1] + 1] != 1) moves.push([[position[0], position[1] + 1], 'East'])
    return moves
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function manhattan(position, end) {
    return (Math.abs(end[0] - position[0]) + Math.abs(end[1] - position[1]))
}

function euclidean(position, end) {
    return (Math.sqrt(((end[0] - position[0]) ** 2) + ((end[1] - position[1]) ** 2)))
}

export function search(start, end, table) {
    var queue = new PriorityQueue((a, b) => a[2] < b[2])
    queue.push([start, [], 0, 0])
    var visitados = []
    var element
    var flag
    var hijos
    var i
    var path = []
    var prof

    while(!queue.isEmpty()) {
        element = queue.pop()
        flag = 0
        
        for (i in visitados) {
            if (arrayEquals(visitados[i], element[0])) {flag = 1; }
        }
        if (arrayEquals(end, element[0])) {
            return [element[1], visitados]
        }
        if (flag == 0) {
            visitados.push(element[0])
            hijos = getSuccesors(element[0], table)
            for (i in hijos) {
                path = element[1].slice()
                path.push(hijos[i][0])
                prof = element[3] + 1
                queue.push([hijos[i][0], path, euclidean(hijos[i][0], end) + prof/2, prof])
            }
        }

    }

    return [[], visitados]
}

export function searchManhattan(start, end, table) {
    var queue = new PriorityQueue((a, b) => a[2] < b[2])
    queue.push([start, [], 0, 0])
    var visitados = []
    var element
    var flag
    var hijos
    var i
    var path = []
    var prof

    while(!queue.isEmpty()) {
        element = queue.pop()
        flag = 0
        
        for (i in visitados) {
            if (arrayEquals(visitados[i], element[0])) {flag = 1; }
        }
        if (arrayEquals(end, element[0])) {
            return [element[1], visitados]
        }
        if (flag == 0) {
            visitados.push(element[0])
            hijos = getSuccesors(element[0], table)
            for (i in hijos) {
                path = element[1].slice()
                path.push(hijos[i][0])
                prof = element[3] + 1
                queue.push([hijos[i][0], path, manhattan(hijos[i][0], end) + prof/1.000001, prof])
            }
        }

    }

    return [[], visitados]
}

export function drawLine(arr, table, board) {
    var i = 1
    var j = 0
    
    for (; i < arr[1].length; i++) {
        demo(arr[1], 5, table, board, i, i)
    }

    for (; j < arr[0].length - 1; j++) {
        demo(arr[0], 4, table, board, j, i + j)
    }

    
}

async function demo(arr, type, table, board, i, t) {
    await sleep(t * 30);
    table[arr[i][0]][arr[i][1]] = type
    draw(table, board)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}