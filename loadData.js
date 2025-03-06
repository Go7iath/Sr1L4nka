async function loadData() {
  try {
    const response = await fetch("data.json");
    const jsonData = await response.json();

    // Get the page filename without extension (e.g., "udawalawe" from "udawalawe.html")
    const locationKey = window.location.pathname.split("/").pop().replace(".html", "");

    // Find data for this location
    const locationData = jsonData.locations[locationKey];

    if (!locationData) {
      console.error("Location not found in data.json");
      return;
    }

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

    // Render Accommodations with Links
    const accommodationsList = document.getElementById("accommodations-list");
    accommodationsList.innerHTML = "";
    locationData.accommodations.forEach(accommodation => {
      if (typeof accommodation === "object" && accommodation.name && accommodation.link) {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = accommodation.name;
        link.href = accommodation.link;
        link.target = "_blank"; // Open in new tab
        link.rel = "noopener noreferrer"; // Security best practice
        li.appendChild(link);
        accommodationsList.appendChild(li);
      } else {
        console.error("Invalid accommodation format:", accommodation);
      }
    });

  } catch (error) {
    console.error("Fehler beim Laden der Daten:", error);
  }
}

// Load data when the page loads
document.addEventListener("DOMContentLoaded", loadData);
