import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ActivityItem } from "../components/ActivityItem";
import { isValidActivity } from "../utils/validation";

export function Activities() {
  const { state } = useContext(AppContext);

  const validActivities = state.activities.filter(isValidActivity);

  return (
    <div>
      <h1>Activities</h1>
      {validActivities.length === 0 ? (
        <p>No valid activities found.</p>
      ) : (
        <div>
          {validActivities.map((activity) => (
            <ActivityItem key={activity.activityId} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}
