import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import SingleWord from "../Containers/SingleWord/SingleWord";

class home extends Component {
  state = {
    message: null,
    words: [],
    searchItem: "",
    searching: false,
  };
  callBackend() {
    fetch("http://localhost:8080")
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        this.setState({ message: result.message, words: result.words });
        console.log("Fetched successfully.");
      })
      .catch((err) => {
        console.log("Fetching Failed.");
      });
  }
  componentDidMount() {
    this.callBackend();
  }
  render() {
    return (
      <div style={{ backgroundColor: "#4f0d52" }}>
        <input
          style={{ borderRadius: "5px", width: "20%", height: "30px" }}
          type="text"
          name="search"
          placeholder="Search..."
          onChange={(event) => {
            this.setState({ searchItem: event.target.value, searching: true });
          }}
        />
        <Container style={{ backgroundColor: "#4f0d52" }}>
          <Typography
            component="div"
            style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
          >
            {this.state.message}
            {this.state.words
              .filter((val) => {
                if (val === "") {
                  return val;
                } else if (
                  val.id
                    .toLowerCase()
                    .includes(this.state.searchItem.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val, key) => {
                return (
                  <div key={key}>
                    <SingleWord wordId={val.id} definition={val.definition} phrases={val.phrases} />
                  </div>
                );
              })}
          </Typography>
        </Container>
      </div>
    );
  }
}

export default home;
