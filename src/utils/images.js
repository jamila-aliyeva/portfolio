import { ENDPOINT } from "../constants";

export const getImage = ({ _id, name }) => {
  return `${ENDPOINT}upload/${_id}.${name.split(".")[1]}`;
};

export const getUserImage = (id) => {
  return `https://ap-portfolio-backend.up.railway.app/upload/${id}
`;
};
