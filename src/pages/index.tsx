import React from "react";
import PlaceList from "../components/PlaceList";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-blue-500">Welcome to the Housing App</h1>
      <nav>
        <ul className="flex">
          <li className="mr-6">
            <a className="text-blue-500 hover:text-blue-800" href="/places">
              Places
            </a>
          </li>
          <li className="mr-6">
            <a className="text-blue-500 hover:text-blue-800" href="/about">
              About
            </a>
          </li>
        </ul>
      </nav>
      <PlaceList />
    </div>
  );
};

export default Home;
