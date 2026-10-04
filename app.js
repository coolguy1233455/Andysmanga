const shelfData = {
  "Jujutsu Kaisen": [
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v00.2021.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v01.2019.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v02.2020.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v03.2020.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v04.2020.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v05.2020.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v06.2020.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v07.2020.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v08.2021.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v09.2021.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v10.2021.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v11.2021.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v12.2021.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v13.2021.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v14.2022.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v15.2022.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v16.2022.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v17.2022.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v18.2022.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v19.2023.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v20.2023.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v21.2023.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v22.2024.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v23.2024.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v24.2024.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v25.2024.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v26.2024.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v27.2024.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v28.2024.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v29.2024.pdf" },
    { title: "JJK manga", url: "https://github.com/coolguy1233455/Andysmanga/releases/download/Jjk/Jujutsu.Kaisen.v30.2024.pdf" }
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

function renderShelves() {
  const shelfContainer = document.getElementById('shelfContainer');
  if (!shelfContainer) return;

  shelfContainer.innerHTML = '';

  Object.entries(shelfData).forEach(([shelfName, books]) => {
    const shelf = document.createElement('section');
    shelf.className = 'shelf';

    const header = document.createElement('div');
    header.className = 'shelf-header';
    header.innerHTML = `<h2>${shelfName}</h2>`;

    const bookshelf = document.createElement('div');
    bookshelf.className = 'bookshelf';

    const row = document.createElement('div');
    row.className = 'book-row';

    books.forEach((book) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'book-card';
      card.setAttribute('aria-label', `Open ${book.title}`);

      card.innerHTML = `
        <div class="book-spine" data-pdf-url="${book.url}">
          <span class="book-title">${book.title}</span>
        </div>
      `;

      card.addEventListener('click', () => openReader(book.url, book.title));
      row.appendChild(card);
    });

    bookshelf.appendChild(row);
    shelf.appendChild(header);
    shelf.appendChild(bookshelf);
    shelfContainer.appendChild(shelf);
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
      console.error('PDF failed to load:', error);
      readerPages.innerHTML = '<p>Could not open this PDF.</p>';
      progressLabel.textContent = 'Error';
    });
}

function renderReader() {
  if (!currentPdf) return;

  const totalPages = currentPdf.numPages;
  const start = Math.max(1, currentPage);
  const end = Math.min(start + 1, totalPages);

  readerPages.innerHTML = '';

  for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
    const canvas = document.createElement('canvas');
    canvas.className = 'reader-page';
    renderPdfPage(currentPdfUrl, pageNumber, canvas, 0.9);
    readerPages.appendChild(canvas);
  }

  progressLabel.textContent = `${start}${end > start ? ' - ' + end : ''} / ${totalPages}`;
}

function goToPage(direction) {
  if (!currentPdf) return;

  const nextPage = currentPage + direction * 2;
  const totalPages = currentPdf.numPages;

  currentPage = Math.min(Math.max(1, nextPage), totalPages);
  renderReader();
}

function renderPdfPage(pdfUrl, pageNumber, canvas, scaleMultiplier) {
  pdfjsLib
    .getDocument(pdfUrl)
    .promise.then((pdf) => {
      pdf.getPage(pageNumber).then((page) => {
        const viewport = page.getViewport({ scale: 1.25 * scaleMultiplier });
        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({
          canvasContext: context,
          viewport
        }).catch((error) => {
          console.warn('Render error', error);
        });
      });
    })
    .catch((error) => {
      console.warn('Failed to load PDF for preview:', error);
    });
}

closeReader.addEventListener('click', () => {
  readerModal.classList.remove('open');
  readerModal.setAttribute('aria-hidden', 'true');
  currentPage = 1;
  currentPdf = null;
  readerPages.innerHTML = '';
});

nextPageBtn.addEventListener('click', () => goToPage(1));
prevPageBtn.addEventListener('click', () => goToPage(-1));

readerModal.addEventListener('click', (event) => {
  if (event.target === readerModal) {
    closeReader.click();
  }
});

renderShelves();
