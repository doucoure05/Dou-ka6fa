import axios from "axios";

export const getClientFidele = async () => {
  const response = await axios.get("http://localhost:5000/clientFidele");

  return response.data;
};

export const getMenuPlusVendu = async () => {
  const response = await axios.get("http://localhost:5000/menuPlusVendu");

  return response.data;
};

export const getVentePeriod = async () => {
  const response = await axios.get("http://localhost:5000/ventePeriod");

  return response.data;
};

export const getMenuVenduPeriodJ = async () => {
  const response = await axios.get("http://localhost:5000/menuVenduPeriodJ");

  return response.data;
};
export const getMenuVenduPeriodM = async () => {
  const response = await axios.get("http://localhost:5000/menuVenduPeriodM");

  return response.data;
};
