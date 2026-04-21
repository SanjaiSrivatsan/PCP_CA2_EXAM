import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

const STUDENT_ID = "E0323002";
const PASSWORD = "324477";
const SET = "setB";

const getToken = async (studentId, password, set) => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId,
    password,
    set,
  });

  return data;
};

const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data.activities;
};

export { getToken, getDataset, STUDENT_ID, PASSWORD, SET };
