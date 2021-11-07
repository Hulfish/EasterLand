import useGuesting from "../hooks/guesting-hook";

export default function Search_userCard(props) {
  const {setVisiting} = useGuesting()
  const id = props.user._id;
  const user = props.user;
  const searchFeatured = "Moscow";
  const age = "19";
  const userName = nameNormalize(user.name);
  const userSurname = nameNormalize(user.surname);
  // user.name[0] =  user.name[0].toUpperCase()

  function visitOne () {
    setVisiting(id)
    window.location.href = "/user_profile/" + id
  }

  return (
    
      
        <div
          onClick={visitOne}
          class="user-card h-60 pt-10 pb-10 mt-20 bg-light-gray"
        >
          <div class="flex ml-10 mr-10">
            <ImagePlaceholder />
            <div>
              <div class="f-si-16">
                {(userName || "") + " " + (userSurname || "") || "Unknown"}
              </div>
              <div class="f-si-12">
                <User_AlsoInfo user={user} />
              </div>
            </div>
            <div></div>
          </div>
        </div>
  );

  function nameNormalize(name) {
    let nameSplited = name.split("");
    nameSplited[0] = nameSplited[0].toUpperCase();
    const userName = nameSplited.join("");
    return userName;
  }
}

function ImagePlaceholder() {
  return <div class="image-round-placeholder-40 mr-10"></div>;
}

function User_AlsoInfo(props) {
  const { city, age } = props.user;
  return <div class=""> {city + ", " + age} </div>;
}
