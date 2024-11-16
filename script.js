// Function to create the grid of boxes
function generateGrid(event) {
	// Do not refresh
	event.preventDefault()

	rows = document.getElementById("Rows").value;
	cols = document.getElementById("Columns").value;
	
	createGrid(rows, cols);
}

function createGrid(rows, cols) {
	const gridContainer = document.getElementById('grid');
	gridContainer.innerHTML = ''; // Clear existing grid
	
	let size = 600 / Math.max(rows, cols);

	// Loop to create boxes
	for (let i = 0; i < cols; i++) {
	  	for (let j = 0; j < rows; j++) {
			const box = document.createElement('div');
			
			box.style.width = size+"px";
			box.style.height = size+"px";

			box.classList.add('box', 'white');
			box.addEventListener('click', function() {
				box.classList.toggle('black');
				box.classList.toggle('white');
			});
			gridContainer.appendChild(box);
		}

		const d = document.createElement('div');
		d.style.clear = "both";
		gridContainer.appendChild(d);
	}
};

function zoomIn() {
	var boxes = document.querySelectorAll('.box');
	boxes.forEach(function(box) {
		box.style.width = box.clientWidth * 1.1 + "px";
        box.style.height = box.clientHeight * 1.1 + "px";
    });
}

function zoomOut() {
	var boxes = document.querySelectorAll('.box');
	boxes.forEach(function(box) {
		box.style.width = box.clientWidth * 0.9 + "px";
        box.style.height = box.clientHeight * 0.9 + "px";
    });
}

function scaleGrid(event) {
	event.preventDefault();

	const gridContainer = document.getElementById('grid');
	let scale = document.getElementById("Scale").value;
	let oldBoxes = document.querySelectorAll('.box');
	let r = document.getElementById('Rows').value;
	let rows = r * scale;
	let c = document.getElementById('Columns').value;
	let cols = c * scale;

	createGrid(rows, cols);

	let newBoxes = document.querySelectorAll('.box');

	let size = newBoxes[0].clientWidth;

	console.log(r);
	console.log(c);
	console.log(oldBoxes);



	for (let i = 0; i < c; i++) {
		for (let j = 0; j < r; j++) {
			for (let k = 0; k < scale; k++) {
				for (let l = 0; l < scale; l++) {
					let Nindx = (i*scale+k) * rows + (j*scale+l);
					let Oindx = i * r + j;

					console.log(Oindx);
					console.log(Nindx);
					console.log(" ");

					let clone = oldBoxes[Oindx].cloneNode(true);
					clone.style.width = size + "px";
					clone.style.height = size + "px";
					clone.addEventListener('click', function() {
						clone.classList.toggle('black');
						clone.classList.toggle('white');
					});

					gridContainer.insertBefore(clone, newBoxes[Nindx]);
					newBoxes[Nindx].remove();

				}
			}
		}
	}
}

function convert() {
	let boxes = document.querySelectorAll('.box');
	let counter = 0;

	boxes.forEach(box => {
		if (box.classList == "box black") {
			counter += 1;
		}
	});

	document.getElementById("array").innerHTML = "Number of black boxes:" + counter;
}

// Create default grid
const r = 2;
const c = 2;
document.getElementById("Rows").value = r;
document.getElementById("Columns").value = c;
createGrid(r, c);