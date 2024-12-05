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

// Score distribution chart
function createScoreDistributionChart() {
    const ctx = document.getElementById('scoreDistributionChart').getContext('2d');
    
    const data = {
        labels: ['0-5', '5-10', '10-15', '15-20'],
        datasets: [
            {
                label: 'Question 1',
                data: [5, 15, 45, 35], // Example data: number of students in each range
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Question 2',
                data: [8, 20, 42, 30], // Example data: number of students in each range
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Question 3',
                data: [10, 25, 40, 25], // Example data: number of students in each range
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white' // Make legend text white
                    }
                },
                title: {
                    display: true,
                    text: 'Score Distribution by Question',
                    color: 'white', // Make title text white
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Students',
                        color: 'white' // Make y-axis title white
                    },
                    ticks: {
                        color: 'white' // Make y-axis labels white
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)' // Make grid lines slightly visible
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Score Ranges',
                        color: 'white' // Make x-axis title white
                    },
                    ticks: {
                        color: 'white' // Make x-axis labels white
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)' // Make grid lines slightly visible
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    createScoreDistributionChart();
});
