import toast from "react-hot-toast";

export const handleRemoveCookies = () => {
  //remove access token
  document.cookie =
    "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  // Remove refreshToken
  document.cookie =
    "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  toast.success("Logout successfully");
  window.location.href = "/";
};