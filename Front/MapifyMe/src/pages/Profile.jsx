import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import instance from "../axiosConfig";
import axios from "axios";

function Profile() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    description: "",
    photo: "",
    phone: "",
    interests: "",
    latitude: "",
    longitude: "",
  });

  // Replace with your Google Maps API key
  const ApiKey = import.meta.env.VITE_API_KEY;

  // Function to fetch latitude and longitude from address
  const getCoordinates = async (address) => {
    if (!address) return;
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${ApiKey}`
      );
      const { results } = response.data;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setForm((prevForm) => ({
          ...prevForm,
          latitude: lat,
          longitude: lng,
        }));
      } else {
        console.log("No coordinates found for this address");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  // Use useEffect to trigger geocoding when address changes
  useEffect(() => {
    if (form.address) {
      getCoordinates(form.address);
    }
  }, [form.address]);

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(form);
    try {
      const frm = new FormData();
      frm.append("name", form.name);
      frm.append("address", form.address);
      frm.append("description", form.description);
      frm.append("photo", form.photo);
      frm.append("phone", form.phone);
      frm.append("interests", form.interests);
      frm.append("latitude", form.latitude);
      frm.append("longitude", form.longitude);

      //   console.log(form);

      const response = await instance.post("/addProfile", frm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);

      setForm({
        name: "",
        address: "",
        description: "",
        photo: "",
        phone: "",
        interests: "",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    if (e.target.name === "photo") {
      setForm({ ...form, photo: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    }
  }
  return (
    <div className="">
      <form
        action=""
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-2 border py-5"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Enter your Name"
          className="border w-[20rem]"
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Enter your address"
          className="border w-[20rem]"
          value={form.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Enter your description"
          className="border w-[20rem]"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="file"
          name="photo"
          placeholder="Upload your photo"
          className="border w-[20rem]"
          onChange={handleChange}
        />
        <input
          type="number"
          name="phone"
          placeholder="Enter your phone No"
          className="border w-[20rem]"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="interests"
          placeholder="Enter your interests"
          className="border w-[20rem]"
          value={form.interests}
          onChange={handleChange}
        />
        <input
          type="Number"
          name="latitude"
          placeholder="Enter the value of latitude"
          className="border w-[20rem]"
          value={form.latitude}
          onChange={handleChange}
        />
        <input
          type="Number"
          name="longitude"
          className="border w-[20rem]"
          placeholder="Enter the value of longitude"
          value={form.longitude}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-400 rounded px-4 py-1">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Profile;
