import { useEffect, useState } from "react";
import Lorem from "../components/lorem";
import Admin_userCard from "../components/admin_user-card";
import $api from "../http/http-axios";

export default function Adminpage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState(null);

  async function refreshList() {
    try {
      const res = await $api.get("/api/check_is_Admin");
      const isAdmin = res.data.isAdmin;
      if (isAdmin) {
        setIsAdmin(true);
        setIsLoading(false);
        // console.log("Hello admin!");
      }
      const usersResponse = await $api.get("/api/getusers");
      setUsers(usersResponse.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(async () => {
    try {
      const res = await $api.get("/api/check_is_Admin");
      const isAdmin = res.data.isAdmin;
      if (isAdmin) {
        setIsAdmin(true);
        setIsLoading(false);
        // console.log("Hello admin!");
      }
      const usersResponse = await $api.get("/api/getusers");
      setUsers(usersResponse.data);
    } catch (e) {
      console.log(e);
    }
  }, []);
  if (!isLoading) {
    if (isAdmin) {
      return (
        <div>
          <h1>Admin page</h1>
          <div>
            Here i`ll providde a lot of opportunities of app moderatingHere i`ll
            providde a lot of opportunities of app moderating
          </div>
          <div>
            <UsersList users={users} refreshList={refreshList} />
          </div>
        </div>
      );
    } else {
      return (
        <div class="mb-500 compute-font f-si-24">
          You have no access to this page
        </div>
      );
    }
  } else {
    return (
      <div class="container flex align-center mt-300 mb-500">
        <div>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
}

function UsersList(props) {
  if (!props.users) {
    return <div> Loading... </div>;
  } else {
    return (
      <>
        {props.users.map((user) => {
          return <Admin_userCard user={user} refreshList={props.refreshList} />;
        })}
      </>
    );
  }
}
