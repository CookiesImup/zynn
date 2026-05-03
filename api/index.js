const express = require('express');
const path = require('path');

const app = express();

// static files (path-nya disesuaikan karena di dalam folder api)
app.use(express.static(path.join(__dirname, '../public')));
app.use('/image', express.static(path.join(__dirname, '../image')));

// route utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'main.html'));
});

// export untuk vercel (WAJIB)
module.exports = app;
