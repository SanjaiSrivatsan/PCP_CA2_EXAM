import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  isValidActivity,
  getActivityName,
  getActivityDate,
} from "../utils/validation";

export function ActivityDetail() {
  const { id } = useParams();
  const { state, dispatch } = useContext(AppContext);

  const activity = state.activities.find(
    (a) => String(a.activityId) === String(id)
  );

  if (!activity) {
    return <div>Activity not found</div>;
  }

  if (!isValidActivity(activity)) {
    return <div>Invalid activity data</div>;
  }

  const handleToggleGoal = () => {
    dispatch({
      type: "TOGGLE_STATUS",
      payload: activity.activityId,
    });
  };

  // Calculate efficiency score dynamically
  const efficiencyScore =
    activity.workoutMinutes > 0
      ? (activity.caloriesBurned / activity.workoutMinutes).toFixed(2)
      : "N/A";

  return (
    <div>
      <h1>Activity Details</h1>
      <h2>{getActivityName(activity)}</h2>
      <p>
        <strong>Activity ID:</strong> {activity.activityId}
      </p>
      <p>
        <strong>Steps:</strong> {activity.steps}
      </p>
      <p>
        <strong>Calories Burned:</strong> {activity.caloriesBurned}
      </p>
      <p>
        <strong>Workout Minutes:</strong> {activity.workoutMinutes}
      </p>
      <p>
        <strong>Goal Achieved:</strong> {activity.goalAchieved ? "Yes" : "No"}
      </p>
      <p>
        <strong>Date:</strong> {getActivityDate(activity)}
      </p>
      <p>
        <strong>Efficiency Score:</strong> {efficiencyScore}
      </p>
      <Link to="/activities">Back to Activities</Link>
      <button onClick={handleToggleGoal}>Toggle Goal</button>
    </div>
  );
}
