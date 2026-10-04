const shelfData = {
  'Jujutsu Kaisen': [
    {
      title: 'jjk manga',
      url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/tracemonkey.pdf'
    }
  ]
};

const readerModal = document.getElementById('readerModal');
const readerTitle = document.getElementById('readerTitle');
const readerPages = document.getElementById('readerPages');
const progressLabel = document.getElementById('readerProgress');
const closeReader = document.getElementById('closeReader');
const nextPageBtn = document.getElementById('nextPage');
const prevPageBtn = document.getElementById('prevPage');

let currentPdf = null;
let currentPage = 1;
let currentPdfUrl = '';

function buildShelves() {
  for (const [shelfName, items] of Object.entries(shelfData)) {
    const gridId = shelfName.toLowerCase().replace(/\s+/g, '-') + '-grid';
    const grid = document.getElementById(gridId);

    if (!grid) continue;

    items.forEach((item) => {
      const button = document.createElement('button');
      button.className = 'book-card';
      button.type = 'button';
      button.setAttribute('aria-label', `Open ${item.title}`);

      button.innerHTML = `
        <div class="book-cover" data-pdf-url="${item.url}"></div>
        <div class="book-info">
          <div class="book-title">${item.title}</div>
        </div>
      `;

      button.addEventListener('click', () => openReader(item.url, item.title));
      grid.appendChild(button);
    });

    renderCoversForShelf(gridId);
  }
}

function renderCoversForShelf(gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.querySelectorAll('.book-cover').forEach((cover) => {
    const pdfUrl = cover.dataset.pdfUrl;
    const canvas = document.createElement('canvas');
    cover.appendChild(canvas);
    renderPageToCanvas(pdfUrl, 1, canvas, 0.25);
  });
}

function openReader(pdfUrl, title) {
  currentPdfUrl = pdfUrl;
  readerTitle.textContent = title;
  readerModal.classList.add('open');
  readerModal.setAttribute('aria-hidden', 'false');
  currentPage = 1;

  pdfjsLib
    .getDocument(pdfUrl)
    .promise.then((pdf) => {
      currentPdf = pdf;
      renderReader();
    })
    .catch((error) => {
      console.error('Could not load PDF:', error);
      readerPages.innerHTML = '<p>This PDF could not be opened.</p>';
      progressLabel.textContent = 'Error';
    });
}

function renderReader() {
  if (!currentPdf) return;

  const totalPages = currentPdf.numPages;
  const start = Math.max(1, currentPage);
  const end = Math.min(totalPages, start + 1);

  readerPages.innerHTML = '';

  for (let pageNumber = start; pageNumber <= end; pageNumber++) {
    const canvas = document.createElement('canvas');
    canvas.className = 'reader-page';
    renderPageToCanvas(currentPdfUrl, pageNumber, canvas, 0.85);
    readerPages.appendChild(canvas);
  }

  progressLabel.textContent = `${start}${end > start ? ` - ${end}` : ''} / ${totalPages}`;
}

function goToPage(direction) {
  if (!currentPdf) return;

  const step = 2;
  const nextPage = currentPage + direction * step;
  const totalPages = currentPdf.numPages;

  currentPage = Math.min(Math.max(1, nextPage), totalPages);
  renderReader();
}

function renderPageToCanvas(pdfUrl, pageNumber, canvas, scaleMultiplier) {
  if (!pdfjsLib || !pdfUrl) return;

  const loadingTask = pdfjsLib.getDocument(pdfUrl);

  loadingTask.promise
    .then((pdf) => {
      pdf.getPage(pageNumber).then((page) => {
        const viewport = page.getViewport({ scale: 1.5 * scaleMultiplier });
        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({
          canvasContext: context,
          viewport
        }).promise.catch((error) => {
          console.warn('Page render issue:', error);
        });
      });
    })
    .catch((error) => {
      console.warn('Could not fetch PDF for preview:', error);
    });
}

closeReader.addEventListener('click', () => {
  readerModal.classList.remove('open');
  readerModal.setAttribute('aria-hidden', 'true');
  currentPdf = null;
  currentPage = 1;
  readerPages.innerHTML = '';
});

nextPageBtn.addEventListener('click', () => goToPage(1));
prevPageBtn.addEventListener('click', () => goToPage(-1));

readerModal.addEventListener('click', (event) => {
  if (event.target === readerModal) {
    closeReader.click();
  }
});

buildShelves();
