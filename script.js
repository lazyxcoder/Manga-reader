// script.js

document.addEventListener('DOMContentLoaded', () => {
  fetch('data/manga.json')
    .then(response => response.json())
    .then(data => {
      const chapters = data.chapters;
      const container = document.createElement('div');
      
      chapters.forEach(chapter => {
        const link = document.createElement('a');
        link.textContent = chapter.name;
        link.href = `reader.html?file=${encodeURIComponent(chapter.file)}`;
        link.style.display = 'block';
        link.style.margin = '10px 0';
        container.appendChild(link);
      });
      
      document.body.appendChild(container);
    })
    .catch(err => {
      console.error('Failed to load manga data', err);
    });
});
