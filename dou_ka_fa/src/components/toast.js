import Toast from "react-bootstrap/Toast";
import React, { Component } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";

export default class CustomToast extends Component {
  //   const [position, setPosition] = useState('top-start');
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }
  toggleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return null;
  }
}
