import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateBtnNext(page) {
    return `
          <button data-goto="${
            page + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
  }
  _generateBtnPrev(page) {
    return `
          <button data-goto="${
            page - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
          </button>
        `;
  }
  _generateBtn(currentPage, numberOfPages) {
    // Page 1, and there are other pages
    if (currentPage === 1 && numberOfPages > 1)
      return this._generateBtnNext(currentPage);

    // Last page
    if (currentPage === numberOfPages && numberOfPages > 1)
      return this._generateBtnPrev(currentPage);

    // Other page
    if (currentPage < numberOfPages) {
      return [
        this._generateBtnPrev(currentPage),
        this._generateBtnNext(currentPage),
      ];
    }

    // Page 1, and there are NO other pages
    return '';
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    return this._generateBtn(curPage, numPages);
  }
}

export default new PaginationView();
