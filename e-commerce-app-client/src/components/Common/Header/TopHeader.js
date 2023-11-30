import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../../assets/img/common/avater.png";
import { useAuth } from "oidc-react";

const TopHeader = () => {
  const auth = useAuth();

  return (
    <>
      <section id="top_header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="top_header_right">
                {auth.userData ? (
                  <ul className="right_list_fix">
                    <li className="after_login">
                      <img src={avatar} alt="avatar" />
                      {auth.userData.profile.given_name} {auth.userData.profile.family_name}
                      <i className="fa fa-angle-down"></i>
                      <ul className="custom_dropdown">
                        <li>
                          <Link to="/admin-panel">
                            <i className="fa fa-tachometer"></i> Panel
                          </Link>
                        </li>
                        <li>
                          <Link to="/my-account/customer-order">
                            <i className="fa fa-cubes"></i> Siparişlerim
                          </Link>
                        </li>
                        <li>
                          <button onClick={() => auth.signOut()}>
                            <i className="fa fa-sign-out"></i> Çıkış Yap
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                ) : (
                  <ul className="right_list_fix">
                    <li>
                      <button onClick={() => auth.signIn()}>
                        <i className="fa fa-user"></i>
                        Giriş Yap
                      </button>
                    </li>
                    <li>
                      <Link to="/register">
                        <i className="fa fa-lock"></i>
                        Kayıt Ol
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopHeader;
