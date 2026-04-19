import React, { useState } from "react";
import EventSlice from "./EventSlice";

function EventPage() {
  const defaultEvent = {
    eventName: "Default Name",
    evtImage: "",
    evtDesc: "This is default event description",
    evtUrl: "",
  };
  
  const [searchText, setSearchText] = useState("");
  const [receivedData, setReceivedData] = useState([defaultEvent]);

  const handleSearch = async () => {
    const trimmedSearch = searchText.trim();

    if (!trimmedSearch) {
      setReceivedData([defaultEvent]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/predicthq/events?zipcode=${encodeURIComponent(trimmedSearch)}`
      );
      const data = await response.json();

      const formattedEvents = (data.results || []).map((event) => ({
        eventName: event.title || "Default Name",
        evtImage: "",
        evtDesc:
          event.description ||
          `${event.category || "Tech event"} near ${data.searchedZipcode || trimmedSearch}`,
        evtUrl: event.url || "",
      }));

      setReceivedData(formattedEvents.length > 0 ? formattedEvents : [defaultEvent]);
    } catch (error) {
      console.error("Event search failed:", error);
      setReceivedData([defaultEvent]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      EventPage
      <div className="eventNav">
        <input
          type="text"
          placeholder="Enter Zipcode to Find Tech Events Near You"
          className="searcher"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="searchBtn" onClick={handleSearch}>
          Find Event(s)
        </button>
      </div>
      <div className="defaultEvt">
        {receivedData.map((data, index) => (
          <EventSlice key={`${data.eventName}-${index}`} obj={data} />
        ))}
      </div>
    </>
  );
}

export default EventPage;
