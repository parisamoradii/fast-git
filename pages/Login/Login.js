import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import * as yup from "yup";
import CustomInput from "../../Components/Form/CustomInput";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import { useForm } from "../../hooks/useForm";
import { Form, Formik } from "formik";



import "./Login.css";
import axios from "axios";

const initialValues = {
  username: '',
  password: ''
}

const validationSchema = yup.object({
  username: yup
    .string()
    .required("نام کاربری را وارد کنید")
    .min(4, "نام کاربری باید بیشتر از 4 حرف باشد")
    .max(16, "نام کاربری باید کمتر از 16 حرف باشد"),

  password: yup
    .string()
    .required("رمز عبور را وارد کنید")
    .min(8, "رمز عبور باید بیشتر از 8 حرف باشد"),
  // .matches(
  //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*d)(?=.*[*@#])[A-Za-zd*@#]{8,}$/,
  //   "رمز عبور باید شامل حروف بزرگ انگلیسی و کوچک و عدد و نمادها"
  // ),
});

export default function Login() {
  // const [formState, onInputHandler] = useForm(
  //   {
  //     username: {
  //       value: "",
  //       isValid: false,
  //     },
  //     password: {
  //       value: "",
  //       isValid: false,
  //     },
  //   },
  //   false
  // );

  
  const userLogin = (values) => {
    console.log(values)
  //   values.identifier=values.username
  // values.confirmPassword= values.Password
  //   try{
  //      const response = await fetch('https//localhost:4000/auth/login' , 'Post');
  //   }
  //   catch(error){
  //     console.log(error); 
  //   }
  };

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="login-register">
        <div className="login">
          <span className="login__title">ورود به حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">کاربر جدید هستید؟</span>
            <Link className="login__new-member-link" to="/register">
              ثبت نام
            </Link>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={userLogin}
          >
            <Form className="login-form">
              <div className="login-form__username">
                {/* <Input
                  className="login-form__username-input"
                  id="username"
                  type="text"
                  placeholder="نام کاربری یا آدرس ایمیل"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                    emailValidator()
                  ]}
                  onInputHandler={onInputHandler}
                /> */}

                <CustomInput name='username'
                  placeholder="نام کاربری یا آدرس ایمیل" className="login-form__username-input" />
                <i className="login-form__username-icon fa fa-user"></i>
              </div>
              <div className="login-form__password">
                {/* <Input
                  element="input"
                  id="password"
                  type="password"
                  className="login-form__password-input"
                  placeholder="رمز عبور"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(18),
                  ]}
                  onInputHandler={onInputHandler}
                /> */}

                <CustomInput
                  name='password'
                  placeholder="رمز عبور"
                  type="password"
                  className="login-form__password-input" />
                <i className="login-form__password-icon fa fa-lock-open"></i>
              </div>
              <Button
                className={`login-form__btn ${true
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
                  }`}
                type="submit"
              // disabled={!formState.isFormValid}
              >
                <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
                <span className="login-form__btn-text">ورود</span>
              </Button>
              <div className="login-form__password-setting">
                <label className="login-form__password-remember">
                  <input
                    className="login-form__password-checkbox"
                    type="checkbox"
                  />
                  <span className="login-form__password-text">
                    مرا به خاطر داشته باش
                  </span>
                </label>
                <label className="login-form__password-forget">
                  <a className="login-form__password-forget-link" href="#">
                    رمز عبور را فراموش کرده اید؟
                  </a>
                </label>
              </div>
            </Form>
          </Formik>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
