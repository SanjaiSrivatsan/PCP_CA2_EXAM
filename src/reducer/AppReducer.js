const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
        loading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "ADD_ITEM":
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };

    case "DELETE_ITEM":
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.activityId !== action.payload
        ),
      };

    case "UPDATE_ITEM":
      return {
        ...state,
        activities: state.activities.map((activity) =>
          activity.activityId === action.payload.activityId
            ? { ...activity, ...action.payload.updates }
            : activity
        ),
      };

    case "TOGGLE_STATUS":
      return {
        ...state,
        activities: state.activities.map((activity) => {
          if (activity.activityId === action.payload) {
            // Auto-set goalAchieved based on steps
            if (activity.steps >= 8000) {
              return {
                ...activity,
                goalAchieved: true,
              };
            }
            // Otherwise toggle the current value
            return {
              ...activity,
              goalAchieved: !activity.goalAchieved,
            };
          }
          return activity;
        }),
      };

    default:
      return state;
  }
};

export default appReducer;
