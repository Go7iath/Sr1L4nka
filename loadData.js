async function loadData() {
  try {
    console.log("Fetching data.json...");

    const response = await fetch("data.json");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const jsonData = await response.json();
    console.log("Fetched data:", jsonData);

    // Get the page filename without extension (e.g., "udawalawe" from "udawalawe.html")
    const locationKey = window.location.pathname.split("/").pop().replace(".html", "");
    console.log("Current location key:", locationKey);

    // Find data for this location
    const locationData = jsonData.locations[locationKey];

    if (!locationData) {
      console.error("Location not found in data.json");
      return;
    }

    console.log("Location data found:", locationData);

    // Update Page Title
    document.title = locationData.title + " – Aktivitäten & To‑Do";
    document.querySelector("h1").textContent = locationData.title;

    // Render Activities
    const activitiesList = document.getElementById("activities-list");
    activitiesList.innerHTML = "";
    locationData.activities.forEach(activity => {
      const li = document.createElement("li");
      li.textContent = activity;
      activitiesList.appendChild(li);
    });

    // Render Accommodations with Clickable Links
    const accommodationsList = document.getElementById("accommodations-list");
    accommodationsList.innerHTML = "";

    locationData.accommodations.forEach(accommodation => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = accommodation.name;
      link.href = accommodation.link;
      link.target = "_blank"; // Open in new tab
      link.rel = "noopener noreferrer"; // Security best practice
      li.appendChild(link);
      accommodationsList.appendChild(li);
    });

    console.log("Rendering complete!");

  } catch (error) {
    console.error("Fehler beim Laden der Daten:", error);
  }
}

// Load data when the page loads
document.addEventListener("DOMContentLoaded", loadData);
