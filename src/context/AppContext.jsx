import { createContext, useReducer, useEffect } from "react";
import { getToken, getDataset, STUDENT_ID, PASSWORD, SET } from "../services/api";
import appReducer from "../reducer/AppReducer";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    activities: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });

        // Get token first
        const tokenResponse = await getToken(STUDENT_ID, PASSWORD, SET);
        const token = tokenResponse.token;
        const dataUrl = tokenResponse.dataUrl;

        // Get dataset using token and the dataUrl from response
        const activities = await getDataset(token, dataUrl);

        dispatch({ type: "SET_ACTIVITIES", payload: activities });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
