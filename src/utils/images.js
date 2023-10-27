import { ENDPOINT } from "../constants";

export const getImage = ({ _id, name }) => {
  return `${ENDPOINT}upload/${_id}.${name.split(".")[1]}`;
};
