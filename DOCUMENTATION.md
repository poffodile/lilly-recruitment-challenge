# Lilly Technical Challenge Documentation Template
*** This documentation template serves as a place for you to discuss how you approached this challenge, any issues you faced & how you overcame them, or any other points that you feel would be relevant for the interviewers to know. The text in italics is here to guide you - feel free to remove it once you fill out each section! ***
# Finished Backend and Frontend Setup
 Prior to starting this project, I already had Git and Visual Studio Code installed. I set up the Python virtual environment (venv) to manage the project's dependencies, then installed all the required packages by running pip install -r requirements.txt. To ensure the backend was functioning correctly, I started the server and checked that it was running successfully by visiting http://localhost:8000/medicines in my browser. I also tested the frontend by opening the index.html file in my browser to confirm everything was loading as expected.

For the second objective, I added logic to handle empty or invalid entries. If the medicine name was missing, empty, or contained only whitespace, it would display "No Name." Similarly, for the price, I checked if it was greater than 0 (to ensure it was valid), and if it was invalid or missing, it displayed "No Price." I also added a .trim() method to prevent strings with only spaces from being accepted. I believe these validations help keep the table clean and readable. Additionally, I visually enhanced these invalid entries by styling them in red to make the errors more noticeable.

In the third objective, I created a form that allows users to add new medicines and their prices. I included validation to ensure the fields were not empty and that the price was a valid number greater than 0. When the user submits new data, it is sent to the backend, and the frontend table refreshes to display the updated data. This ensures the interface remains dynamic and responsive. I conducted several tests to validate this functionality, including scenarios with invalid data.

For the fourth objective, I added styling to visually highlight invalid data (e.g., missing names or prices) with red fonts. This improves user experience by making errors easy to identify.




***Not every section in this document is required. This is just a template to help get you started. Feel free to add or remove sections as you feel necessary. ***


## Approach
*How did you approach this challenge? Did you work through the objectives in any particular order? If so, why? Did you utilize any external resources, such as tutorials, guides, or other materials?*
- i worked through the objectives in the order that it was written and made use of a few youtube videos as well as webiste like w3schools and mdn web docs
link - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- https://www.w3schools.com/html/html_forms.asp ,
- https://developer.mozilla.org/en-US/docs/Learn/Forms/ Sending_forms_through_JavaScript


## Objectives - Innovative Solutions
*For the challenge objectives, did you do anything in a particular way that you want to discuss? Is there anything you're particularly proud of that you want to highlight? Did you attempt some objectives multiple times, or go back and re-write particular sections of code? If so, why? Use this space to document any key points you'd like to tell us about.*

 I included Accessible Rich Internet Applications (ARIA) to help improve accessibility for users who rely on assistive technologies, such as screen readers. ARIA provides HTML elements with additional information, making the interface easier to navigate for individuals with diverse needs.I feel like this was an important step because accessibility ensures that the site can be used by people with different abilities. For example, I used aria-labelledby to link form elements with their headings, ensuring screen readers can announce them clearly, and aria-live to notify users of dynamic updates like success messages. I believe using ARIA makes the application inclusive, and I am proud to have considered these aspects while developing the project, as people have different needs .
 - i also tested it using a screen reader chromVox and was happy when it worked. i tried to add a medicine and when it uploaded succefully it said "medicine added succesfully ". however i couldnt get it to announce or say  " medicine added succcesfully".

 - While working on Objective 3, I focused on creating a user-friendly solution that allows users to input data directly on the site and send it to the backend. This involved designing and implementing a form where users could add the name and price of a medicine. I ensured that the input fields were properly validated, preventing the submission of empty names or prices less than or equal to zero. Invalid inputs were highlighted with clear feedback to guide the user.

In addition, I implemented the optional task to calculate and display the average price of all medicines stored in the backend. I wrote a new backend endpoint to compute the average price dynamically, ensuring that invalid prices (e.g., non-numeric values or prices less than zero) were excluded from the calculation. On the frontend, I created a section that displayed the calculated average price in real-time whenever the page was loaded or refreshed. This integration between the backend and frontend showcases a seamless way to handle and display aggregate data.

Through these implementations, I enhanced the functionality of the application, making it interactive and responsive to user inputs while providing insightful information like the average price of medicines.

i  am currently working on adding  few functionalities , 
    - a search bar so that users can actually search to know if a particular medicine exist and how much it costs 



## Problems Faced
*Use this space to document and discuss any issues you faced while undertaking this challenge and how you solved them. We recommend doing this proactively as you experience and resolve the issues - make sure you don't forget! (Screenshots are helpful, though not required)*.
- one of the problems i faced was during my installation of python. it downloaded fine, but he terminal kept saying python was not recognised . i tried adding and removing it from the enviromental variables several times bit it still did not work.Another thing was that my terminal in vscode couldnt find the python path so i was stuck for while. it lead to me having duplicates of the ports,which caused more errore, After trying differnet thingas, i then  decided  to switch to using cmd (Command Prompt) instead of VS Code to test if Python was properly installed. It worked there, so I realized the issue was with VS Code.i restarting VS Code finally solved the problem, and it recognized Python properly after that.
    i learned  that when dealing with enviromemtal variable changes that it is important to restart the IDE.    ![port_error](image-1.png), ![python_not_recognized](image-2.png),
- i didnt really face any problems with first objective, only a mistake of my own doing where the tables in the index .html page was not showing but  that was only because i was using the wrong API endpoint in my fetch I used "http://localhost:8000/medicine" instead of "http://localhost:8000/medicines".After realizing the mistake, I corrected the endpoint in my JavaScript code, and the data loaded correctly. The frontend table started showing the medicines as expected.![css page](image-3.png)

- Another challenge was with the displaying the content properly  using css, I struggled with aligning elements and ensuring the layout adapted well to different screen sizes. For example, there were instances where the form and table overlapped or didn’t align properly, particularly on smaller screens. After numerous attempts and adjustments, I implemented flexbox and media queries to address these issues, ensuring the design was consistent across devices.
   Also when i was working on the form functionality,I encountered an issue where the invalid data (e.g., "No Name" or "No Price") styling wasn’t applying correctly. It turned out that I had placed the CSS class incorrectly, and the JavaScript logic wasn’t properly adding the class for invalid data.  ![table_display_problems ](image-4.png)

- Another problem occurred while implementing the optional task to calculate the average price. Initially, the backend function didn’t handle invalid or missing prices, which caused errors in the calculation. To resolve this, I added validation in the backend to filter out invalid prices, such as non-numeric values or negative numbers. This ensured the average was calculated accurately.
- i did also have difficulties ensuring the ARIA announcements worked consistently. Although I successfully implemented ARIA attributes, such as aria-live, I couldn’t get the screen reader to always announce the success message for adding medicines. 

## Evaluation
*How did you feel about the challenge overall? Did some parts go better than others? Did you run out of time? If you were to do this again, and were given more time, what would you do differently?*

