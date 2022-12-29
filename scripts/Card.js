import {imagePopup, imageElement, imageCaption} from './utils.js'

export class Card {

  static selectors = {
    like: '.element__like',
    delete: '.element__delete',
    likeActive: 'element__like_active',
    image: '.element__image',
    heading:'.element__heading',
  }

  constructor (card, selector, openPopupFn) {
    this._name = card.name;
    this._link = card.link;
    this._selector = selector;
    this._cardElement = document.querySelector(this._selector).content.children[0].cloneNode(true);
    this._openPopup = openPopupFn;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle(Card.selectors.likeActive)
  }

  _deleteElement() {
    this._cardElement.remove();
    //подскажи пожалуйста, что имеется в виду под "зануллить"? это про оператор delete или нет?
    //delete this._cardElement;

  }

  _handleImagePopup() {
    imageElement.src = this._link;
    imageCaption.textContent = this._name;
    this._openPopup(imagePopup);
  }

  _setListeners() {
    this._cardElement.querySelector(Card.selectors.like).addEventListener('click', (evt) => this._toggleLike(evt));
    this._cardElement.querySelector(Card.selectors.delete).addEventListener('click', () => this._deleteElement());
    this._cardElement.querySelector(Card.selectors.image).addEventListener('click', () => this._handleImagePopup())
  }

  render() {
    this._cardElement.querySelector(Card.selectors.heading).textContent = this._name;
    this._cardElement.querySelector(Card.selectors.image).alt = this._name;
    this._cardElement.querySelector(Card.selectors.image).src = this._link;
    this._setListeners();
    return this._cardElement;
  }
}

