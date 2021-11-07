import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Adminpage from "./pages/admin_page";
import ChatsOverviewpage from "./pages/overviews/chats_overview_page";
import ChatDirectpage from "./pages/chat_direct_page";
import Explorepage from "./pages/explore_page";
import Greetingpage from "./pages/greeting_page";
import Loginpage from "./pages/login_page";
import Logoutpage from "./pages/logout_page";
import Registerpage from "./pages/register_page";
import Searchpage from "./pages/search_page";
import Subscribers_overview_page from "./pages/overviews/subscribers_overview_page";
import User_profile_page from "./pages/user_profile_page";
import Subscriptions_overview_page from "./pages/overviews/subscriptions_overview_page";
import FeaturesPage from "./pages/features_page";

export default function useRoutes(isAuthenticated) {
  const homePath = `/user_profile/${localStorage.getItem("userId")}`;
  if (isAuthenticated) {
    return (
      <Router>
        <Switch>
          <Route exact path="/user_profile/:id" component={User_profile_page} />
          <Route exact path="/user_profile/subscribers_overview/:id" component={Subscribers_overview_page} />
          <Route exact path="/user_profile/subscriptions_overview/:id" component={Subscriptions_overview_page} />
          <Route exact path="/search" component={Searchpage} />
          <Route exact path="/adminconsole" component={Adminpage} />
          <Route exact path={homePath} component={User_profile_page} />
          <Route exact path="/chats" component={ChatsOverviewpage} />
          <Route exact path="/chats/direct" component={ChatDirectpage} />
          <Route exact path="/explore" component={Explorepage} />
          <Route exact path="/logout" component={Logoutpage} />
          <Route exact path="/features" component={FeaturesPage} />
          <Redirect to={homePath} />
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Greetingpage} />
        <Route exact path="/login" component={Loginpage} />
        <Route exact path="/register" component={Registerpage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

{
  /* <Router >
            <Switch>
                <Route exact path="/" component = {() => {<div> UnAuth </div>}} />
                <Redirect to = "/"/>
            </Switch>
        </Router> */
}

//         <Router>
//             <Switch>
//                 <Route exact path="/adminconsole" component={Adminpage} />
//                 <Route exact path="/" component={Greetingpage} />
//                 <Route exact path="/login" component={Loginpage} />
//                 <Route exact path="/register" component={Registerpage} />
//                 <Route exact path="/info" component={Infopage} />
//                 <Route exact path="/explore" component={Explorepage} />
//                 <Redirect to="/" />
//             </Switch>
//         </Router>
