export function isEmpty(value) {
  if (!value) {
    return true;
  } else if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  } else {
    return false;
  }
}
