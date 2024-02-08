import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  return (
    <div className="h-100vh">
      <h1 className="text-2xl font-extrabold underline">Home Page</h1>

      <section className="h-40 w-60 mx-auto my-20 rounded-xl
      bg-gray-900 flex justify-center flex-col items-center ">

     <h2 className="text-white text-2xl ">Welcome to Twitter</h2>
       <h3 className="text-fuchsia-300 text-xl">Register or Login</h3>


      </section>
    </div>
  );
}

export default Home;
