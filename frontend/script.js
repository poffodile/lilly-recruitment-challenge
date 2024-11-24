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
            // create a new row for each medicine
            const name = document.createElement("td");   // handles invalid names
            name.textContent = medicine.name && medicine.name.trim() !== "" ? medicine.name : "No Name";
            row.appendChild(name);

            // handles invalid prices 
            const price = document.createElement("td");
            if (typeof medicine.price === "number" && medicine.price >0 ) {
                price.textContent = medicine.price;   // handles valid prices
               
            } else {
                price.textContent = "No Price"; // handles invalid prices
            }
            

            row.appendChild(price);

            table.appendChild(row);

            
        }
    

    )}
  }

  getData(); // fetches and displays the data when the page loads 