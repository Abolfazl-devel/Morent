'use strike';

//Opening and closing statistics chart
const openingAndClosingChartButton = document.getElementById('top-products__menu-icon');
const chart = document.getElementById('top-products__statistics');


openingAndClosingChartButton.onclick = function () {
    
    if (chart.style.display == 'none') {
        chart.style.display = 'flex';
    } else {
        chart.style.display = 'none';
    };
};