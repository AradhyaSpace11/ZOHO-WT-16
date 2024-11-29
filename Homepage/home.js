// Get the chart canvas element
const ctx = document.getElementById('attendanceChart').getContext('2d');

// Create sample data for the last 10 days
const lastTenDays = Array.from({length: 10}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (9 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
});

// Sample attendance data
const attendanceData = {
    'Division A': [75, 82, 68, 90, 85, 88, 92, 78, 85, 89],
    'Division B': [80, 85, 70, 88, 82, 85, 90, 75, 82, 87],
    'Division C': [72, 78, 65, 85, 80, 82, 88, 73, 80, 85],
    'Division D': [78, 83, 69, 89, 84, 86, 91, 76, 83, 88]
};

// Define distinct colors for each division
const divisionColors = {
    'Division A': {
        border: '#4CAF50',  // Green
        background: 'rgba(76, 175, 80, 0.1)'
    },
    'Division B': {
        border: '#2196F3',  // Blue
        background: 'rgba(33, 150, 243, 0.1)'
    },
    'Division C': {
        border: '#9C27B0',  // Purple
        background: 'rgba(156, 39, 176, 0.1)'
    },
    'Division D': {
        border: '#F44336',  // Red
        background: 'rgba(244, 67, 54, 0.1)'
    }
};

// Create the chart
const attendanceChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: lastTenDays,
        datasets: [{
            label: 'Overall Attendance',  // Updated label
            data: attendanceData['Division A'],  // Use data for Division A
            borderColor: '#2196F3',  // Updated to blue
            backgroundColor: 'rgba(33, 150, 243, 0.1)',  // Updated to blue with transparency
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            pointBackgroundColor: '#2196F3',  // Updated to blue
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Previous 10 Days Attendance',
                font: {
                    size: 15,
                    weight: 'bold'
                },
                padding: 20,
                color: '#333'
            },
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14
                },
                bodyFont: {
                    size: 13
                },
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y}%`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                min: 60,
                max: 100,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    },
                    font: {
                        size: 12
                    }
                },
                title: {
                    display: true,
                    text: 'Attendance Percentage',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                title: {
                    display: true,
                    text: 'Date',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                        size: 12
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const sortBySelect = document.getElementById('sortBy');
    const sortOrderSelect = document.getElementById('sortOrder');
    const attendanceFilter = document.getElementById('attendanceFilter');
    const nameFilter = document.getElementById('nameFilter');
    const usnFilter = document.getElementById('usnFilter');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');

    // Function to show/hide filters based on selection
    function updateFilterVisibility(selectedValue) {
        // Hide all filters first
        attendanceFilter.style.display = 'none';
        nameFilter.style.display = 'none';
        usnFilter.style.display = 'none';

        // Show the selected filter
        switch(selectedValue) {
            case 'attendance':
                attendanceFilter.style.display = 'block';
                break;
            case 'name':
                nameFilter.style.display = 'block';
                break;
            case 'usn':
                usnFilter.style.display = 'block';
                break;
        }
    }

    // Event listener for select change
    sortBySelect.addEventListener('change', function() {
        updateFilterVisibility(this.value);
    });

    // Apply Filters
    applyFiltersBtn.addEventListener('click', function() {
        const filterType = sortBySelect.value;
        const sortOrder = sortOrderSelect.value;
        let filterValue;

        switch(filterType) {
            case 'attendance':
                filterValue = document.getElementById('attendanceThreshold').value;
                console.log('Filtering by attendance:', filterValue + '%', 'Order:', sortOrder);
                break;
            case 'name':
                filterValue = document.getElementById('nameSearch').value;
                console.log('Filtering by name:', filterValue, 'Order:', sortOrder);
                break;
            case 'usn':
                const start = document.getElementById('usnStart').value;
                const end = document.getElementById('usnEnd').value;
                console.log('Filtering by USN range:', start, 'to', end, 'Order:', sortOrder);
                break;
        }
        // Add your filtering and sorting logic here
    });

    // Reset Filters
    resetFiltersBtn.addEventListener('click', function() {
        sortBySelect.value = 'attendance';
        sortOrderSelect.value = 'high';
        document.getElementById('attendanceThreshold').value = '';
        document.getElementById('nameSearch').value = '';
        document.getElementById('usnStart').value = '';
        document.getElementById('usnEnd').value = '';
        updateFilterVisibility('attendance');
    });

    // Initialize with default view
    updateFilterVisibility('attendance');
});

// Sample data generator for 100 students
function generateStudentData() {
    const divisions = ['A', 'B', 'C', 'D'];
    const firstNames = ['Aarav', 'Aditi', 'Akash', 'Ananya', 'Arjun', 'Diya', 'Ishaan', 'Kavya', 'Krishna', 'Meera',
        'Neha', 'Pranav', 'Priya', 'Rahul', 'Riya', 'Rohan', 'Sanya', 'Shivam', 'Tanvi', 'Vihaan'];
    const lastNames = ['Kumar', 'Singh', 'Patel', 'Shah', 'Sharma', 'Reddy', 'Gupta', 'Verma', 'Joshi', 'Malhotra',
        'Chopra', 'Mehta', 'Agarwal', 'Rao', 'Nair'];
    
    return Array.from({ length: 100 }, (_, index) => {
        const totalClasses = 40;
        const attended = Math.floor(Math.random() * 15) + 25; // Random attendance between 25 and 40
        const attendancePercentage = Math.floor((attended / totalClasses) * 100);
        
        return {
            usn: `01JST20CS${String(index + 1).padStart(3, '0')}`,
            name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            division: divisions[Math.floor(Math.random() * divisions.length)],
            attendance: attendancePercentage,
            classesAttended: `${attended}/${totalClasses}`
        };
    });
}

// Generate and store student data
const students = generateStudentData();

// Sort students by USN initially
students.sort((a, b) => a.usn.localeCompare(b.usn));

function updateStudentList(filterType, filterValue, sortOrder) {
    const tableBody = document.getElementById('studentTableBody');
    const noResults = document.getElementById('noResults');
    
    // Filter students based on criteria
    let filteredStudents = students.filter(student => {
        switch(filterType) {
            case 'attendance':
                return student.attendance >= parseInt(filterValue);
            case 'name':
                return student.name.toLowerCase().includes(filterValue.toLowerCase());
            case 'usn':
                return student.usn >= filterValue.start && student.usn <= filterValue.end;
            default:
                return true;
        }
    });

    // Sort students
    filteredStudents.sort((a, b) => {
        let comparison = 0;
        switch(filterType) {
            case 'attendance':
                comparison = b.attendance - a.attendance;
                break;
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'usn':
                comparison = a.usn.localeCompare(b.usn);
                break;
        }
        return sortOrder === 'low' ? -comparison : comparison;
    });

    // Clear existing table content
    tableBody.innerHTML = '';

    // Show no results message if no students match criteria
    if (filteredStudents.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    // Populate table with filtered and sorted students
    filteredStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.usn}</td>
            <td>${student.name}</td>
            <td>${student.division}</td>
            <td class="attendance-cell ${getAttendanceClass(student.attendance)}">
                ${student.attendance}%
            </td>
            <td>${student.classesAttended}</td>
        `;
        tableBody.appendChild(row);
    });
}

function getAttendanceClass(attendance) {
    if (attendance >= 85) return 'attendance-high';
    if (attendance >= 75) return 'attendance-medium';
    return 'attendance-low';
}

// Update the apply filters event listener
document.getElementById('applyFilters').addEventListener('click', function() {
    const filterType = document.getElementById('sortBy').value;
    const sortOrder = document.getElementById('sortOrder').value;
    let filterValue;

    switch(filterType) {
        case 'attendance':
            filterValue = document.getElementById('attendanceThreshold').value;
            break;
        case 'name':
            filterValue = document.getElementById('nameSearch').value;
            break;
        case 'usn':
            filterValue = {
                start: document.getElementById('usnStart').value,
                end: document.getElementById('usnEnd').value
            };
            break;
    }

    updateStudentList(filterType, filterValue, sortOrder);
});

// Reset button should also clear the table
document.getElementById('resetFilters').addEventListener('click', function() {
    // ... existing
});

// Update your Chart.js options
const chartOptions = {
    plugins: {
        legend: {
            labels: {
                font: {
                    size: 14,
                    weight: '500'
                },
                color: window.matchMedia('(prefers-color-scheme: dark)').matches ? 
                    '#ffffff' : '#1a1a1a'
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: window.matchMedia('(prefers-color-scheme: dark)').matches ? 
                    'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
                color: window.matchMedia('(prefers-color-scheme: dark)').matches ? 
                    '#ffffff' : '#1a1a1a',
                font: {
                    size: 12,
                    weight: '500'
                }
            }
        },
        y: {
            grid: {
                color: window.matchMedia('(prefers-color-scheme: dark)').matches ? 
                    'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
                color: window.matchMedia('(prefers-color-scheme: dark)').matches ? 
                    '#ffffff' : '#1a1a1a',
                font: {
                    size: 12,
                    weight: '500'
                }
            }
        }
    }
};

// Ensure selected options remain visible
document.querySelectorAll('.filter-select').forEach(select => {
    select.addEventListener('change', function() {
        this.style.color = '#000000';
        
        // Add a custom attribute to mark as selected
        this.setAttribute('data-selected', 'true');
        
        // Force the text color after selection
        setTimeout(() => {
            this.style.color = '#000000';
        }, 10);
    });
    
    // Initialize color for pre-selected options
    if (select.value) {
        select.style.color = '#000000';
        select.setAttribute('data-selected', 'true');
    }
});

// Function to filter students based on attendance threshold
function filterStudentsByAttendance() {
    const threshold = document.getElementById('attendanceThreshold').value;
    const tableBody = document.querySelector('#studentTable tbody');
    const rows = tableBody.getElementsByTagName('tr');
    let hasVisibleRows = false;

    // Iterate through all rows
    for (let row of rows) {
        const attendanceCell = row.cells[2]; // Assuming attendance is in the third column
        const attendanceValue = parseFloat(attendanceCell.textContent);
        
        if (threshold === '' || attendanceValue <= threshold) {
            row.style.display = ''; // Show row
            hasVisibleRows = true;
            
            // Add highlight class if attendance is below threshold
            if (attendanceValue <= threshold) {
                row.classList.add('low-attendance');
            } else {
                row.classList.remove('low-attendance');
            }
        } else {
            row.style.display = 'none'; // Hide row
        }
    }

    // Show "No students found" message if no rows are visible
    const noDataMessage = document.querySelector('.no-data-message');
    if (!hasVisibleRows) {
        if (!noDataMessage) {
            const message = document.createElement('div');
            message.className = 'no-data-message';
            message.textContent = 'No students found below the specified attendance threshold.';
            tableBody.parentNode.insertBefore(message, tableBody.nextSibling);
        }
    } else if (noDataMessage) {
        noDataMessage.remove();
    }
}

// Event listener for the filter button
document.getElementById('applyFilters').addEventListener('click', function() {
    const filterType = document.getElementById('sortBy').value;
    
    if (filterType === 'attendance') {
        filterStudentsByAttendance();
    }
});

// Event listener for the reset button
document.getElementById('resetFilters').addEventListener('click', function() {
    // Reset the threshold input
    document.getElementById('attendanceThreshold').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#studentTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
        row.classList.remove('low-attendance');
    });
    
    // Remove any "No students found" message
    const noDataMessage = document.querySelector('.no-data-message');
    if (noDataMessage) {
        noDataMessage.remove();
    }
});

// Add input validation for threshold
document.getElementById('attendanceThreshold').addEventListener('input', function() {
    let value = this.value;
    if (value > 100) this.value = 100;
    if (value < 0) this.value = 0;
});

// Function to filter and sort students
function filterAndSortStudents() {
    const filterType = document.getElementById('sortBy').value;
    const sortOrder = document.getElementById('sortOrder').value;
    const tableBody = document.querySelector('#studentTable tbody');
    const rows = Array.from(tableBody.getElementsByTagName('tr'));
    
    // Get threshold value for attendance
    const thresholdValue = parseFloat(document.getElementById('attendanceThreshold').value);

    // Filter rows
    let hasVisibleRows = false;
    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        let show = true;

        if (filterType === 'attendance' && !isNaN(thresholdValue)) {
            // Get attendance value from the third column (index 2)
            // Remove '%' and any whitespace, then convert to number
            const attendanceText = cells[2].textContent.trim().replace('%', '');
            const attendance = parseFloat(attendanceText);
            
            // Debug log to check values
            console.log('Attendance:', attendance, 'Threshold:', thresholdValue);
            
            // Show row if attendance is less than threshold
            show = attendance <= thresholdValue;
            if (show) hasVisibleRows = true;
        }
        
        // Display or hide the row
        row.style.display = show ? '' : 'none';
    });

    // Sort visible rows
    const visibleRows = rows.filter(row => row.style.display !== 'none');
    visibleRows.sort((a, b) => {
        const aAttendance = parseFloat(a.cells[2].textContent.replace('%', ''));
        const bAttendance = parseFloat(b.cells[2].textContent.replace('%', ''));
        
        return sortOrder === 'high' ? 
            bAttendance - aAttendance : 
            aAttendance - bAttendance;
    });

    // Clear and repopulate table with sorted rows
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    visibleRows.forEach(row => tableBody.appendChild(row));

    // Update no data message
    updateNoDataMessage(!hasVisibleRows);
}

// Helper function to update "No students found" message
function updateNoDataMessage(show) {
    let messageDiv = document.querySelector('.no-data-message');
    
    if (show) {
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.className = 'no-data-message';
            messageDiv.style.textAlign = 'center';
            messageDiv.style.padding = '20px';
            messageDiv.style.color = '#000000';
            messageDiv.style.fontWeight = '500';
            messageDiv.textContent = 'No students found below the specified attendance threshold.';
            const table = document.querySelector('#studentTable');
            table.parentNode.insertBefore(messageDiv, table.nextSibling);
        }
    } else if (messageDiv) {
        messageDiv.remove();
    }
}

// Event Listeners
document.getElementById('applyFilters').addEventListener('click', function() {
    const threshold = document.getElementById('attendanceThreshold').value;
    if (threshold === '') {
        alert('Please enter a threshold value');
        return;
    }
    filterAndSortStudents();
});

// Input validation for threshold
document.getElementById('attendanceThreshold').addEventListener('input', function() {
    let value = parseFloat(this.value);
    if (value > 100) this.value = 100;
    if (value < 0) this.value = 0;
});

// Reset filters
document.getElementById('resetFilters').addEventListener('click', function() {
    // Reset input values
    document.getElementById('attendanceThreshold').value = '';
    document.getElementById('sortOrder').value = 'high';
    
    // Show all rows
    const tableBody = document.querySelector('#studentTable tbody');
    const rows = tableBody.getElementsByTagName('tr');
    Array.from(rows).forEach(row => {
        row.style.display = '';
    });
    
    // Remove no data message
    const messageDiv = document.querySelector('.no-data-message');
    if (messageDiv) {
        messageDiv.remove();
    }
});

// Add this debug function to check table data
function debugTableData() {
    const rows = document.querySelectorAll('#studentTable tbody tr');
    rows.forEach(row => {
        const attendance = row.cells[2].textContent;
        console.log('Row attendance:', attendance);
    });
}

// Call this on page load
document.addEventListener('DOMContentLoaded', debugTableData);

// Function to create an animated pie chart with center percentage
function createAnimatedPieChart(canvasId, targetPercentage, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    // Create the chart
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [0, 100], // Start with 0
                backgroundColor: [color, 'rgba(255, 255, 255, 0.2)'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            animation: {
                animateRotate: false,
                animateScale: true,
                duration: 2000,
                easing: 'easeOutQuad'
            },
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false },
                centerText: {
                    display: true,
                    color: color,
                    font: {
                        size: '20px',
                        weight: 'bold',
                        family: 'Arial'
                    }
                }
            }
        },
        plugins: [centerTextPlugin]
    });

    // Animate the chart to target percentage
    setTimeout(() => {
        chart.data.datasets[0].data = [targetPercentage, 100 - targetPercentage];
        chart.update();
    }, 100);
}

// Custom plugin to display text in the center
const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart) => {
        const { width, height, ctx } = chart;
        const centerText = chart.options.plugins.centerText;

        if (centerText && centerText.display) {
            // Get the current percentage (first dataset value)
            const currentPercentage = Math.round(chart.data.datasets[0].data[0]);

            ctx.save();
            ctx.font = `${centerText.font.weight} ${centerText.font.size} ${centerText.font.family}`;
            ctx.fillStyle = centerText.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${currentPercentage}%`, width / 2, height / 2);
            ctx.restore();
        }
    }
};

// Create the charts with the desired percentages and colors
createAnimatedPieChart('overallAttendanceChart', 82, 'rgb(0, 225, 30)');
createAnimatedPieChart('previousAttendanceChart', 90, 'rgb(51, 255, 0)');

  