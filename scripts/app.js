import { loadHome } from './home.js';
import { loadDataTable } from './data.js';
import { loadCalculator } from './calc.js';

document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById('content');

    document.getElementById('homeBtn').addEventListener('click', () => {
        loadHome(contentDiv);
    });

    document.getElementById('dataBtn').addEventListener('click', () => {
        loadDataTable(contentDiv);
    });

    document.getElementById('calcBtn').addEventListener('click', () => {
        loadCalculator(contentDiv);
    });

    loadHome(contentDiv);
});
