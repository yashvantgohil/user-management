import React from "react";

const AddEditUser = ({
  onSubmit,
  name,
  phone,
  gender,
  newsletter,
  setName,
  setPhone,
  setGender,
  setNewsletter,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="element">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          pattern="[a-zA-Z]+"
          required
        />
      </div>
      <div className="element">
        <label htmlFor="phone">Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="10 digits number"
          type="text"
          pattern="[0-9]{10}"
          required
        />
      </div>
      <div className="element radio">
        {"Gender"}
        <input
          type="radio"
          id="male"
          checked={gender === "male"}
          value="male"
          onChange={() => setGender("male")}
        />
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          id="female"
          checked={gender === "female"}
          value="female"
          onChange={() => setGender("female")}
        />
        <label htmlFor="female">Female</label>
      </div>
      <div className="element checkbox">
        <label htmlFor="newsletter">Newsletter</label>
        <input
          type="checkbox"
          id="newsletter"
          checked={newsletter}
          onChange={() => setNewsletter((val) => !val)}
        />
      </div>
      <div className="element">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddEditUser;
