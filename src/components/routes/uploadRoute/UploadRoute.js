import React from "react";
import "./UploadRoute.css";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { uploadRoute } from "./../../../store/actions/RouteActions";
import UploadButton from "./uploadButton/UploadButton";
import ViadeModal from "../../layout/modal/Modal";

class UploadRoute extends React.Component {
  state = {
    name: "",
    description: "",
    author: "",
    positions: "",
    file: "",
    images: [],
    videos: [],
    reset: false
  };

  changeHandlerRoute = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  changeHandlerImages = e => {
    let docs = [];
    Array.from(e.target.files).forEach(file => docs.push(file.name));
    this.setState({ ...this.state, images: docs });
  };

  changeHandlerVideos = e => {
    let docs = [];
    Array.from(e.target.files).forEach(file => docs.push(file.name));
    this.setState({ ...this.state, videos: docs });
  };

  resetState() {
    return {
      name: "",
      description: "",
      positions: "",
      file: "",
      author: "",
      images: [],
      videos: [],
      reset: false
    };
  }

  isEmpty = () => {
    return (
      this.state.name === "" &&
      this.state.description === "" &&
      this.state.positions === ""
    );
  };

  componentDidUpdate() {
    if (this.state.reset) this.setState(this.resetState());
  }

  submitForm = e => {
    e.preventDefault();
    this.props.uploadRoute(this.state);
    this.setState(this.resetState());
  };

  render() {
    return (
      <div className="uploadContainer">
        <Form>
          <div id="form-info">
            <Form.Group htmlFor="routeName">
              <Form.Label htmlFor="name">Name of the route</Form.Label>
              <Form.Control
                id="name"
                onChange={this.changeHandlerRoute}
                placeholder="Route name"
                value={this.state.name}
                type="text"
              />
            </Form.Group>

            <Form.Group htmlFor="routeDescription">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                id="description"
                onChange={this.changeHandlerRoute}
                value={this.state.description}
                as="textarea"
                rows="4"
                placeholder="Description..."
              />
            </Form.Group>

            <Form.Group htmlFor="routePositions">
              <Form.Label htmlFor="positions">Positions</Form.Label>
              <Form.Control
                id="positions"
                onChange={this.changeHandlerRoute}
                value={this.state.positions}
                as="textarea"
                rows="4"
                placeholder="Positions, as of now in javascript array[n,2] format, example:
                                    [[10.148, -5.148], [11.134, 4.0459]]"
              />
            </Form.Group>

            <ViadeModal
              disabled={this.isEmpty()}
              toggleText="Submit"
              onClick={this.submitForm}
              title="Submitted"
              closeText="Close"
            >
              <p>Your route has been submited</p>
            </ViadeModal>
          </div>

          <div id="buttonHolder">
            <UploadButton
              reset={this.state.reset}
              onChange={this.changeHandlerRoute}
              id="file"
              text="Choose a route"
            ></UploadButton>

            <UploadButton
              reset={this.state.reset}
              onChange={this.changeHandlerImages}
              id="images"
              text="Pick some images"
              multiple
            ></UploadButton>

            <UploadButton
              reset={this.state.reset}
              onChange={this.changeHandlerVideos}
              id="videos"
              multiple
              text="Choose a video"
            ></UploadButton>
          </div>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadRoute: route => dispatch(uploadRoute(route))
  };
};

export default connect(null, mapDispatchToProps)(UploadRoute);
