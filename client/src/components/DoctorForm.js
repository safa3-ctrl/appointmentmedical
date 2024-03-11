import React, { useState } from "react";
import Label from "../components/label";
import Button from "../components/button";
import Input from "../components/input";


function DoctorForm({ onFinish, initialValues }) {
  const [formData, setFormData] = useState({
    ...initialValues,
    timings: [], // Initialize timings as an empty array
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate timings if needed (using your validation logic)
    // If validation fails, handle it appropriately (e.g., display error messages)

    // Format timings if necessary
    const formattedTimings = formData.timings.length === 2 ? formData.timings : [];
    setFormData({ ...formData, timings: formattedTimings });

    onFinish(formData); // Send form data only if validation is successful
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4 ml-[12px] mr-[12px]">
    <h1 className="text-xl font-semibold text-gray-700 mt-4">
    Personal Information
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col mb-2">
          <Label html="firstName">Prénom</Label>
          <Input
            name="firstName"
            type="text"
            placeholder="Prénom"
            onChange={handleChange}
            value={formData.firstName} // Set initial value
          />
        </div>
        <div className="flex flex-col mb-2">
          <Label html="lastName">Nom</Label>
          <Input
            name="lastName"
            type="text"
            placeholder="Nom"
            onChange={handleChange}
            value={formData.lastName} // Set initial value
          />
        </div>
        <div className="flex flex-col mb-2">
          <Label html="phoneNumber">Numéro de téléphone</Label>
          <Input
            name="phoneNumber"
            type="text"
            placeholder="Numéro de téléphone"
            onChange={handleChange}
            value={formData.phoneNumber} // Set initial value
          />
        </div>
        <div className="flex flex-col mb-2">
          <Label html="website">Site Web</Label>
          <Input
            name="website"
            type="text"
            placeholder="Site Web"
            onChange={handleChange}
            value={formData.website} // Set initial value
          />
        </div>
        <div className="flex flex-col mb-2">
          <Label html="address">Adresse</Label>
          <Input
            name="address"
            type="text"
            placeholder="Adresse"
            onChange={handleChange}
            value={formData.address} // Set initial value
          />
        </div>
        <div className="flex flex-col mb-2">
          <Label html="experience">Expérience</Label>
          <Input
            name="experience"
            type="number"
            placeholder="Expérience"
            onChange={handleChange}
            key="experience"
            value={formData.experience} // Set initial value
          />
        </div>
      </div>
      <h1 className="text-xl font-semibold text-gray-700 mt-4">
      Professional Information
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col mb-2">
          <Label html="specialization">Spécialisation</Label>
          <Input
            name="specialization"
            type="text"
            placeholder="Spécialisation"
            onChange={handleChange}
            key="specialization"
            value={formData.specialization} // Set initial value
          />
          
        </div>
        <div className="mb-4">
          <Label htmlFor="timings">Timings</Label>
          <div className="flex items-center gap-2">
            <Input
              type="time"
              id="timings"
              name="timings[0]"
              required
              placeholder="Start Time"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              value={formData.timings[0]} // Set initial value for first timing
            />
            <Input
              type="time"
              name="timings[1]"
              required
              placeholder="End Time"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              value={formData.timings[1]} // Set initial value for second timing
            />
          </div>
        </div>

    </div>

    <div className="flex justify-end">
      <Button type="submit">Envoyer</Button>
    </div>
  </form>
  )};

export default DoctorForm;
