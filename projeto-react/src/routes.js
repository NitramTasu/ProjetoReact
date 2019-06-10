import React from "react";
import { Switch, Route } from "react-router-dom";

import Search from "./pages/Search";
import Products from "./pages/Products";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Search} />

    <Route path="/product/:id" component={Products} />

    <Route
      component={() => <div style="height: 10000px;">dPage not found</div>}
    />
  </Switch>
);

export default Routes;
