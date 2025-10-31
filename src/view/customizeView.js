class HeaderView {
  _nameEl = document.querySelector(".username");
  _joinedEl = document.querySelector(".join-date");

  renderUser(user) {
    this._nameEl.textContent = user.name;
    this._joinedEl.textContent = `Joined: ${new Date(
      user.joinedDate
    ).toLocaleDateString()}`;
  }
}

export default new HeaderView();
