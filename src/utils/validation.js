export function isValidActivity(activity) {
  return (
    activity &&
    typeof activity === "object" &&
    activity.steps > 0 &&
    activity.caloriesBurned > 0 &&
    activity.workoutMinutes > 0 &&
    typeof activity.goalAchieved === "boolean"
  );
}

export function getActivityName(activity) {
  return activity?.name || "unknown";
}

export function getActivityDate(activity) {
  return activity?.date || "No date";
}
