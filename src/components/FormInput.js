import React from "react";
import { useEffect, useState } from "react";

const Form = ({ userInfo, setUserInfo, allInfo, setAllInfo }) => {
const [countryList, setCountryList] = useState([]);
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countries = data.map(country => country.name.common);
        setCountryList(countries);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleChange = (e) => {
    const name = e.target.className;
    const value = e.target.value;
    console.log(name, value);
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type === "image/png") {
      console.log("File uploaded:", file);
    } else {
      console.error("Invalid file format. Please upload a PNG image.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInfo = { ...userInfo, id: new Date().getTime().toString() };
    setAllInfo([...allInfo, newInfo]);
    setUserInfo({
      name: "",
      email: "",
      phone: "",
      dob: "",
      city: "",
      district: "",
      province: "",
      country: "Nepal",
    });
  };

  return (
    <div className="input-form">
      <h1>User Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="name">
            Name <span className="required-symbol">*</span>
          </label>
          <input
            className="name"
            type="text"
            placeholder="Name"
            value={userInfo.name}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <label htmlFor="email">
            Email <span className="required-symbol">*</span>
          </label>
          <input
            className="email"
            type="email"
            placeholder="name@example.com"
            required
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <label htmlFor="phone">
            Phone Number <span className="required-symbol">*</span>
          </label>
          <input
            className="phone"
            type="tel"
            pattern="[0-9]{7,10}"
            placeholder="eg: 9876543210"
            required
            value={userInfo.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <label htmlFor="dob">D.O.B.</label>
          <input
            className="dob"
            type="date"
            value={userInfo.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="form-item">
            <label htmlFor="city">City</label>
            <input
              className="city"
              placeholder="City"
              type="text"
              onChange={handleChange}
              value={userInfo.city}
            />
          </div>
          <div className="form-item">
            <label htmlFor="district">District</label>
            <input
              className="district"
              placeholder="District"
              type="text"
              onChange={handleChange}
              value={userInfo.district}
            />
          </div>
          <div className="form-item">
            <label htmlFor="province" required>
              Province
            </label>
            <select
              className="province"
              onChange={handleChange}
              value={userInfo.province}
            >
              <option value="">Select Province</option>
              <option value="1">Koshi Province</option>
              <option value="2">Madhesh Province</option>
              <option value="3">Bagmati Province</option>
              <option value="4">Gandaki Province</option>
              <option value="5">Lumbini Province</option>
              <option value="6">Karnali Province</option>
              <option value="7">SudurPaschim Province</option>
            </select>
          </div>

          <div className='form-item'>
            <label for="country">
              Country
            </label>
            <select classNamename="country" value={userInfo.country} onChange={handleChange}>
              {countryList.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div className="form-item">
            <label htmlFor="picture">Profile Picture (PNG only)</label>
            <input
              className="picture"
              type="file"
              accept=".png"
              onChange={handleFileChange}
            />
          </div>


          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;