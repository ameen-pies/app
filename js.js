const API_URL = "https://funcv-evaadtgwekctbkha.eastus-01.azurewebsites.net/api/CosmosApi";

// Function to send data to Cosmos DB
document.getElementById("dataForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputData = document.getElementById("dataInput").value.trim();

    if (!inputData) {
        alert("Please enter some data.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: inputData }) // ID is now set server-side
        });

        if (!response.ok) throw new Error(`Server responded with ${response.status}`);

        alert("Data saved successfully!");
        document.getElementById("dataInput").value = "";
    } catch (error) {
        alert("Failed to save data: " + error.message);
    }
});

// Function to fetch data from Cosmos DB
document.getElementById("fetchData").addEventListener("click", async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Server responded with ${response.status}`);

        const data = await response.json();
        const dataList = document.getElementById("dataList");
        dataList.innerHTML = "";

        data.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.text;
            dataList.appendChild(li);
        });
    } catch (error) {
        alert("Failed to fetch data: " + error.message);
    }
});
