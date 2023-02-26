const express = require('express');
const app = express();

// Udostępnij pliki w katalogu public jako statyczne zasoby
app.use(express.static('public'));

// Obsługa żądania GET do strony głównej
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/menu', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Nasłuchiwanie na porcie 3000
app.listen(3000, () => {
  console.log('Serwer jest uruchomiony na porcie 3000!');
});
