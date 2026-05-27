import React, { useMemo, useState } from "react";
import Namespace from "./Namespace";
import itGlossary from "../dataDump/itTerms";

function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const glossaryTerms = useMemo(
    () =>
      itGlossary
        .filter((item) => item.term && item.definition)
        .sort((firstItem, secondItem) =>
          firstItem.term.localeCompare(secondItem.term)
        ),
    []
  );

  const predictedTopic = useMemo(() => {
    const searchValue = searchTerm.trim().toLowerCase();

    if (!searchValue) {
      return null;
    }

    return (
      glossaryTerms.find((item) =>
        item.term.toLowerCase().startsWith(searchValue)
      ) ||
      glossaryTerms.find((item) =>
        item.term.toLowerCase().includes(searchValue)
      ) ||
      null
    );
  }, [glossaryTerms, searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();

    const searchValue = searchTerm.trim().toLowerCase();
    const matchedTerm =
      glossaryTerms.find((item) => item.term.toLowerCase() === searchValue) ||
      predictedTopic;

    setSelectedTopic(matchedTerm || null);
    if (matchedTerm) {
      setSearchTerm(matchedTerm.term);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (
      (event.key === "Tab" || event.key === "ArrowRight") &&
      predictedTopic &&
      predictedTopic.term.toLowerCase() !== searchTerm.trim().toLowerCase()
    ) {
      event.preventDefault();
      setSearchTerm(predictedTopic.term);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedTopic(null);
  };

  const predictionRemainder =
    predictedTopic &&
    predictedTopic.term.toLowerCase().startsWith(searchTerm.toLowerCase())
      ? predictedTopic.term.slice(searchTerm.length)
      : "";

  return (
    <>
      <div className="leaderContainer">
        <div className="leaderNav">
          <Namespace />
          <form className="jvlCrawler" onSubmit={handleSearch}>
            <button type="submit" className="jvlSearchButton" aria-label="Search glossary">
              <img
                src="/images/jclLogoMajor.png"
                alt=""
                className="jvlSrch"
              />
            </button>

            <div className="predictiveSearch">
              <div className="predictionText" aria-hidden="true">
                <span className="predictionTyped">{searchTerm}</span>
                <span>{predictionRemainder}</span>
              </div>
              <input
                type="text"
                placeholder="Search Tech Terms"
                className="searchEngine"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                autoComplete="off"
              />
            </div>
          </form>
          <div className="topicNameShadow">
            {selectedTopic ? (
              <>
                <h3 className="topicTerm">{selectedTopic.term}</h3>
                <p className="topicDefinition">{selectedTopic.definition}</p>
              </>
            ) : searchTerm.trim() ? (
              <p className="topicDefinition">Keep typing, then tap the logo to search.</p>
            ) : null}
          </div>
        </div>
        <div className="leaderStats">
          <div className="quadShow"></div>
          <div className="quadShow"></div>

          <div className="quadShow"></div>
          <div className="quadShow"></div>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
