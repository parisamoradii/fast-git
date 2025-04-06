import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import { useForm } from "../../hooks/useForm";
import CustomInput from "../../Components/Form/CustomInput";
import { Form, Formik } from "formik";


import "./Register.css";


const initialValues = {
  firstname:'',
 
  username: '',
  password: '12345689',
  email: ''
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
  firstname: yup
  .string()
  .required("نام کاربری را وارد کنید")
  .min(4, "نام کاربری باید بیشتر از 4 حرف باشد")
  .max(16, "نام کاربری باید کمتر از 16 حرف باشد"),
   email: yup
  .string()
  .required("ایمیل را وارد کنید")
  .min(4, " باید بیشتر از 4 حرف باشد")
 




});
export default function Register() {

  
 
  const userLogin =  (values) => {
    console.log( values)
    const newUserInfos = {
      name: values.firstname,
      username: values.username,
      email: values.email,
      password: "123456",
      confirmPassword: "123456" 
       };
console.log(newUserInfos)
       fetch(`http://localhost:4000/v1/auth/register`, {
     method: "POST",
    headers: {
        "Content-Type": "application/json",
     },
       body: JSON.stringify(newUserInfos),
   })
     .then((res) => res.json())
     .then((result) => {
       console.log(result);
     });
    
   
  };
  return (
    <>
      <Topbar />
      <Navbar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم قراره به جمع ما بپیوندی
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">
              قبلا ثبت‌نام کرده‌اید؟{" "}
            </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <Formik 
          initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={userLogin}>
            <Form  className="login-form">
              <div className="login-form__username">
                <CustomInput
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  className="login-form__username-input"
                  name="firstname"

                  
                />
                <i className="login-form__username-icon fa fa-user"></i>
              </div>
              <div className="login-form__username">

                <CustomInput type="text"
                  name='username'
                  placeholder="نام کاربری"
                  className="login-form__username-input"  ></CustomInput>
                <i className="login-form__username-icon fa fa-user"></i>
              </div>
              <div className="login-form__password">

                <CustomInput placeholder="آدرس ایمیل"
                  className="login-form__username-input"
                  name="email"


                >


                </CustomInput>
                <i className="login-form__password-icon fa fa-envelope"></i>
              </div>
              <div className="login-form__password">
                <CustomInput
                  type="password"
                  placeholder="رمز عبور"
                  className="login-form__password-input"
                  name="password"


                />
                <i className="login-form__password-icon fa fa-lock-open"></i>
              </div>
              <Button
              type="submit"
                className={`login-form__btn ${true
                    ? "login-form__btn-success"
                    : "login-form__btn-error"
                  }`}
                
              >
                <i className="login-form__btn-icon fa fa-user-plus"></i>
                <span className="login-form__btn-text">عضویت</span>
              </Button>
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
