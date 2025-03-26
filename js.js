const API_URL = "https://funcv-evaadtgwekctbkha.eastus-01.azurewebsites.net/api/CosmosApi";

// ✅ Ensure correct request format for saving data
document.getElementById("dataForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputData = document.getElementById("dataInput").value;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Date.now().toString(), text: inputData }) // ✅ Ensure correct format
    });

    if (response.ok) {
        alert("Data saved successfully!");
        document.getElementById("dataInput").value = "";
    } else {
        const errorText = await response.text();
        alert(`Failed to save data. Error: ${errorText}`);
    }
});

// ✅ Ensure GET request works properly
document.getElementById("fetchData").addEventListener("click", async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const dataList = document.getElementById("dataList");
        dataList.innerHTML = "";
        
        data.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.text;
            dataList.appendChild(li);
        });
    } catch (error) {
        alert("Error fetching data: " + error.message);
    }
});
