import useGuesting from "../hooks/guesting-hook";
import useUsers from "../hooks/users-hook";

export default function Admin_userCard(props) {
  const { visitOne } = useGuesting();
  const { deleteUser } = useUsers();
  const id = props.user._id;
  const user = props.user;
  async function onDeleteUser() {
    try {
      const { data, status } = await deleteUser(id);
      if (status && status == 200) {
        props.refreshList();
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div
      class="user-card h-150 bg-gray pt-20 pb-20 mt-20 "
      onClick={() => {
        visitOne(id);
      }}
    >
      <div class="flex space-between ml-20 mr-20">
        <div>
          <h4>name: {(user.name || "") + " " + (user.surname || "")}</h4>
          <div> email: {user.email} </div>
          <div> isOnline: false </div>
        </div>
        <div>
          <div>
            <button onClick={onDeleteUser}> Delete </button>
          </div>
          {/* <div>
            <button> Add listener </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
