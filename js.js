const API_URL = "https://funcv-evaadtgwekctbkha.eastus-01.azurewebsites.net/api/CosmosApi";

// Function to send data to Cosmos DB
document.getElementById("dataForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputData = document.getElementById("dataInput").value;

    // Sending the data to the Azure Function
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Date.now().toString(), text: inputData })
    });

    // Check if the response is OK (status code 200)
    if (response.ok) {
        alert("Data saved successfully!");
        document.getElementById("dataInput").value = ""; // Clear the input field
    } else {
        alert("Failed to save data.");
    }
});

// Function to fetch data from Cosmos DB
document.getElementById("fetchData").addEventListener("click", async () => {
    // Fetching data from the Azure Function
    const response = await fetch(API_URL);
    const data = await response.json();

    // Display the fetched data on the page
    const dataList = document.getElementById("dataList");
    dataList.innerHTML = ""; // Clear the existing list

    // Loop through each item and create an li element to display
    data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.text; // Display the text from the database
        dataList.appendChild(li);
    });
});
