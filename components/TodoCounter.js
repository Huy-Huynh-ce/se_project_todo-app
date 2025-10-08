class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this.completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted(increment) {
    this.completed += increment ? 1 : -1;
    this._updateText();
  }

  updateTotal(increment) {
    this._total += increment ? 1 : -1;
    this._updateText();
  }

  _updateText() {
    this._element.textContent = `showing ${this._completed} out of ${this._total} conpleted`;
  }
}

export default TodoCounter;
