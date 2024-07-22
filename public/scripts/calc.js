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
                    <input type="text" class="calc-display total-display" id="calc1-total" readonly value="8000">
                    <input type="text" class="calc-display total-display" id="calc2-total" readonly value="8000">
                </div>

                <input type="text" class="calc-display variable-display" id="calc1-variable" readonly value="0">
                <div class="calc-buttons">
                    <!-- Números -->
                    <button class="calc-btn">7</button>
                    <button class="calc-btn">8</button>
                    <button class="calc-btn">9</button>
                    <br>
                    <button class="calc-btn">4</button>
                    <button class="calc-btn">5</button>
                    <button class="calc-btn">6</button>
                    <br>
                    <button class="calc-btn">1</button>
                    <button class="calc-btn">2</button>
                    <button class="calc-btn">3</button>
                    <br>
                    <button class="calc-btn">0</button>
                    <!-- Operações -->
                    <button class="calc-btn">+</button>
                    <button class="calc-btn">-</button>
                    <!-- Confirmar e Cancelar -->
                    <button class="calc-btn confirm">=</button>
                    <button class="calc-btn cancel">C</button>
                </div>

            </div>
        </div>
    `;

    // Seleciona todos os displays de total
    const totalDisplays = document.querySelectorAll('.total-display');
    const variableDisplays = document.querySelectorAll('.variable-display');
    // Inicialmente, define o primeiro total como ativo
    let activeTotalDisplay = totalDisplays[0];
    let activeVariableDisplay = variableDisplays[0];
    activeTotalDisplay.classList.add('active');

    // Função para alternar o total ativo
    totalDisplays.forEach((display, index) => {
        display.addEventListener('click', () => {
            // Remove a classe 'active' do total anteriormente ativo
            document.querySelector('.total-display.active')?.classList.remove('active');
            // Atualiza o total ativo e adiciona a classe 'active'
            activeTotalDisplay = display;
            activeTotalDisplay.classList.add('active');
        });
    });

    //console.log(variableDisplays);
    //console.log(totalDisplays);

    // Adiciona eventos aos botões de cada calculadora
    document.querySelectorAll('.calculator').forEach(calculator => {
        const buttons = calculator.querySelectorAll('.calc-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.innerText;
                handleButtonPress(value, activeTotalDisplay, activeVariableDisplay);
            });
        });
    });
    }

function handleButtonPress(value, totalDisplay, variableDisplay) {
    let currentInput = variableDisplay.value;

    //console.log(value);
    //console.log(totalDisplay);
    //console.log(variableDisplay);

    switch (value) {
        case '+':
            // Torna o valor positivo apenas se for negativo e diferente de '-0'
            if (currentInput.startsWith('-') && currentInput !== '-0') {
                currentInput = currentInput.substring(1);
            }
            break;
        case '-':
            // Torna o valor negativo, a menos que já seja '-0'
            if (!currentInput.startsWith('-')) {
                currentInput = '-' + currentInput;
            }
            break;
        case '=':
            // Calcula o total e reinicia o valor da variável para '-0'
            const total = parseInt(totalDisplay.value, 10);
            const variable = parseInt(currentInput, 10);
            totalDisplay.value = total + variable;
            currentInput = '0';
            break;
        case 'C':
            // Reinicia o valor da variável para '-0'
            currentInput = '0';
            break;
        default:
            // Adiciona o número mantendo o valor negativo, exceto se for '-0'
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

export { loadCalculator };