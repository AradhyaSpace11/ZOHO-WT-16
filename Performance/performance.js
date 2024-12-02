// Initialize Chart.js for Division Chart
const divisionChartCtx = document.getElementById('divisionChart');
const top5ChartCtx = document.getElementById('top5Chart');

if (divisionChartCtx) {
    const divisionChart = new Chart(divisionChartCtx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'],
            datasets: [{
                label: 'Students by Grade',
                data: [50, 60, 40, 70, 80],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        }
    });
}

if (top5ChartCtx) {
    const top5Chart = new Chart(top5ChartCtx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['John Doe', 'Jane Smith', 'Alice Brown', 'Bob Johnson', 'Charlie Green'],
            datasets: [{
                label: 'Top 5 Performers',
                data: [98, 92, 85, 80, 73],
                backgroundColor: '#FF6384'
            }]
        }
    });
}

// Placeholder average score calculation
const averageScoreElem = document.getElementById('average-score');
if (averageScoreElem) {
    averageScoreElem.innerText = '85.6';
}

// Function to toggle score details visibility
function toggleScoreDetails(id) {
    const details = document.getElementById(id);
    if (details) {
        const icon = details.previousElementSibling.querySelector('.fas');
        details.style.display = details.style.display === 'block' ? 'none' : 'block';
        
        if (icon) {
            icon.classList.toggle('open');
        }
    }
}
