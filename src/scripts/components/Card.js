export default class Card {

  constructor (card, config, userId, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = card.name;
    this._link = card.link;
    this._id = card._id
    this._userId = userId;
    this._ownerId = card.owner._id;
    this._likes = card.likes;
    this._config = config;
    this._cardElement = document.querySelector(this._config.template).content.children[0].cloneNode(true);
    this._likeButton = this._cardElement.querySelector(this._config.like);
    this._likeCounter = this._cardElement.querySelector(this._config.likeCounter);
    this._deleteButton = this._cardElement.querySelector(this._config.delete);
    this._image = this._cardElement.querySelector(this._config.image);
    this._heading = this._cardElement.querySelector(this._config.heading);
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  like(evt) {
    evt.target.classList.add(this._config.likeActive)
  }

  unlike(evt) {
    evt.target.classList.remove(this._config.likeActive)
  }

  updateLikes(res) {
    this._likeCounter.textContent = res.likes.length;
    this._likes = res.likes;
  }

   deleteElement() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setListeners() {
    this._likeButton.addEventListener('click', (evt) => this._handleLikeClick(evt, this));
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this));
    this._image.addEventListener('click', () => this._handleCardClick());
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove()
    }
  }

  render() {
    this._heading.textContent = this._name;
    this._image.alt = this._name;
    this._image.src = this._link;
    this._likeCounter.textContent = this._likes.length;
    this._setListeners();
    if (this._likes.find(like=>like._id === this._userId)) {
      this._likeButton.classList.add(this._config.likeActive)
    }
    return this._cardElement;
  }
}


