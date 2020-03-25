import React, { useState } from "react";
import { Image, useWebId, Value, LoggedIn, LoggedOut } from "@solid/react";
import "./MyProfile.css";
import { BsBoxArrowUpRight } from "react-icons/bs";
import FriendList from "./FriendList.js";
import { connect } from "react-redux";
import { Button, Badge } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { showProfile } from "../../../store/actions/tests/UserActions";

export function MyProfile() {
  const [theEmail, setTheEmail] = useState("");

  const setAllStates = async () => {
    setTheEmail(showProfile());
  };

  setAllStates();

  return (
    <div id="generalComponent">
      <LoggedIn>
        <div id="card">
          <div id="image-cropper">
            <Image
              src="user.vcard_hasPhoto"
              defaultSrc="profile.svg"
              id="profilePicture"
            />
          </div>

          <div id="allData">
            <div id="profileData">
              <h1>
                Hello,{" "}
                <b>
                  <Value src="user.name" />
                </b>
              </h1>
              <p> {theEmail} </p>
              <p>
                <Badge variant="dark">
                  <Value src="user.vcard_role" />
                  CEO
                </Badge>
              </p>

              <a href={useWebId()}>
                Solid profile <BsBoxArrowUpRight></BsBoxArrowUpRight>
              </a>
            </div>
            <div id="profileData">
              <Button variant="primary">
                Routes <Badge variant="light">4</Badge>
              </Button>
              <Button variant="primary">
                Shared routes <Badge variant="light">2</Badge>
              </Button>
            </div>
          </div>
          <FriendList id="friendList" />
        </div>
      </LoggedIn>
      <LoggedOut>
        <Redirect to="/"></Redirect>
      </LoggedOut>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ...state,
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(showProfile())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
