async function getData() {
    const url = "http://localhost:8000/medicines";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); // this logs in the fetched data 
      medicineDisplay(data.medicines);// displays the data in the table 
    } catch (error) {
      console.error( "Error fetching data: ",error.message);
    }

    function medicineDisplay(data) {
        const table = document.getElementById("medicine-table");
        table.innerHTML = ""; // clear the table

        data.forEach ((medicine) => {
            const row = document.createElement("tr");

            const name = document.createElement("td");
            name.textContent = medicine.name ;
            row.appendChild(name);

            const price = document.createElement("td");
            price.textContent = medicine.price;

            row.appendChild(price);

            table.appendChild(row);

            
        }
    

    )}
  }

  getData(); // fetches and displays the data when the page loads 