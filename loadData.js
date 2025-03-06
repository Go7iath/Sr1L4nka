async function loadData() {
  try {
    const response = await fetch("data.json");
    const jsonData = await response.json();

    // Get the page filename without extension (e.g., "udawalawe" from "udawalawe.html")
    const locationKey = window.location.pathname.split("/").pop().replace(".html", "");
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
      // Debug: log the accommodation object
      console.log("Accommodation:", accommodation);
      
      // Check if the properties are of type string
      if (typeof accommodation.name !== "string" || typeof accommodation.link !== "string") {
        console.error("Invalid accommodation format:", accommodation);
        return;
      }
      
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = accommodation.name;
      a.href = accommodation.link;
      a.target = "_blank"; // Open in a new tab
      a.rel = "noopener noreferrer";
      li.appendChild(a);
      accommodationsList.appendChild(li);
    });
  } catch (error) {
    console.error("Fehler beim Laden der Daten:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadData);
