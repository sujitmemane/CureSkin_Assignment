import React, { useEffect, useState } from 'react';

const JobPost = ({ jobID }) => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jobID}.json`);
        if (response.ok) {
          const jobDetails = await response.json();
          setJob(jobDetails);
        } else {
          console.error('Error fetching job details:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error processing job details:', error);
      }
    };

    fetchJobDetail(); 
  }, [jobID]);

  if (!job) {
   
    return null;
  }

  const timestamp = job.time * 1000;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();

  return (
    <a href={job.url} target='_blank' className="w-full">
      <div className="py-4 px-4 w-full bg-white text-black border-white rounded flex flex-col items-start transition duration-300 transform hover:scale-105 shadow-md cursor-pointer">
        <h1 className="font-bold text-xl mb-2">{job.title}</h1>
        <div className="text-sm text-gray-600">
          <span className="mr-2">By {job.by}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </a>
  );
};

export default JobPost;
