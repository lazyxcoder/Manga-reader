const chapterSelect = document.getElementById('chapterSelect');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const chapterContent = document.getElementById('chapterContent');

let chapters = [];

function loadChapter(chapterIndex) {
  if (chapterIndex < 0 || chapterIndex >= chapters.length) return;

  const chapter = chapters[chapterIndex];
  chapterContent.innerHTML = `<p>Now reading: ${chapter.name}</p>`;

  chapterSelect.value = chapter.id;
  prevBtn.disabled = chapterIndex === 0;
  nextBtn.disabled = chapterIndex === chapters.length - 1;
}

function findChapterIndexById(id) {
  return chapters.findIndex(chap => chap.id === id);
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('data/manga.json')
    .then(res => res.json())
    .then(data => {
      chapters = data.chapters;

      // Clear current options
      chapterSelect.innerHTML = '';

      // Add options dynamically
      chapters.forEach(chapter => {
        const option = document.createElement('option');
        option.value = chapter.id;
        option.textContent = chapter.name;
        chapterSelect.appendChild(option);
      });

      // Load first chapter by default
      loadChapter(0);
    })
    .catch(err => {
      chapterContent.textContent = 'Failed to load chapters.';
      console.error(err);
    });
});

// Handle select change
chapterSelect.addEventListener('change', () => {
  const selectedId = parseInt(chapterSelect.value);
  const index = findChapterIndexById(selectedId);
  if (index !== -1) loadChapter(index);
});

// Prev button click
prevBtn.addEventListener('click', () => {
  const currentIndex = findChapterIndexById(parseInt(chapterSelect.value));
  if (currentIndex > 0) loadChapter(currentIndex - 1);
});

// Next button click
nextBtn.addEventListener('click', () => {
  const currentIndex = findChapterIndexById(parseInt(chapterSelect.value));
  if (currentIndex < chapters.length - 1) loadChapter(currentIndex + 1);
});
