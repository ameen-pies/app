const API_URL = "https://funcv-evaadtgwekctbkha.eastus-01.azurewebsites.net/api/CosmosApi";


// Function to send data to Cosmos DB
document.getElementById("dataForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputData = document.getElementById("dataInput").value;
    
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputData })
    });

    if (response.ok) {
        alert("Data saved successfully!");
        document.getElementById("dataInput").value = "";
    } else {
        alert("Failed to save data.");
    }
});

// Function to fetch data from Cosmos DB
document.getElementById("fetchData").addEventListener("click", async () => {
    const response = await fetch(API_URL);
    const data = await response.json();

    const dataList = document.getElementById("dataList");
    dataList.innerHTML = "";
    
    data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.text;
        dataList.appendChild(li);
    });
});
