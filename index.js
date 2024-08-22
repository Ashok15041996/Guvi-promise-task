document.addEventListener('DOMContentLoaded', function() {
    const accessKey = '050c07ef2955cbb68e1b9189de17b94c';
    const apiUrl = `https://api.marketstack.com/v1/intraday?symbols=AAPL&access_key=${accessKey}`;

    // Fetch data from the API using Promises
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('data-container').innerHTML = `<p class="text-danger">Error fetching data: ${error.message}</p>`;
        });
});

/**
 * Display the fetched data on the webpage
 * @param {Object} data - The data fetched from the API
 */
function displayData(data) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    // Assuming data.data is an array of market data points
    if (data.data && data.data.length > 0) {
        data.data.forEach(item => {
            const dataCard = document.createElement('div');
            dataCard.className = 'col-12 col-md-6 col-lg-4 data-card';

            dataCard.innerHTML = `
                <h3>${item.symbol}</h3>
                <p><strong>Price:</strong> ${item.price}</p>
                <p><strong>Date:</strong> ${new Date(item.date).toLocaleString()}</p>
                <p><strong>Volume:</strong> ${item.volume}</p>
            `;

            dataContainer.appendChild(dataCard);
        });
    } else {
        dataContainer.innerHTML = '<p>No data available.</p>';
    }
}
