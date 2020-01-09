
var pi = Math.PI;
// Выполняем по завершении загрузки страницы
window.addEventListener("load", function onWindowLoad() {
	// Инициализируем переменные
	// Генерируем палитру в элемент #palette
	generatePalette(document.getElementById("palette"));

	let canvas = document.getElementById("canvas");
	let context = canvas.getContext("2d");

	let showSize = document.getElementById("showSize");
	showSize.innerHTML = 8;
	context.lineWidth = 8;
	document.getElementById('controlSize').addEventListener('change', function() {
		currentSize = this.value;
		document.getElementById("showSize").innerHTML = this.value;
		context.lineWidth = currentSize;
	});


	document.getElementById('controlRadius').addEventListener('change', function() {
		currentRadius = this.value;
		document.getElementById("showRadius").innerHTML = this.value;
		});

	// переменные для рисования
	context.lineCap = "round";

	window["active_instr"] = "brush";

	// вешаем обработчики на кнопки

	document.getElementById("zalivka").addEventListener('click',changeActive_class);
	document.getElementById("lastik").addEventListener('click',changeActive_class);
	document.getElementById("pipets").addEventListener('click',changeActive_class);
	document.getElementById("brush").addEventListener('click',changeActive_class);
	document.getElementById("circle").addEventListener('click',changeActive_class);

	// очистка изображения
	document.getElementById("clear").onclick = function clear() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	};
	// На любое движение мыши по canvas будет выполнятся эта функция

	canvas.onmousemove = function drawIfPressed (e) {
		// в "e"  попадает экземпляр MouseEvent
		let x = e.offsetX;
		let y = e.offsetY;
		let dx = e.movementX;
		let dy = e.movementY;

		// Проверяем зажата ли какая-нибудь кнопка мыши
		// Если да, то рисуем
		if (e.buttons === 0) {
			return;
			}

		if (window["active_instr"] === "brush"){
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(x - dx, y - dy);
		context.stroke();
		context.closePath();
		}

		if (window["active_instr"] === "lastik"){
			context.clearRect(x - dx, y - dy, context.lineWidth,context.lineWidth);
		}
		if (window["active_instr"] === "circle"){
			//context.clearRect(x,y,400,200);
			context.beginPath();
			//let radius = Math.pow(Math.pow(x-200, 2)+Math.pow(y-100,2), 0.5);
			//let radius = Math.pow(Math.pow(dx, y)+Math.pow(dy,x), 0.5);
			let radius  = parseInt(document.getElementById("showRadius").innerHTML);
			context.arc(x,y, radius , 0, 2*pi, getRadians(360));
			context.stroke();
		}
	};

	function generatePalette(palette) {
		// генерируем палитру
		// в итоге 5^3 цветов = 125
		for (let r = 0, max = 4; r <= max; r++) {
			for (let g = 0; g <= max; g++) {
				for (let b = 0; b <= max; b++) {
					let paletteBlock = document.createElement('div');
					paletteBlock.className = 'button';
					paletteBlock.addEventListener('click', function changeColor(e) {
						context.strokeStyle = e.target.style.backgroundColor;
					});

					paletteBlock.style.backgroundColor = (
						'rgb(' + Math.round(r * 255 / max) + ", "
						+ Math.round(g * 255 / max) + ", "
						+ Math.round(b * 255 / max) + ")"
					);

					palette.appendChild(paletteBlock);
				}
			}
		}
	};

	function changeActive_class(e) {

		let zalivka = document.getElementById("zalivka").children[0];
		let lastik = document.getElementById("lastik").children[0];
		let pipets = document.getElementById("pipets").children[0];
		let brush = document.getElementById("brush").children[0];
		let circle =  document.getElementById("circle").children[0];

		if (zalivka.classList.contains("active_instrument")) {
			zalivka.classList.remove("active_instrument")
		}
		if (lastik.classList.contains("active_instrument")) {
			lastik.classList.remove("active_instrument")
		}
		if (pipets.classList.contains("active_instrument")) {
			pipets.classList.remove("active_instrument")
		}

		if (brush.classList.contains("active_instrument")) {
			brush.classList.remove("active_instrument")
		}
		if (circle.classList.contains("active_instrument")) {
			circle.classList.remove("active_instrument")
		}

		window["active_instr"] = this.id;

		e.target.classList.add("active_instrument");

	}

	function getRadians(degrees) {
		return (Math.PI/180)*degrees;
	}
});
