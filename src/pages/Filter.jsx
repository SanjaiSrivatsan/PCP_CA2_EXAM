import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ActivityItem } from "../components/ActivityItem";
import { isValidActivity } from "../utils/validation";

export function Filter() {
  const { state } = useContext(AppContext);
  const [stepsInput, setStepsInput] = useState("");
  const [error, setError] = useState("");

  const handleFilter = () => {
    setError("");

    if (stepsInput.trim() === "") {
      setError("Please enter a value");
      return;
    }

    const stepsValue = parseInt(stepsInput, 10);
    if (isNaN(stepsValue) || stepsValue < 0) {
      setError("Please enter a valid number");
      return;
    }
  };

  let filteredActivities = [];
  if (stepsInput.trim() !== "") {
    const stepsValue = parseInt(stepsInput, 10);
    if (!isNaN(stepsValue)) {
      filteredActivities = state.activities.filter(
        (activity) => isValidActivity(activity) && activity.steps >= stepsValue,
      );
    }
  }

  return (
    <div>
      <h1>Filter Activities</h1>
      <div>
        <label>
          Filter by Steps ({">"}= value):
          <input
            type="number"
            data-testid="filter-input"
            value={stepsInput}
            onChange={(e) => {
              setStepsInput(e.target.value);
              setError("");
            }}
            placeholder="Enter minimum steps"
          />
        </label>
        <button onClick={handleFilter}>Filter</button>
      </div>

      {error && <p>{error}</p>}

      {stepsInput.trim() !== "" && !error && (
        <div>
          {filteredActivities.length === 0 ? (
            <p>No activities found matching your criteria.</p>
          ) : (
            <div>
              <p>Found {filteredActivities.length} activities</p>
              {filteredActivities.map((activity) => (
                <ActivityItem key={activity.activityId} activity={activity} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
