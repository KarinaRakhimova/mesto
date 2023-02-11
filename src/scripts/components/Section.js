export default class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(data) {
    data.forEach((item) => this.addItem(item))
  }

  addItem(item) {
    const renderedCard = this._renderer(item)
    this._container.prepend(renderedCard);
  }
}
