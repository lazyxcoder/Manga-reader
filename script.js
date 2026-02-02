 const chapterSelect = document.getElementById('chapterSelect');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const chapterContent = document.getElementById('chapterContent');

const totalChapters = chapterSelect.options.length;

function loadChapter(chapterNumber) {
  // Clear existing content
  chapterContent.innerHTML = '';

  // Placeholder: Load chapter pages here
  // For now, just show a message with chapter number
  const message = document.createElement('p');
  message.textContent = `You are now reading Chapter ${chapterNumber}. Manga pages will show here.`;
  chapterContent.appendChild(message);

  // Enable/disable buttons accordingly
  prevBtn.disabled = chapterNumber <= 1;
  nextBtn.disabled = chapterNumber >= totalChapters;

  // Update dropdown value if not synced
  if (parseInt(chapterSelect.value) !== chapterNumber) {
    chapterSelect.value = chapterNumber;
  }
}

// Event listeners
chapterSelect.addEventListener('change', () => {
  const selectedChapter = parseInt(chapterSelect.value);
  loadChapter(selectedChapter);
});

prevBtn.addEventListener('click', () => {
  let current = parseInt(chapterSelect.value);
  if (current > 1) {
    loadChapter(current - 1);
  }
});

nextBtn.addEventListener('click', () => {
  let current = parseInt(chapterSelect.value);
  if (current < totalChapters) {
    loadChapter(current + 1);
  }
});

// Load first chapter by default
loadChapter(1);
