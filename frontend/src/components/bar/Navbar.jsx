import React from "react";

const Navbar = props => {
  return (
    <header>
      <button onClick={props.onClick}>Click Me!</button>
    </header>
  );
};
export default Navbar;
