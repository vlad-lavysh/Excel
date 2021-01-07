class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector
  }

  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html
      return this
      // для успешного выполнения чейна (метод должен что-то вернуть)
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html("")
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    // -------
    this.$el.removeEventListener(eventType, callback)
  }

  // полифилл для метода append
  append(node) {
    if (node instanceof Dom)
      node == node.$el

    if (Element.prototype.append)
      this.$el.append(node.$el)
    else
      this.$el.appendChild(node.$el)

    return this
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach(key => {
          this.$el.style[key] = styles[key]
        })
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1],
      }
    }
    return this.data.id
  }

  focus() {
    this.$el.focus()
    return this
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName)
  if (classes) el.classList.add(classes)

  return $(el)
}
