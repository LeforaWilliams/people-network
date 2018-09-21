import React from "react";
import { connect } from "react-redux";
import Chat from "./chat.js";
import { Link } from "react-router-dom";

class Online extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { online } = this.props;

    if (!online) {
      return null;
    }

    return (
      <div className="online-wrap ">
        <h1>Online</h1>
        <div className="friends-wrap flex-container">
          {online.map(user => {
            return (
              <div key={user.id} className="online-user-unit">
                <Link to={`/user/${user.id}`}>
                  <img src={user.imageurl} />
                </Link>
                <p>
                  {user.name} {user.surname}
                </p>
              </div>
            );
          })}
        </div>
        <Chat />
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    online: reduxState.online_users
  };
}

export default connect(mapStateToProps)(Online);
