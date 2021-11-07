import useGuesting from "./guesting-hook";
export default function useRouting() {
  function goTo_subscribers_overview(isHome) {
    if (isHome) {
      return (window.location.href =
        "/user_profile/subscribers_overview/" + localStorage.getItem("userId"));
    }
    window.location.href =
      "/user_profile/subscribers_overview/" +
      sessionStorage.getItem("VisitedUser_id");
  }
  function goTo_subscriptions_overview(isHome) {
    if (isHome) {
      return (window.location.href =
        "/user_profile/subscriptions_overview/" +
        localStorage.getItem("userId"));
    }
    window.location.href =
      "/user_profile/subscriptions_overview/" +
      sessionStorage.getItem("VisitedUser_id");
  }
  return { goTo_subscribers_overview, goTo_subscriptions_overview };
}
