import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import JobPost from "./JobPost";

const JobBoard = () => {
  const [allJobIds, setAllJobIds] = useState([]);
  const [startingIndex, setStartingIndex] = useState(0);
  const [endingIndex, setEndingIndex] = useState(6);
  const [buttonHide, setButtonHide] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllJobIds = async () => {
      try {
        const response = await fetch(
          "https://hacker-news.firebaseio.com/v0/jobstories.json"
        );
        if (response.ok) {
          const data = await response.json();
          setAllJobIds(data);
          setLoading(false);
        } else {
          setLoading(false);
          console.error("Error fetching job IDs:", response.statusText);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching job IDs:", error);
      }
    };

    fetchAllJobIds();
  }, []);

  const loadMoreJobs = () => {
    setStartingIndex(endingIndex);
    setEndingIndex((prev) => prev + 6);
    if (endingIndex + 6 >= allJobIds.length) {
      setButtonHide(true);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  console.log(startingIndex, endingIndex);
  console.log(allJobIds.length);

  return (
    <div>
    <div className="my-8 py-4 w-full">
      {loading ? (
        <div className="w-full h-[600px] flex items-center justify-center">
          <MoonLoader color="#ff6602" size={60} />
        </div>
      ) : (
        <div className="px-8 flex flex-col items-center justify-between space-y-4">
          {allJobIds.slice(startingIndex, endingIndex).map((jobID) => (
            <JobPost key={jobID} jobID={jobID} />
          ))}
        </div>
      )}

      {!buttonHide && (
        <div className="relative bottom-0 left-0 w-full flex items-center justify-center my-4">
          <button
            className="px-6 py-3 bg-primary text-white hover:bg-black hover:text-white font-semibold rounded transition duration-300 ease-in-out transform hover:scale-105"
            onClick={loadMoreJobs}
          >
            Load More Jobs
          </button>
        </div>
      )}
    </div>
  </div>
  );
};

export default JobBoard;
