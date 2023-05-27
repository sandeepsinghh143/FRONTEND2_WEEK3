// Fetch data using async/await
async function fetchData() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      renderTable(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  
  
  function renderTable(data) {
    const table = document.getElementById('cryptoTable');
  
    // Clear table body
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
  
    // Populate table with data
    for (let i = 0; i < data.length; i++) {
      const { name, id, image, symbol, current_price, total_volume, price_change_percentage_24h, market_cap } = data[i];
  
      const row = table.insertRow();
      row.insertCell().innerHTML = `<img src = ${image} alt="img">`;
      row.insertCell().textContent = name;
      row.insertCell().textContent = symbol.toUpperCase();
      row.insertCell().textContent = "$"+current_price;
      row.insertCell().textContent = "$"+total_volume.toLocaleString();
      row.insertCell().textContent = price_change_percentage_24h.toFixed(2)+"%";
      row.insertCell().textContent = "Mkt Cap: $"+market_cap.toLocaleString();
  
    }
  }
  
  let inputEl=document.getElementById("input-search");
  inputEl.addEventListener("keypress", search);
  function search(event) {
    if (event.key === "Enter"){
        event.preventDefault();
    const filter = inputEl.value.toLowerCase();
    const rows = document.querySelectorAll('#cryptoTable tr');
  
    for (let i = 0; i < rows.length; i++) {
      const name = rows[i].cells[1].textContent.toLowerCase();
      const symbol = rows[i].cells[2].textContent.toLowerCase();
  
      if (name.includes(filter) || symbol.includes(filter)) {
        rows[i].style.display = '';
      } else {
        rows[i].style.display = 'none';
      }
    }
}
  }
  
  function sortByMarketCap() {
    const table = document.getElementById('cryptoTable');
    const rows = Array.from(table.rows).slice(1);
  
    
    rows.sort((a, b) => {
      const marketCapA = parseFloat(a.cells[6].textContent.replace(/,/g, ''));
      const marketCapB = parseFloat(b.cells[6].textContent.replace(/,/g, ''));
      return marketCapB - marketCapA;
    });
  
    // Reorder the table rows based on the sorted rows
    for (let i = 0; i < rows.length; i++) {
      table.appendChild(rows[i]);
    }
  }
  
  function sortByPercentageChange() {
    const table = document.getElementById('cryptoTable');
    const rows = Array.from(table.rows).slice(1); // Exclude the header row
  
    // Sort rows based on percentage change
    rows.sort((a, b) => {
      const percentageChangeA = parseFloat(a.cells[5].textContent);
      const percentageChangeB = parseFloat(b.cells[5].textContent);
      return percentageChangeB - percentageChangeA;
    });
  
    // Reorder the table rows based on the sorted rows
    for (let i = 0; i < rows.length; i++) {
      table.appendChild(rows[i]);
    }
  }
  
  // Call the fetchData function to fetch and render the data
  fetchData();
  
  // Step 1: Retrieve the table
const table = document.getElementById('your-table-id');

// Step 2: Retrieve all rows in the table
const rows = table.getElementsByTagName('tr');

// Step 3: Iterate through each row
for (let i = 0; i < rows.length; i++) {
  const row = rows[i];

  // Step 4: Retrieve the 5th column cell in the current row
  const cell = row.getElementsByTagName('td')[5]; // 0-based index for columns, so 4 represents the 5th column

  // Step 5: Get the current innerText value of the cell
  const currentInnerText = cell.innerText;

  // Step 6: Parse innerText to float
  const parsedFloat = parseFloat(currentInnerText);

  // Step 7: Check if parsedFloat is less than 0
  if (parsedFloat < 0) {
    // Step 8: Change the text color if condition is true
    cell.style.color = 'red'; // Set the desired color (e.g., red)
  }
}