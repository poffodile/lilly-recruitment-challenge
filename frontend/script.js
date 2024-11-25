   // Global variable to store medicines
let medicines = [];
// fetch data from the backend and display in the frontend
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
    }

    // Display the data in the table
    function medicineDisplay(data) {
        const table = document.getElementById("medicine-table");
        table.innerHTML = ""; // clear the table

        data.forEach ((medicine) => {
            const row = document.createElement("tr");
            // create a new row for each medicine
            const name = document.createElement("td");
            if (medicine.name && medicine.name.trim() !== "") {
                name.textContent = medicine.name; // Valid name
            } else {
                name.textContent = "No Name"; // Invalid name
                name.classList.add("invalid-data"); // Add red styling for invalid data
            }
            row.appendChild(name);

            

            // handles invalid prices 
            const price = document.createElement("td");
            if (typeof medicine.price === "number" && medicine.price >0 ) {
                price.textContent = medicine.price;   // handles valid prices
               
            } else {
                price.textContent = "No Price"; // handles invalid prices
                price.classList.add("invalid-data"); // Add red styling for invalid data
            }
            

            row.appendChild(price);

            table.appendChild(row);

            
        });
    

    }
        // Add event listener for the search bar

    

  const form = document.querySelector("#medicine-form");  // references the form element
    async  function  sendData() {
        // Associate the FormData object with the form element
        const formData = new FormData(form);

        //validation
        const name = formData.get("name")?.trim(); // Get and trim the name field
        const price = parseFloat(formData.get("price")); // Parse price as a number
      
        if (!name || name.trim() === "") {   //check 
            alert("Please enter a valid medicine name.");
            return;
          }
           // is not a number 
          if (isNaN(price) || price <= 0) {
            alert("Please enter a valid price greater than 0.");
            return;
          }

        try {
            const response = await fetch("http://localhost:8000/create", {
            method: "POST",
            body: formData,  // sets formdata as an instance of the request body
             });

             if (!response.ok) {
                 throw new Error(`Response status: ${response.status}`);
             }
             const result = await response.json();  //parses and logs the servers response as json
             console.log (result);

             // provides user feeedback and refreshes the table 
                alert("Medicine added successfully");
                form.reset();  // Clears the form fields
                getData(); // refreshes the table with the new data
            } catch (error) {
                console.error("Error adding medicine: ", error.message);
                document.getElementById("feedback-message").textContent = "Failed to add medicine. Please try again";
                alert ("Failed to add medicine. Please try again");
            }
        }


        async function fetchAveragePrice() {
          const url = "http://localhost:8000/average";
          try {
              const response = await fetch(url);
              if (!response.ok) {
                  throw new Error(`Response status: ${response.status}`);
              }
      
              const data = await response.json();
              const avgPriceElement = document.getElementById("average-price");
              if (data.average_price > 0) {
                  avgPriceElement.textContent = `£${data.average_price}`;
              } else {
                  avgPriceElement.textContent = data.message; // e.g., "No valid prices found."
              }
          } catch (error) {
              console.error("Error fetching average price:", error.message);
              document.getElementById("average-price").textContent = "Error fetching average price.";
          }
      }
      
      // Call the function when the page loads
      fetchAveragePrice();
      
        
    
// Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    sendData(); // Calls the sendData function


  });

  getData(); // fetches and displays the data when the page loads 

  