export default class Card {

  static selectors = {
    like: '.element__like',
    delete: '.element__delete',
    likeActive: 'element__like_active',
    image: '.element__image',
    heading:'.element__heading',
    template: '.element-template',
  }

  constructor (card, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
    //this._selector = selector;
    this._cardElement = document.querySelector(Card.selectors.template).content.children[0].cloneNode(true);
    this._handleCardClick = handleCardClick;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle(Card.selectors.likeActive)
  }

  _deleteElement() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setListeners() {
    this._cardElement.querySelector(Card.selectors.like).addEventListener('click', (evt) => this._toggleLike(evt));
    this._cardElement.querySelector(Card.selectors.delete).addEventListener('click', () => this._deleteElement());
    this._cardElement.querySelector(Card.selectors.image).addEventListener('click', () => this._handleCardClick())
  }

  render() {
    this._cardElement.querySelector(Card.selectors.heading).textContent = this._name;
    this._cardElement.querySelector(Card.selectors.image).alt = this._name;
    this._cardElement.querySelector(Card.selectors.image).src = this._link;
    this._setListeners();
    return this._cardElement;
  }
}

