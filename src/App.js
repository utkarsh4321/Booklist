import React from "react";
import Navbar from "./Components/Navbar";
import Booklist from "./Components/Booklist";
import BookListContextProvide from "./Context/BookList";
import ToogleButton from "./Components/ToogleButton";

function App() {
  return (
    <div className="App">
      <BookListContextProvide>
        <Navbar />
        <ToogleButton />
        <Booklist />
      </BookListContextProvide>
    </div>
  );
}

export default App;
