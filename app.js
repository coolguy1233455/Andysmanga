const shelfData = [
  {
    title: 'Latest drops',
    items: [
      {
        title: 'Night Reign',
        label: 'Action',
        note: 'Vol. 02 · Updated today',
        url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/tracemonkey.pdf'
      },
      {
        title: 'Fading Echoes',
        label: 'Drama',
        note: 'Vol. 09 · 3 chapters',
        url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/helloworld.pdf'
      },
      {
        title: 'Scars in Bloom',
        label: 'Romance',
        note: 'Vol. 06 · New pages',
        url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/asm.pdf'
      },
      {
        title: 'Orbit Zero',
        label: 'Sci-Fi',
        note: 'Vol. 11 · Final arc',
        url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/cmap.pdf'
      }
    ]
  },
  {
    title: 'Completed reads',
    items: [
      {
        title: 'Glass Harbor',
        label: 'Mystery',
        note: 'Vol. 14 · Finished',
        url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/helloworld.pdf'
      },
      {
        title: 'Shiver City',
        label: 'Fantasy',
        note: 'Vol. 07 · Completed',
        url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/tracemonkey.pdf'
      },
      {
        title: 'Sunlit Echo',
        label: 'Slice of life',
        note: 'Vol. 03 · Standalone',
        url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/asm.pdf'
      },
      {
        title: 'Velvet Run',
        label: 'Sports',
        note: 'Vol. 18 · Binge ready',
        url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/cmap.pdf'
      }
    ]
  },
  {
    title: 'New this week',
    items: [
      {
        title: 'Crimson Hollow',
        label: 'Action',
        note: 'Vol. 01 · Fresh upload',
        url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/tracemonkey.pdf'
      },
      {
        title: 'Luna Thread',
        label: 'Fantasy',
        note: 'Vol. 08 · 2 chapters',
        url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/heloworld.pdf'
      },
      {
        title: 'Afterglow Ink',
        label: 'Shojo',
        note: 'Vol. 05 · Readers favorite',
        url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/asm.pdf'
      },
      {
        title: 'Zero Hour',
        label: 'Thriller',
        note: 'Vol. 10 · Read now',
        url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/cmap.pdf'
      }
    ]
  }
];

const catalog = document.getElementById('catalog');
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

function buildCatalog() {
  shelfData.forEach((shelf) => {
    const section = document.createElement('section');
    section.className = 'shelf';

    const header = document.createElement('div');
    header.className = 'shelf-header';
    header.innerHTML = `<h3>${shelf.title}</h3>`;

    const grid = document.createElement('div');
    grid.className = 'book-grid';

    shelf.items.forEach((item) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'book-card';
      button.setAttribute('data-pdf-url', item.url);
      button.setAttribute('aria-label', `Open ${item.title}`);

      button.innerHTML = `
        <div class="book-cover" data-pdf-url="${item.url}"></div>
        <div class="book-meta">
          <div class="book-meta-header">
            <h4>${item.title}</h4>
            <span class="book-tags">${item.label}</span>
          </div>
          <p class="book-subtext">${item.note}</p>
        </div>
      `;

      button.addEventListener('click', () => openReader(item.url, item.title));
      grid.appendChild(button);
    });

    section.appendChild(header);
    section.appendChild(grid);
    catalog.appendChild(section);
  });

  renderCovers();
}

function renderCovers() {
  document.querySelectorAll('.book-cover').forEach((cover) => {
    const pdfUrl = cover.dataset.pdfUrl;
    const canvas = document.createElement('canvas');
    cover.appendChild(canvas);
    renderPageToCanvas(pdfUrl, 1, canvas, 0.22);
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
      readerPages.innerHTML = '<p class="book-subtext">This PDF could not be opened.</p>';
      progressLabel.textContent = 'Error';
    });
}

function renderReader() {
  if (!currentPdf) return;

  const totalPages = currentPdf.numPages;
  const start = Math.max(1, currentPage);
  const end = Math.min(totalPages, start + 1);

  readerPages.innerHTML = '';

  for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
    const canvas = document.createElement('canvas');
    canvas.className = 'reader-page';
    renderPageToCanvas(currentPdfUrl, pageNumber, canvas, 0.9);
    readerPages.appendChild(canvas);
  }

  progressLabel.textContent = `${start} - ${end} / ${totalPages}`;
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

  loadingTask.promise.then((pdf) => {
    pdf.getPage(pageNumber).then((page) => {
      const viewport = page.getViewport({ scale: 1.25 * scaleMultiplier });
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
  }).catch((error) => {
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

document.querySelector('.primary-btn').addEventListener('click', () => {
  const url = document.querySelector('.primary-btn').dataset.openBook;
  openReader(url, 'Night Reign');
});

buildCatalog();
