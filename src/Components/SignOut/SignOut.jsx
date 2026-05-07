import React, { useState } from "react";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";

const Signout = () => {
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    toast.success("Successfully Signed Out");
  };

  return (
    <div>
      <h1>Sign Out Page</h1>

      <button onClick={() => setOpen(true)}>
        Sign Out
      </button>

      <DeleteTaskModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleSignOut}
        title="Sign Out"
        message="Are you sure you want to sign out from your account?"
        confirmText="Sign Out"
        cancelText="Cancel"
        showTaskInfo={false}
      />
    </div>
  );
};

export default Signout;