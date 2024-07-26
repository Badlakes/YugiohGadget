let timerActive = false;

function loadCalculator(contentDiv) {
    contentDiv.innerHTML = `
        <div class="calculator-container">
            <!-- Calculadora 1 -->
            <div class="calculator>text</div>
        </div>
        <div class="calculator-container">
            <!-- Calculadora 1 -->
            <div class="calculator" id="calc1">
                
                <div class="calc-header">
                    <input type="text" class="calc-display" id="calc-timer" readonly value="45:00">
                    <button class="calc-display calc-btn start" id="startButton">Start</button>
                </div>

                <div class="calc-header">
                    <input type="text" class="calc-display total-display" id="calc1-total" readonly value="8000">
                    <input type="text" class="calc-display total-display" id="calc2-total" readonly value="8000">
                </div>

                <input type="text" class="calc-display variable-display" id="calc1-variable" readonly value="0">
                <div class="calc-header">
                </div>
                <div class="calc-buttons">
                    <!-- Números -->
                    <button class="calc-btn">9</button>
                    <button class="calc-btn">8</button>
                    <button class="calc-btn">7</button>
                    <button class="calc-btn">6</button>
                    <button class="calc-btn">5</button>
                    <button class="calc-btn">4</button>
                    <button class="calc-btn">3</button>
                    <button class="calc-btn">2</button>
                    <button class="calc-btn">1</button>
                    <button class="calc-btn">0</button>
                    <!-- Operações -->
                    <button class="calc-btn">+</button>
                    <button class="calc-btn">-</button>
                </div>
                <!-- Confirmar e Cancelar -->
                <div class="calc-footer">
                    <button class="calc-btn confirm">=</button>
                    <button class="calc-btn cancel">C</button>
                </div>
                <!-- Botão de Start -->
                <div class="calc-footer">
                    
                </div>
            </div>
        </div>
    `;

    const totalDisplays = document.querySelectorAll('.total-display');
    const variableDisplays = document.querySelectorAll('.variable-display');
    let activeTotalDisplay = totalDisplays[0];
    let activeVariableDisplay = variableDisplays[0];
    activeTotalDisplay.classList.add('active');

    totalDisplays.forEach((display, index) => {
        display.addEventListener('click', () => {
            document.querySelector('.total-display.active')?.classList.remove('active');
            activeTotalDisplay = display;
            activeTotalDisplay.classList.add('active');
        });
    });

    document.querySelectorAll('.calculator').forEach(calculator => {
        const buttons = calculator.querySelectorAll('.calc-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.innerText;
                handleButtonPress(value, activeTotalDisplay, activeVariableDisplay);
            });
        });
    });

    document.getElementById('startButton').addEventListener('click', startTimer);
}

function handleButtonPress(value, totalDisplay, variableDisplay) {
    let currentInput = variableDisplay.value;

    switch (value) {
        case '+':
            if (currentInput.startsWith('-') && currentInput !== '-0') {
                currentInput = currentInput.substring(1);
            }
            break;
        case '-':
            if (!currentInput.startsWith('-')) {
                currentInput = '-' + currentInput;
            }
            break;
        case '=':
            const total = parseInt(totalDisplay.value, 10);
            const variable = parseInt(currentInput, 10);
            totalDisplay.value = total + variable;
            currentInput = '0';
            break;
        case 'C':
            currentInput = '0';
            break;
        default:
            if (!isNaN(value)) {
                if (currentInput === '-0') {
                    currentInput = '-' + value;
                } else if (currentInput === '0') {
                    currentInput = '-' + value;
                } else {
                    currentInput += value;
                }
            }
            break;
    }

    variableDisplay.value = currentInput;
}

function startTimer() {
    if (timerActive) return;

    const timerDisplay = document.getElementById('calc-timer');
    const startButton = document.getElementById('startButton');
    let timeRemaining = 45 * 60; // 45 minutos em segundos

    timerActive = true;
    startButton.disabled = true;

    const timer = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timer);
            timerDisplay.value = "00:00";
            timerActive = false;
            startButton.disabled = false; // Reabilite o botão de start
            return;
        }

        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.value = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

export { loadCalculator };