export default class Card {

  constructor (card, config, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
    this._config = config;
    this._cardElement = document.querySelector(this._config.template).content.children[0].cloneNode(true);
    this._handleCardClick = handleCardClick;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle(config.likeActive)
  }

  _deleteElement() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setListeners() {
    this._cardElement.querySelector(this._config.like).addEventListener('click', (evt) => this._toggleLike(evt));
    this._cardElement.querySelector(this._config.delete).addEventListener('click', () => this._deleteElement());
    this._cardElement.querySelector(this._config.image).addEventListener('click', () => this._handleCardClick())
  }

  render() {
    this._cardElement.querySelector(this._config.heading).textContent = this._name;
    this._cardElement.querySelector(this._config.image).alt = this._name;
    this._cardElement.querySelector(this._config.image).src = this._link;
    this._setListeners();
    return this._cardElement;
  }
}


