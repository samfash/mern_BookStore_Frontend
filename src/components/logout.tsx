import React from "react";

const Logout = (props) => {
  return (
    <div>
      {props.token ? (
              <button onClick={props.handleLogout} className="btn btn-danger block w-full px-3 py-2 text-left text-sm font-medium hover:bg-beige-100"
              >
                Logout
              </button>
            ) : (
              <a href="/login" className="btn btn-primary block w-full px-3 py-2 text-left text-sm font-medium hover:bg-beige-100">Login</a>
            )}
    </div>
  );
}

export default Logout;