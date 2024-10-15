"use client";
import { Button } from "@nextui-org/button";
import { Toaster } from "react-hot-toast";

import { handleRemoveCookies } from "@/src/helpers/handleLogout";

const Logout = () => {
  return (
    <div>
      <Button color="danger" onClick={handleRemoveCookies}>
        Logout
      </Button>
      <Toaster />
    </div>
  );
};

export default Logout;
