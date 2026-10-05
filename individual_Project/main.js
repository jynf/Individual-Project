const searchType = document.getElementById("searchTypeSelection")
const searchBar = document.getElementById("searchInput")
const eventCardDiv = document.getElementById("eventCardDiv")

let eventArray = [];

searchType.addEventListener("change", updateSearchBar)

searchBar.addEventListener("input", searchEventList)

function displaySearch(filterInfo, filterType) {
    eventCardDiv.innerHTML = "";

    eventArray.forEach(event => {
        const card = document.createElement("div");
        if (filterType == "date") {
            if (filterInfo != event.date)
                return
        }
        else if (filterType == "location") {
            if (!event.location.toLowerCase().trim().includes(filterInfo))
                return
        }
        else if (filterType == "contestants") {
            if (!event.contestant1.toLowerCase().trim().includes(filterInfo) && !event.contestant2.toLowerCase().trim().includes(filterInfo))
                return
        }
        card.classList.add("eventCard");

        card.innerHTML = `
                <h3 class="contestantText">${event.contestant1} vs ${event.contestant2}</h3>
                <p class="locationText">Location: ${event.location}</p>
                <p class="dateText">Date: ${new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                 })}</p>                
        <p class="timeText">Time: ${event.time}</p>
            `;
        eventCardDiv.appendChild(card);
    });
    if (eventCardDiv.innerHTML == "") {
        eventCardDiv.innerHTML = "<p>No events matching search...</p>";
    }
}

function displayAllEvents() {
    eventCardDiv.innerHTML = "";

    eventArray.forEach(event => {
        const card = document.createElement("div");
        card.classList.add("eventCard");

        card.innerHTML = `
              <h3 class="contestantText">${event.contestant1} vs ${event.contestant2}</h3>
                <p class="locationText">Location: ${event.location}</p>
                <p class="dateText">Date: ${new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                 })}</p>      
        <p class="timeText">Time: ${event.time}</p>

            `;
        eventCardDiv.appendChild(card);
    });

}

async function loadEventListJson() {
    try {
        const response = await fetch('eventList.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        eventArray = await response.json();
        displayAllEvents();

    } catch (error) {
        console.error("try block error:", error);
        eventCardDiv.innerHTML = `<p>Failed to load events.</p>`;
    }
}


function searchEventList() {
    const inputString = searchBar.value.toLowerCase().trim();
    displaySearch(inputString, searchType.value)
}

function updateSearchBar() {
    if (searchType.value == "date") {
        searchBar.type = "date";
    }
    else {
        searchBar.type = "search";
    }
}

loadEventListJson()
