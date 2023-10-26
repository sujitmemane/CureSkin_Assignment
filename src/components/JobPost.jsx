import React from 'react';

const JobPost = ({ data }) => {
  const timestamp = data.time * 1000;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();

  return (
    <a href={data.url} target='_blank' className="w-full">
      <div className="py-4 px-4 w-full bg-white text-black border-white rounded flex flex-col items-start transition duration-300 transform hover:scale-105 shadow-md cursor-pointer">
        <h1 className="font-bold text-xl mb-2">{data.title}</h1>
        <div className="text-sm text-gray-600">
          <span className="mr-2">By {data.by}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </a>
  );
};

export default JobPost;
