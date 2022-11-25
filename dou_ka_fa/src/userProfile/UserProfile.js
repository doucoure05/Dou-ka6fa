import { useNavigate } from "react-router-dom";

var UserProfile = (function () {
  var full_name = "";
  var profile = "";

  var getName = function () {
    return full_name; // Or pull this from cookie/localStorage
  };

  var setName = function (name) {
    full_name = name;
    // Also set this in cookie/localStorage
  };

  var getProfile = function () {
    return profile;
  };

  var setProfile = function (prof) {
    profile = prof;
  };

  return {
    getName: getName,
    setName: setName,
    getProfile: getProfile,
    setProfile: setProfile,
  };
})();

export default UserProfile;

//  *******UTILISATION*******

//     import UserProfile from './UserProfile';

//     UserProfile.setName("Some Guy");

//     import UserProfile from './UserProfile';

//     UserProfile.getName();
