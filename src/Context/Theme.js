import React, { createContext, Component } from "react";

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  state = {
    isLight: false,
    light: { bg: "#555", tc: "#fff", ui: "#ccc" },
    dark: { bg: "#000", tc: "#fff", ui: "#f4f4f4" },
    name: "utkarsh srivastava",
    hobby: "coding",
  };
  themeToggler = () => {
    this.setState({ isLight: !this.state.isLight });
  };
  render() {
    return (
      <ThemeContext.Provider
        value={{ ...this.state, themeToggler: this.themeToggler }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContextProvider;
