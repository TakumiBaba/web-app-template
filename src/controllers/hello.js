
const helloHandler = (req, res) => {
  res.send('hello')
}

export default (app) => {
  app.get('/', helloHandler)
}
