"use strict";
const space = document.querySelector(".space");
const container = document.querySelector(".container");
const app = document.querySelector(".app");
const labels = document.querySelector(".labels");
const labelTime = document.getElementById("time");
const labelWPM = document.getElementById("wpm");
const labelCPM = document.getElementById("cpm");
const labelMistakes = document.getElementById("mistakes");
const canvas = document.querySelector(".app>.canvas");
const canvasInput = document.getElementById("canvas-input");
const canvasDisp = document.querySelector(".text");
const buttons = document.querySelector("buttons");
const btnTryAgain = document.getElementById("try-again");
const btnShowInput = document.getElementById("show-input");
const result = document.querySelector(".result");
const resultDisp = document.querySelector(".result .canvas");
const adaptiveDisplay = document.querySelector(".adaptive-display");
const cssVariables = document.querySelector(":root");

let index = 0;
let inputIndex = 0;
let paraLength = 0;
let mistakes = 0;
let maxTime = 60,
	timeLeft = maxTime,
	state = true,
	colorState = true,
	timer = 0;

// Reset UI
function resetUI() {
	state = true;
	timeLeft = maxTime;
	inputIndex = mistakes = 0;
	labelWPM.textContent = 0;
	labelCPM.textContent = 0;
	labelMistakes.textContent = 0;
	labelTime.textContent = maxTime + "s";
}

// Display and calculate Time
function initTimer() {
	if (timeLeft > 0) {
		timeLeft--;
		labelTime.textContent = `${timeLeft}s`;
	} else {
		clearInterval(initTimer);
		labelTime.innerHTML =
			'<span style="color: rgb(255, 221, 0)">Time Out</span>';
	}
}

// Calculate WPM
function calculateWPM() {
	// Each word is considered of t characters so divide by 5
	let wpm = Math.round(
		((canvasInput.value.length - mistakes) / 5 / (maxTime - timeLeft)) * 60
	);

	// for first 1 specond maxTime - timeLeft will be 0 so wpm will become Infinity
	wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;

	return wpm;
}

// Calcualte CPM
function calculateCPM() {
	let cpm = Math.round(
		((canvasInput.value.length - mistakes) / (maxTime - timeLeft)) * 60
	);
	cpm = cpm < 0 || !cpm || cpm == Infinity ? 0 : cpm;

	return cpm;
}

// function for keypress Event listener
function type() {
	if (inputIndex < paraLength && timeLeft > 0) {
		// Timer
		if (state) {
			timer = setInterval(initTimer, 1000);
			state = false;
		}

		// document object for current character
		let char = document.getElementById(`char-${inputIndex}`);

		// Condition for backspace
		if (inputIndex >= canvasInput.value.length) {
			//Displaying blinking cursor and counting mistakes
			char.classList.toggle("active");
			inputIndex--;
			if (
				document
					.getElementById(`char-${inputIndex}`)
					.classList.contains("incorrect") &&
				!document
					.getElementById(`char-${inputIndex}`)
					.classList.contains("correct")
			) {
				mistakes--;
				console.log(mistakes);
				labelMistakes.textContent = mistakes;
			}
			document.getElementById(`char-${inputIndex}`).classList.toggle("active");
		}

		// Condition for normal flow
		else {
			//Displaying blinking cursor and counting mistakes
			char.classList.remove("active");
			document
				.getElementById(
					`char-${inputIndex < paraLength - 1 ? inputIndex + 1 : inputIndex}`
				)
				.classList.toggle("active");
			if (canvasInput.value[inputIndex] === char.textContent) {
				char.classList.add("correct");
			} else {
				mistakes++;
				labelMistakes.textContent = mistakes;
				char.classList.add("incorrect");
			}
			inputIndex++;
		}

		// Display WPM and CPM
		labelWPM.textContent = calculateWPM();
		labelCPM.textContent = calculateCPM();
	}
}

function initGame() {
	// get a random index from paragraphs array
	index = Math.floor(Math.random() * paragraphs.length);
	canvasDisp.textContent = paragraphs[index];
	paraLength = paragraphs[index].length;
	resetUI();

	// make span of each character of the paragraph
	canvasDisp.innerHTML = canvasDisp.textContent
		.split("")
		.reduce((res, curr, i) => res + `<span id="char-${i}">${curr}</span>`, ``);
}

initGame();

// Focusing input field on keydown or click even
canvas.addEventListener("click", () => {
	canvasInput.focus();
	document.getElementById(`char-${inputIndex}`).classList.add("active");
});

// Event listener for input keys
canvasInput.addEventListener("input", type);

// Event listener for showing input text
btnShowInput.addEventListener("click", () => {
	resultDisp.textContent = canvasInput.value;
	result.classList.toggle("hidden");
	timeLeft = 0;
});

// Event listener for Try Again
btnTryAgain.addEventListener("click", () => {
	canvasInput.blur();
	clearInterval(timer);
	canvasInput.value = "";
	result.classList.add("hidden");
	resetUI();
	initGame();
});
const bg_dark_color = "#333",
	bg_light_color = "rgb(231,254,255)",
	bg_app_dark_color = "#444",
	bg_app_light_color = "rgb(135,206,250)",
	bg_label_button_dark_color = "#999",
	bg_label_button_light_color = "rgb(205, 234, 239)",
	bg_canvas_dark_color = "#c4c4c4",
	bg_canvas_light_color = "white",
	bg_correct_dark_color = "#555",
	bg_correct_light_color = "rgb(60,208,112)";
adaptiveDisplay.addEventListener("click", (e) => {
	e.preventDefault();
	if (colorState) {
		cssVariables.style.setProperty("--bg-color", bg_light_color);
		cssVariables.style.setProperty("--bg-app-color", bg_app_light_color);
		cssVariables.style.setProperty(
			"--bg-label-button-color",
			bg_label_button_light_color
		);
		cssVariables.style.setProperty("--bg-canvas-color", bg_canvas_light_color);
		cssVariables.style.setProperty(
			"--bg-correct-color",
			bg_correct_light_color
		);
		colorState = !colorState;
	} else {
		cssVariables.style.setProperty("--bg-color", bg_dark_color);
		cssVariables.style.setProperty("--bg-app-color", bg_app_dark_color);
		cssVariables.style.setProperty(
			"--bg-label-button-color",
			bg_label_button_dark_color
		);
		cssVariables.style.setProperty("--bg-canvas-color", bg_canvas_dark_color);
		cssVariables.style.setProp;
		colorState = !colorState;
	}
});
