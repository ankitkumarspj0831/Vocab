import React, { Component } from "react";

class Add extends Component {
  state = {
    word: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alert("A word was added.");
    fetch("http://localhost:8080/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((result) => result.json())
      .then((info) => console.log(info))
      .catch((err) => console.log("Sending word to backend failed."));
  };

  render() {
    return (
      <div>
        <h1>Add Word</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" onChange={this.handleChange} />
          <br></br>
          <br></br>
          <input type="submit" value="Add word" />
        </form>
      </div>
    );
  }
}

export default Add;
