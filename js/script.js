let tableBlock = document.getElementById('tableBlock')
let sizeInput = document.getElementById('sizeInput')
let tableSize = parseInt(sizeInput.value)

sizeInput.addEventListener('change', fillTableBlock)
window.addEventListener('resize', resizeTableBlock)

function fillTableBlock() {
	tableSize = parseInt(sizeInput.value)
	console.log(tableSize)
	while (tableBlock.firstChild) {
		tableBlock.removeChild(tableBlock.firstChild)
	}
	for (let i = 1; i <= tableSize; i++) {
		var digitRow = document.createElement('div')
		digitRow.classList = 'row'
		for (let j = -i; j < tableSize - i + 2; j++) {
			if (j <= 0 && j >= -1) continue
			var digitCell = document.createElement('div')
			let cellSize = calculateCellSize()
			digitCell.classList = 'cell'
			digitCell.style.fontSize = cellSize / 2 + 'px'
			digitCell.style.width = cellSize + 'px'
			digitCell.style.height = cellSize + 'px'
			digitCell.innerHTML = Math.abs(j)

			digitCell.addEventListener('mouseenter', setCellBorder)
			digitCell.addEventListener('mouseout', unsetCellBorder)

			digitRow.appendChild(digitCell)
		}
		tableBlock.appendChild(digitRow)
	}
}

let selectedCells = []

function setCellBorder(event) {
	selectedCells = []

	let rows = tableBlock.childNodes

	for (let row in rows) {
		if (Object.hasOwnProperty.call(rows, row)) {
			let currentRow = rows[row].childNodes
			for (let cell in currentRow) {
				if (Object.hasOwnProperty.call(currentRow, cell)) {
					let currentCell = currentRow[cell]

					if (event.currentTarget.innerHTML === currentCell.innerHTML) {
						console.log('hey ' + currentCell.innerHTML)
						currentCell.classList = 'cell selectedCell'
						selectedCells.push(currentCell)
					}
				}
			}
		}
	}
}

function unsetCellBorder() {
	selectedCells.forEach((cell) => {
		console.log(selectedCells.length)
		cell.classList = 'cell'
	})
}

function calculateCellSize() {
	return Math.abs(
		Math.min(window.innerWidth, window.innerHeight) / (1.5 * tableSize)
	)
}

function resizeTableBlock() {
	cellSize = calculateCellSize()
	let rows = tableBlock.childNodes
	for (let row in rows) {
		if (Object.hasOwnProperty.call(rows, row)) {
			let currentRow = rows[row].childNodes
			for (let cell in currentRow) {
				if (Object.hasOwnProperty.call(currentRow, cell)) {
					let currentCell = currentRow[cell]
					currentCell.style.fontSize = cellSize / 2 + 'px'
					currentCell.style.width = cellSize + 'px'
					currentCell.style.height = cellSize + 'px'
				}
			}
		}
	}
}

fillTableBlock()
