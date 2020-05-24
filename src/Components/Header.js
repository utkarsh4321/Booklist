import React from "react";

const Header = () => {
  const { state } = useContext(BookListContext);

  return (
    <nav>
      <h1>My Booklist on react hooks</h1>
      <p>Currently we have {state.books.length} books </p>
    </nav>
  );
};

export default Header;
