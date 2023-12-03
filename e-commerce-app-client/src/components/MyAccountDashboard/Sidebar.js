import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "oidc-react";

const Sidebar = () => {
  const location = useLocation();
  let user = useSelector((state) => state.users.user);
  const auth = useAuth();
  if (!user) {
    auth.signIn();
  }

  return (
    <>
      <div className="col-sm-12 col-md-12 col-lg-3">
        <div className="dashboard_tab_button">
          <ul role="tablist" className="nav flex-column">
            <li>
              <NavLink
                to="/my-account/customer-order"
                className={location.pathname === "/my-account/customer-order" ? "active" : null}
              >
                <i className="fa fa-cart-arrow-down"></i>SİPARİŞLERİM
              </NavLink>
            </li>
            {user && (
              <li>
                <button onClick={() => auth.signOut()}>
                  <i className="fa fa-sign-out"></i>Çıkış Yap
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
