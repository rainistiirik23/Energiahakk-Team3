const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();
const start = new Date(y, m, d).toISOString();
const end = new Date(y, m, d).toISOString();
const showPrice =  document.getElementById("price");
const showDate =  document.getElementById("date");
let dates = [];
let prices = [];


fetch(`https://dashboard.elering.ee/api/nps/price?start=${start}&end${end}`)
  .then(response => response.json())
  .then(res => {

    res.data.ee.forEach(el => {
        const date = new Date(el.timestamp * 1000);
        
        const options = {  hour: '2-digit', minute: '2-digit'};
        const localDate = date.toLocaleString('et-EE', options);
        dates.push(localDate);
        prices.push(el.price);
        
        console.log(localDate, el.price);

        showPrice.innerHTML = el.price;
        showDate.innerHTML = localDate;
      })
      
    });

    console.log(dates, prices);
    
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Prices per hour',
                data: prices,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });