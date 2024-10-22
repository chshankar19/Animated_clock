let intervalId;

function startClock() {
  if (intervalId) return;

  intervalId = setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    moveColumn("hoursTens", Math.floor(hours / 10));
    moveColumn("hoursOnes", hours % 10);
    moveColumn("minutesTens", Math.floor(minutes / 10));
    moveColumn("minutesOnes", minutes % 10);
    moveColumn("secondsTens", Math.floor(seconds / 10));
    moveColumn("secondsOnes", seconds % 10);
  }, 1000);
}

function stopClock() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function moveColumn(id, value) {
  const column = document.getElementById(id);
  const columnInner = column.querySelector('.column-inner');

  // Remove 'active' class from all elements
  Array.from(columnInner.children).forEach(child => child.classList.remove('active'));

  // Add 'active' class to the current value
  const activeElement = columnInner.children[value];
  activeElement.classList.add('active');

  // Adjust the transform to align the column correctly
  column.style.transform = `translateY(${-value * 50}px)`;
}

function populateColumn(columnId, max) {
  const columnInner = document.getElementById(columnId).querySelector('.column-inner');
  columnInner.innerHTML = ''; // Clear previous content

  for (let i = 0; i <= max; i++) {
    const div = document.createElement('div');
    div.textContent = i;
    columnInner.appendChild(div);
  }

  const columnHeight = (max + 1) * 50; // Adjust based on height
  document.getElementById(columnId).style.height = `${columnHeight}px`;
}

function populateAllColumns() {
  populateColumn("hoursTens", 2);
  populateColumn("hoursOnes", 9);
  populateColumn("minutesTens", 5);
  populateColumn("minutesOnes", 9);
  populateColumn("secondsTens", 5);
  populateColumn("secondsOnes", 9);
}

// Event Listeners for Buttons
document.getElementById("startBtn").addEventListener("click", startClock);
document.getElementById("stopBtn").addEventListener("click", stopClock);

// Populate all columns on load
populateAllColumns();
