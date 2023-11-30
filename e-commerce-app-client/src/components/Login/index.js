import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../app/slices/user";

const LoginArea = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const status = useSelector((state) => state.users.status);
  const user = useSelector((state) => state.users.user);

  const login = (userInfo) => {
    if (status) {
      Swal.fire({
        icon: "question",
        title: "" + user.name,
        html: "Zaten giriş yapmışsınız<br /><b>Dashboard</b><b>Shop</b> page",
      }).then((result) => {
        if (result.isConfirmed) {
          history("/");
        } else {
          // not clicked
        }
      });
    } else {
      console.log("else test");
      dispatch(loginUser({ userInfo }))
        .unwrap()
        .then((data) => {
          console.log("dispatch-then: " + data);
        })
        .catch((e) => {
          console.log(e);
        });

      // dispatch({ type: "user/login" });
      // let name = user.name || "Customer";
      // console.log(typeof user.name);
      // Swal.fire({
      //   icon: "success",
      //   title: "Giriş Başarılı",
      //   text: "Hoşgeldiniz " + name,
      // });
      // history("/");
    }
  };

  return (
    <>
      <section id="login_area" className="ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
              <div className="account_form">
                <h3>Giriş Yap</h3>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const userInfo = {
                      username: event.target.username.value,
                      password: event.target.password.value,
                      rememberLogin: event.target.rememberLogin.checked,
                      returnUrl: "test",
                      button: "login",
                    };
                    login(userInfo);
                  }}
                >
                  <div className="default-form-box">
                    <label>
                      Kullanıcı adı veya Email<span className="text-danger">*</span>
                    </label>
                    <input
                      name="username"
                      type="text"
                      className="form-control"
                      required
                      defaultValue="customer1@gmail.com"
                    />
                  </div>
                  <div className="default-form-box">
                    <label>
                      Şifre<span className="text-danger">*</span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      required
                      defaultValue="Admin123*"
                      minLength="8"
                    />
                  </div>
                  <div className="login_submit">
                    <button name="login" className="theme-btn-one btn-black-overlay btn_md" type="submit">
                      Giriş Yap
                    </button>
                  </div>
                  <div className="remember_area">
                    <div className="form-check">
                      <input
                        name="rememberLogin"
                        type="checkbox"
                        className="form-check-input"
                        id="materialUnchecked"
                      />
                      <label className="form-check-label" htmlFor="materialUnchecked">
                        Beni Hatırla
                      </label>
                    </div>
                  </div>
                  <Link to="/register" className="active">
                    Hesap Oluştur
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginArea;
