const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');

const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.redirect('/rooms/1');
});

app.get('/rooms/:id', function(req, res) {
  const reactPath = path.join(__dirname, '../public/index.html');
  res.sendFile(reactPath);
});

app.use(express.static(path.join(__dirname, 'public')));

//Reviews
const reviewsOptions = {
  target: 'http://127.0.0.1:3002'
  // changeOrigin: true
};
const reviewsProxy = proxy(reviewsOptions);
app.use('/api/rooms/:id/reviews', reviewsProxy);

//Photos
const photosOptions = {
  target: 'http://127.0.0.1:3004',
  changeOrigin: true
};
const photosProxy = proxy(photosOptions);
app.use('/api/rooms/:id/photos', photosProxy);

//bookings
const calendarOptions = {
  target: 'http://127.0.0.1:3001'
  // changeOrigin: true
};
const calendarProxy = proxy(calendarOptions);
app.use('/api/rooms/:id/bookings', calendarProxy);

//Room info
const infoOptions = {
  target: 'http://127.0.0.1:3003'
  // changeOrigin: true
};
const infoProxy = proxy(infoOptions);
app.use('/api/rooms/:id', infoProxy);

//server
app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
