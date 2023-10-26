import React, { useEffect, useState } from "react";
import JobPost from "./JobPost";

const JobBoard = () => {
  const [allJobIds, setAllJobIds] = useState([]);
  const [jobPosts, setJobPosts] = useState([{"by": "jamilbk", "id": 35908337, "score": 1, "time": 1683838872, "title": "Firezone (YC W22) is hiring Elixir and Rust engineers", "type": "job", "url": "https://www.ycombinator.com/companies/firezone/jobs" }
]);

  useEffect(() => {
    const fetchAllJobIds = async () => {
      try {
        const response = await fetch(
          "https://hacker-news.firebaseio.com/v0/jobstories.json"
        );
        const data = await response.json();
        setAllJobIds(data);
      } catch (error) {
        console.error(error);
      }
    };

    
    const fetchJobPosts = async () => {
      try {
        const response = await fetch(
          "https://api.example.com/jobposts" 
        );
        const data = await response.json();
        setJobPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllJobIds();
    fetchJobPosts();
  }, []);

  return (
    <div className="my-8 py-4 w-full">
      <div className="px-8 flex flex-col items-center justify-between space-y-4">
        {jobPosts.map((job) => (
          <JobPost key={job.id} data={job} />
        ))}
      </div>

      <div className="flex items-center justify-center my-4">
        <button className="px-6 py-3 bg-white text-black hover:bg-black hover:text-white font-semibold rounded transition duration-300 ease-in-out transform hover:scale-105">
          Load More Jobs
        </button>
      </div>
    </div>
  );
};

export default JobBoard;
