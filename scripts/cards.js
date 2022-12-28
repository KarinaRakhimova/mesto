import { openPopup } from "./index.js"

export class Card {

  static selectors = {
    like: '.element__like',
    delete: '.element__delete',
    likeActive: 'element__like_active',
    image: '.element__image',
    heading:'.element__heading',
    imagePopup: '.popup_type_element-image',
    imagePopupOpened: 'popup_opened',
    imageOpened: '.popup__image',
    imageCaption: '.popup__caption'
  }

  constructor (card, selector) {
    this._name = card.name;
    this._link = card.link;
    this._selector = selector;
    this._cardElement = document.querySelector(this._selector).content.children[0].cloneNode(true);
  }

  _toggleLike(evt) {
    evt.target.classList.toggle(Card.selectors.likeActive)
  }

  _deleteElement() {
    this._cardElement.remove()
  }

  // второй вариант удаления элемента, какой предпочтительнее?
  //_removeCard(evt) {
  //   evt.target.closest('.element').remove();
  // }


  _handleImagePopup() {
    const imagePopup = document.querySelector(Card.selectors.imagePopup);
    imagePopup.querySelector(Card.selectors.imageOpened).src = this._link;
    imagePopup.querySelector(Card.selectors.imageCaption).textContent = this._name;
    openPopup(imagePopup)
  }


  _setListeners() {
    this._cardElement.querySelector(Card.selectors.like).addEventListener('click', (evt) => this._toggleLike(evt));
    this._cardElement.querySelector(Card.selectors.delete).addEventListener('click', () => this._deleteElement());
    this._cardElement.querySelector(Card.selectors.image).addEventListener('click', () => this._handleImagePopup())
    // this._cardElement.querySelector(Card.selectors.delete).addEventListener('click', (evt) => this._removeCard(evt));
  }

  render() {
    this._cardElement.querySelector(Card.selectors.heading).textContent = this._name;
    this._cardElement.querySelector(Card.selectors.image).alt = this._name;
    this._cardElement.querySelector(Card.selectors.image).src = this._link;
    this._setListeners();
    return this._cardElement;
  }
}

