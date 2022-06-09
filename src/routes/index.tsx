import { Route, Routes as Switch } from "react-router-dom";
import { Home } from "../pages/Home";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
    </Switch>
  );
};
