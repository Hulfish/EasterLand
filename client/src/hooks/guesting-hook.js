export default function useGuesting() {
  function setVisiting(VisitedUser_id) {
    sessionStorage.setItem("VisitedUser_id", VisitedUser_id);
  }
  function clearVisiting() {}
  function getVisited() {
    return sessionStorage.getItem("VisitedUser_id");
  }
  function visitOne (VisitedUser_id) {
    setVisiting(VisitedUser_id)
    window.location.href = "/user_profile/" +VisitedUser_id
  }

  return { setVisiting, clearVisiting, getVisited, visitOne };
}
