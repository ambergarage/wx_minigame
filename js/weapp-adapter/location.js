const location = {
  href: 'game.js',

  reload() {
  },
  hash: '#',
  replace(href) {
    this.href = href
  },
}

export default location
