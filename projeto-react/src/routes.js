import React from "react";
import { Switch, Route } from "react-router-dom";

import Search from "./pages/Search";
import Products from "./pages/Products";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Search} />

    <Route exact path="/ProjetoReact" component={Search} />

    <Route path="/product/:id" component={Products} />

<<<<<<< HEAD
    <Route component={() => <div>Page not found</div>} />
=======
    <Route
      component={() => <div style="height: 10000px;">dPage not found</div>}
    />
>>>>>>> 21ea89c9c045a77f9df13e39c8fda3f1542af861
  </Switch>
);

export default Routes;
