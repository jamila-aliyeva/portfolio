import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import authReducer, { authName } from "../slice/auth";
import skillReducer, { skillName } from "../slice/skils";
import educationReducer, { educationName } from "../slice/education";
import portfolioQuery, {
  portfolioName,
  portfolioReducer,
} from "../queries/portfolio";
import experienceQuery, {
  experienceName,
  experienceReducer,
} from "../queries/experience";

const reducer = {
  [authName]: authReducer,
  [skillName]: skillReducer,
  [educationName]: educationReducer,
  [portfolioName]: portfolioReducer,
  [experienceName]: experienceReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      portfolioQuery.middleware,
      experienceQuery.middleware
    ),
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;