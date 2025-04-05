import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserByAdmin, resetUserCreateState } from "../redux/authSlice";

const Createuser = () => {
  const dispatch = useDispatch();
  // Important: Make sure you're accessing the correct path in your state
  const { loading, success, error } = useSelector((state) => state.auth.userCreate);
  
  // Debug logs
  console.log("User create state:", useSelector(state => state.auth?.userCreate));

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user", // default can be user, but editable
    phone: "",
    countryCode: "",
    address: "",
    birthdate: "",
    gender: "Not Selected",
    bankAccount: "",
    ipAdress: "",
    location: "",
  });

  // Track success state changes
  useEffect(() => {
    console.log("Success state changed:", success);
  }, [success]);

  // Reset form after successful creation
  useEffect(() => {
    if (success) {
      console.log("User created successfully, resetting form in 3 seconds");
      // Reset the form after 3 seconds
      const timer = setTimeout(() => {
        setFormData({
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "user",
          phone: "",
          countryCode: "",
          address: "",
          birthdate: "",
          gender: "Not Selected",
          bankAccount: "",
          ipAdress: "",
          location: "",
        });
        dispatch(resetUserCreateState());
        console.log("Form reset complete");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
    dispatch(createUserByAdmin(formData));
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white";

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-50 to-indigo-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          👤 Create New User
        </h2>

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg animate-pulse">
            <div className="flex items-center">
              <div className="py-1">
                <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-semibold">User created successfully!</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
            <div className="flex items-center">
              <div className="py-1">
                <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="font-semibold">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {[
            "username",
            "firstName",
            "lastName",
            "email",
            "password",
            "phone",
            "countryCode",
            "address",
            "bankAccount",
            "ipAdress",
            "location",
          ].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-gray-600 mb-1 capitalize font-medium">
                {field}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={["username", "email", "password"].includes(field)}
                className={`${inputClass} ${loading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                disabled={loading}
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1 font-medium">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className={`${inputClass} ${loading ? "bg-gray-100 cursor-not-allowed" : ""}`}
              disabled={loading}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1 font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`${inputClass} ${loading ? "bg-gray-100 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1 font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`${inputClass} ${loading ? "bg-gray-100 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="finance">Finance</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className={`w-full py-3 text-white text-lg font-semibold rounded-xl transition duration-300 ${
                loading 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating User...
                </div>
              ) : (
                "Create User"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createuser;