import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { isValidActivity } from "../utils/validation";

export function Stats() {
  const { state } = useContext(AppContext);

  // Compute all dynamic values using map, filter, reduce
  const validActivities = state.activities.filter(isValidActivity);

  // Total valid activities
  const totalActivities = validActivities.length;

  // Count goal achieved using reduce
  const goalAchievedCount = validActivities.reduce((count, activity) => {
    return typeof activity.goalAchieved === "boolean" && activity.goalAchieved
      ? count + 1
      : count;
  }, 0);

  // Count goal not achieved using reduce
  const goalNotAchievedCount = validActivities.reduce((count, activity) => {
    return typeof activity.goalAchieved === "boolean" && !activity.goalAchieved
      ? count + 1
      : count;
  }, 0);

  // Expose window.appState only on this page
  useEffect(() => {
    window.appState = {
      totalActivities,
      goalAchievedCount,
      goalNotAchievedCount,
    };

    return () => {
      delete window.appState;
    };
  }, [totalActivities, goalAchievedCount, goalNotAchievedCount]);

  return (
    <div>
      <h1>Fitness Analytics Dashboard</h1>

      <div>
        <h2>Summary Statistics</h2>
        <div data-testid="total-activities">
          <strong>Total Valid Activities:</strong> {totalActivities}
        </div>
        <div data-testid="goal-achieved">
          <strong>Goal Achieved Count:</strong> {goalAchievedCount}
        </div>
        <div data-testid="goal-not-achieved">
          <strong>Goal Not Achieved Count:</strong> {goalNotAchievedCount}
        </div>
      </div>
    </div>
  );
}
