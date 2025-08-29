// DOM Elements
const heartCountSpan = document.getElementById('heart-count');
const coinCountSpan = document.getElementById('coin-count');
const callHistoryDiv = document.getElementById('call-history');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const navbarCopyBtn = document.getElementById('navbar-copy-btn');

// Initialize counts
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;

// Update counts in the UI
function updateCounts() {
  heartCountSpan.textContent = heartCount;
  coinCountSpan.textContent = coinCount;
  document.getElementById('copy-count').textContent = copyCount;
}

// Format time as HH:MM AM/PM
function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

// Handle call button click
function handleCall(serviceName, serviceNumber) {
  if (coinCount < 20) {
    alert('কল করার জন্য পর্যাপ্ত কয়েন নেই!');
    return;
  }
  coinCount -= 20;
  updateCounts();
  alert(`${serviceName} এ কল করা হচ্ছে: ${serviceNumber}`);

  // Add to call history
  const callTime = formatTime(new Date());
  const callItem = document.createElement('div');
  callItem.className = 'bg-white p-3 rounded-lg shadow flex justify-between items-center';
  callItem.innerHTML = `
    <div>
      <p class="font-semibold">${serviceName}</p>
      <p class="text-sm text-gray-500">${serviceNumber}</p>
    </div>
    <span class="text-xs text-gray-500">${callTime}</span>
  `;
  callHistoryDiv.prepend(callItem);
}

// Handle copy button click
function handleCopy(serviceNumber) {
  navigator.clipboard.writeText(serviceNumber)
    .then(() => {
      copyCount++;
      updateCounts();
      alert(`${serviceNumber} কপি করা হয়েছে!`);
    })
    .catch(err => {
      console.error('কপি করতে ব্যর্থ: ', err);
    });
}

// Clear call history
clearHistoryBtn.addEventListener('click', () => {
  callHistoryDiv.innerHTML = '<p class="text-center text-gray-500 py-4">Call History Empty</p>';
});

// Navbar copy button setup
navbarCopyBtn.innerHTML = `
  <span id="copy-count">${copyCount}</span>
  <i class="fa-solid fa-copy ml-1"></i> Copy
`;

// ✅ Card hearts increase navbar count only, no toggle
document.querySelectorAll('.card [id^="heart-"]').forEach(heartIcon => {
  heartIcon.addEventListener('click', () => {
    heartCount++;
    updateCounts();
    // No class toggle, so card heart does not fill
  });
});

// Add event listeners to call buttons
document.querySelectorAll('.call-btn').forEach(callBtn => {
  const card = callBtn.closest('.card');
  const serviceName = card.querySelector('h3').textContent;
  const serviceNumber = card.querySelector('h2 span').textContent; 
  callBtn.addEventListener('click', () => {
    handleCall(serviceName, serviceNumber);
  });
});

// Add event listeners to copy buttons
document.querySelectorAll('.copy-btn').forEach(copyBtn => {
  const card = copyBtn.closest('.card');
  const serviceNumber = card.querySelector('h2 span').textContent; 
  copyBtn.addEventListener('click', () => {
    handleCopy(serviceNumber);
  });
});

// Navbar copy button functionality
navbarCopyBtn.addEventListener('click', () => {
  const allNumbers = Array.from(document.querySelectorAll('.card h2 span')).map(num => num.textContent);
  navigator.clipboard.writeText(allNumbers.join(', '))
    .then(() => {
      copyCount++;
      updateCounts();
      alert(`সব নাম্বার কপি করা হয়েছে: ${allNumbers.join(', ')}`);
    });
});

// Initialize UI
updateCounts();
