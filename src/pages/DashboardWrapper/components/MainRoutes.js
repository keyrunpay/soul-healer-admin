import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../../Home/Home";
import Statistics from "../../Statistics/Statistics";
import UserManagement from "../../UserManagement/UserManagement";
import ListingManagement from "../../ListingManagement/ListingManagement";
import Settings from "../../Settings/Settings";
import Volunteer from "../../Volunteer/Volunteer";
import Chatbot from "../../Chatbot/Chatbot";

export default function MainRoutes() {
  return (
    <div className="main__routes">
      <br />
      <div className="wrap">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/statistics" exact component={Statistics} />
          <Route path="/volunteer" exact component={Volunteer} />
          <Route path="/bot" exact component={Chatbot} />
        </Switch>
      </div>
      <br />
    </div>
  );
}
