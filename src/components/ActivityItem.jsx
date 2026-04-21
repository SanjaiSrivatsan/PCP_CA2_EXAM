import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { getActivityName, getActivityDate } from "../utils/validation";

export function ActivityItem({ activity }) {
  const { dispatch } = useContext(AppContext);

  const handleToggleGoal = () => {
    dispatch({
      type: "TOGGLE_STATUS",
      payload: activity.activityId,
    });
  };

  return (
    <div data-testid="activity-item">
      <h3>{getActivityName(activity)}</h3>
      <p>ID: {activity.activityId}</p>
      <p>Steps: {activity.steps}</p>
      <p>Calories Burned: {activity.caloriesBurned}</p>
      <p>Workout Minutes: {activity.workoutMinutes}</p>
      <p>Goal Achieved: {activity.goalAchieved ? "Yes" : "No"}</p>
      <p>Date: {getActivityDate(activity)}</p>
      <Link to={`/activities/${activity.activityId}`}>View Details</Link>
      <button onClick={handleToggleGoal}>Toggle Goal</button>
    </div>
  );
}
