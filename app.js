const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();
const start = new Date(y, m, d).toISOString();
const end = new Date(y, m, d).toISOString();
const showPrice =  document.getElementById("price");
const showDate =  document.getElementById("date");


fetch(`https://dashboard.elering.ee/api/nps/price?start=${start}&end${end}`)
  .then(response => response.json())
  .then(res => {

    res.data.ee.forEach(el => {
        const date = new Date(el.timestamp * 1000);
        const options = { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const localDate = date.toLocaleString('et-EE', options);
        console.log(localDate, el.price);

        showPrice.innerHTML = el.price;
        showDate.innerHTML = localDate;
    })

    
    
    });
  
