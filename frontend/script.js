 // Array  varaiable to store medicine data
  let medicines= [];
  let loggedInUser = null; // To track a logged-in user


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
        getData(); // Fetch and display medicine data

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
        

    // Handles the  form submission
  const form = document.querySelector("#medicine-form");  // references the form element
    async  function  sendData() {
        // Associate the FormData object with the form element
        const formData = new FormData(form);

        //validation
        const name = formData.get("name")?.trim(); // Gets and trims the name field
        const price = parseFloat(formData.get("price")); // Parse price as a number
      
        if (!name || name.trim() === "") {    
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
                fetchAveragePrice(); // Refreshes the average price after adding a medicine
              } catch (error) {
                console.error("Error adding medicine: ", error.message);
                document.getElementById("feedback-message").textContent = "Failed to add medicine. Please try again";
                alert ("Failed to add medicine. Please try again");
            }
        }
            
            // Handle form submission
            form.addEventListener("submit", (event) => {
              event.preventDefault(); // Prevents the default form submission behavior
              sendData(); // Calls the sendData function
           });


        async function fetchAveragePrice() {
          const avgPriceElement = document.getElementById("average-price");
    avgPriceElement.textContent = "Loading..."; // Display loading message

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

    fetchAveragePrice(); // Fetch and display average price
     
    //Handle login/signup logic
    const formHeader = document.getElementById("form-header");
    const authForm = document.getElementById("auth-form");
    const confirmPasswordContainer = document.getElementById("confirm-password-container");
    const toggleLink = document.getElementById("toggle-link");
    const authSubmitBtn = document.getElementById("auth-submit-btn");
    const authFeedback = document.getElementById("auth-feedback");
    const logoutButton = document.getElementById("logout-button");
    
    let isLoginMode = true; // Tracks whether the form is in login or signup mode
    
    // Toggle between login and signup
    toggleLink.addEventListener("click", (event) => {
        event.preventDefault();
        isLoginMode = !isLoginMode;
    
        if (isLoginMode) {
            formHeader.textContent = "Login";
            confirmPasswordContainer.style.display = "none";
            authSubmitBtn.textContent = "Login";
            toggleLink.textContent = "Don't have an account? Sign up";
        } else {
            formHeader.textContent = "Sign Up";
            confirmPasswordContainer.style.display = "block";
            authSubmitBtn.textContent = "Sign Up";
            toggleLink.textContent = "Already have an account? Login";
        }
    });
    
    // Handles login/signup form submission
    authForm.addEventListener("submit", async (event) => {
        event.preventDefault();
    
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();
    
        authFeedback.
    
        authFeedb
    textContent = "";
    
        // Validation
        if (!username || !password) {
            authFeedback.textContent = "Please enter both username and password.";
            authFeedback.style.color = "red";
            return;
        }
    
        if (!isLoginMode && password !== confirmPassword) {
            authFeedback.textContent = "Passwords do not match.";
            authFeedback.style.color = "red";
            
            re
    return;
        }
    
        const url = isLoginMode ? "http://localhost:8000/login" : "http://localhost:8000/signup";
    
        try {
            
         
    const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                throw new Error(`${isLoginMode ? "Login" : "Signup"} failed: ${response.status}`);
            }
    
            const data = await response.json();
            authFeedback.textContent = isLoginMode
                ? "Login successful!"
                : "Signup successful! You can now log in.";
            authFeedback.
          
    style.color = "green";
    
            if (isLoginMode) {
                loggedInUser = username; // Track the logged-in user
                toggleAuthState(true); // Update UI to show logout button
            }
        } catch (error) {
            console.error("Error:", error.message);
            authFeedback.textContent = isLoginMode
                ? "Login failed. Please check your credentials."
                : "Signup failed. Please try again.";
            authFeedback.style.color = "red";
        }
    });
    
    // Toggle between logged-in and logged-out states
    function toggleAuthState(isLoggedIn) {
        if (isLoggedIn) {
            document.getElementById("auth-section").style.display = "none";
            logoutButton.style.display = "block";
            alert(`Welcome, ${loggedInUser}`);
        } else {
            document.getElementById("auth-section").style.display = "block";
            logoutButton.style.display = "none";
            loggedInUser = null;
        }
    }
    
    // Handle logout
    logoutButton.addEventListener("click", () => {
        toggleAuthState(false); // Reset UI to logged-out state
        alert("You have been logged out.");
    });
    
    // Fetch and display average price
    async function fetchAveragePrice() {
        const avgPriceElement = document.getElementById("average-price");
        avgPriceElement.textContent = "Loading...";
    
        const url = "http://localhost:8000/average";
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch average price: ${response.status}`);
    
            const data = await response.json();
            avgPriceElement.textContent = data.average_price
                ? 
         
    `£${data.average_price}`
                : "No valid prices found.";
        } catch (error) {
            console.error("Error fetching average price:", error.message);
            avgPriceElement.textContent = "Error fetching average price.";
        }
    }
    
   // Function to handle sorting
function sortMedicines(criteria) {
  let sortedMedicines = [...medicines]; // Clone the original array to avoid mutating it

  switch (criteria) {
      case "name-asc":
          sortedMedicines.sort((a, b) => a.name.localeCompare(b.name));
          break;
      case "name-desc":
          sortedMedicines.sort((a, b) => b.name.localeCompare(a.name));
          break;
      case "price-asc":
          sortedMedicines.sort((a, b) => a.price - b.price);
          break;
      case "price-desc":
          sortedMedicines.sort((a, b) => b.price - a.price);
          break;
      default:
          // No sorting applied
          sortedMedicines = medicines;
          break;
  }

  medicineDisplay(sortedMedicines); // Re-render the table with sorted data
}

// Event listener for the dropdown
const sortSelect = document.getElementById("sort-select");
sortSelect.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  sortMedicines(selectedOption); // Call the sorting function with the selected option
});

