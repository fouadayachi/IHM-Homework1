import * as React from "react";
import { useState } from "react";
import "./App.css";
import FormInput from "./components/Input";

function App() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        placeOfBirth: ""
    });
    const [errors, setErrors] = useState({});
    const [userInfo, setUserInfo] = useState("");

    const onDataChange = (event) => {
        const { name, value } = event.target;
        
        if (name !== "dateOfBirth" && /\d/.test(value)) {
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        const err = {...errors};
        err[name] = null;
        setErrors(err); 
        
    };

    const onDataSubmit = (event) => {
        event.preventDefault();
        setUserInfo("");

        const err = {};
        const arabicPattern = /^[\u0600-\u06FF\s]*$/;
        // Validate fields
        if (!formData.firstName) {
            err.firstName = "الرجاء ملئ خانة الاسم";
        }
        else if(!arabicPattern.test(formData.firstName)){
            err.firstName = "الرجاء الكتابة باللغة العربية";
        }
        if (!formData.lastName) {
            err.lastName = "الرجاء ملئ خانة اللقب";
        }
        else if(!arabicPattern.test(formData.lastName)){
            err.lastName = "الرجاء الكتابة باللغة العربية";
        }
        if (!formData.dateOfBirth) {
            err.dateOfBirth = "الرجاء ملئ خانة تاريخ الميلاد";
        }
        if (!formData.placeOfBirth) {
            err.placeOfBirth = "الرجاء ملئ خانة مكان الميلاد";
        }
        else if(!arabicPattern.test(formData.placeOfBirth)){
            err.placeOfBirth = "الرجاء الكتابة باللغة العربية";
        }

        setErrors(err);

        // If there are any errors, stop submission
        if (Object.keys(err).length > 0) return;

        // Set user info if validation passes
        setUserInfo(`السيد  (ة)  ${formData.firstName} ${formData.lastName}  ${formData.dateOfBirth}  ${formData.placeOfBirth}`);
    };

    return (
        <div className="container">
            <div className="info-form">
            <div className="header">
                <h1>ادخال المعلومات</h1>
            </div>
            <form onSubmit={onDataSubmit} autoComplete="off" noValidate>
                <div className="form-data">
                    <FormInput 
                        label="الاسم" 
                        name="firstName" 
                        value={formData.firstName} 
                        handleOnDataChange={onDataChange} 
                        type="text" 
                        error={errors.firstName} 
                    />
                    <FormInput 
                        label="اللقب" 
                        name="lastName" 
                        value={formData.lastName} 
                        handleOnDataChange={onDataChange} 
                        type="text" 
                        error={errors.lastName} 
                    />
                    <FormInput 
                        label="تاريخ الميلاد" 
                        name="dateOfBirth" 
                        value={formData.dateOfBirth} 
                        handleOnDataChange={onDataChange} 
                        type="date" 
                        error={errors.dateOfBirth} 
                    />
                    <FormInput 
                        label="مكان الميلاد" 
                        name="placeOfBirth" 
                        value={formData.placeOfBirth} 
                        handleOnDataChange={onDataChange} 
                        type="text" 
                        error={errors.placeOfBirth} 
                    />
                    <button type="submit">المعلومات</button>
                </div>
            </form> 
            <p>{userInfo}</p>
        </div>
        </div>
    );
}

export default App;
