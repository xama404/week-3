// ini adalah inisiasi cara pemanggilan expres 
const express = require('express')

//ini adalah variabel yang akan kita gunakan sebagai pengganti pemanggilan express
const app = express()
const port = 5000

//ini adalah route atau jalan untuk pemanggilan sebuah fungsi
app.get('/', function (req, res) {
  //res -> response
  //req -> request

    //ini fungsi unutk mendapatkan sebuah result dari server ke client
  res.send('Hello World')
})



app.get("/about", (req, res)=>{
    res.send('My name Harry')
})

app.get("/testimonial", (req, res) => {
    res.json([
      {
          image:"https://th.bing.com/th/id/OSK.HEROdvn-G8xEhi0AoPDTdOwgNoC9vBNTimyzzaZq1RNVszw?rs=1&pid=ImgDetMain",
          content: "YANTOKATES (YNTKTS)",
          author: "JKW 2014-∞",
          rating: 5
      },
  
      {
          image:"https://3.bp.blogspot.com/-u33xQRd9HzA/TdFrTNa2TiI/AAAAAAAAAUc/ENrfKUBILC4/s1600/soeharto%252C.jpg",
          content: "PENAK JAMAN KU TOH?",
          author: "SOEHARTO 1966-1998",
          rating: 5
      },
  
      {
          image:"https://th.bing.com/th/id/OIP.GDHkq-JoAL3U-y3u7EId0wHaDt?rs=1&pid=ImgDetMain",
          content: "Samlekom mamang",
          author: "H Adolf",
          rating: 1
      },
  
      {
          image:"https://cms.disway.id/uploads/d41ca36417a1949a8c518c322adfaba1.jpg",
          content: "Uhuyyyyy",
          author: "Komeng",
          rating: 4
      },
  
      {
          image:"https://th.bing.com/th/id/OIP.RcrcbnYtzrfV22zJV9zyPAHaGr?rs=1&pid=ImgDetMain",
          content: "Beat Mber lu warna apa Bosss",
          author: "Timothy Ronald",
          rating: 3
      },
  
  ]);
    
})

//ini adalah inisiasi port yang akan digunakan
app.listen(port, () => {
  console.log(`server berjalan pada port ${port}`);
  
});
//port 3000 digunakan karna tidak terpakai dimanapun 