import React from "react";
import PlaceList from "../../components/PlaceList";

const Places = () => {
  return (
    <div>
      Welcome to the Housing App
      <nav>
        <ul className="flex">
          <li className="mr-6">
            <a className="text-blue-500 hover:text-blue-800" href="/">
              Home
            </a>
          </li>
          <li className="mr-6">
            <a className="text-blue-500 hover:text-blue-800" href="/about">
              About
            </a>
          </li>
        </ul>
      </nav>
      <h1>Places</h1>
      <PlaceList />
    </div>
  );
};

export default Places;
