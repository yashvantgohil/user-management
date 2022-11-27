import React from "react";

const AddEditUser = ({
  onSubmit,
  name,
  age,
  phone,
  gender,
  newsletter,
  setName,
  setAge,
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
        <label htmlFor="age">Age</label>
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Max 3 digit"
          type="text"
          maxLength={3}
          pattern="[0-9]+"
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
          maxLength={10}
          pattern="[0-9]{10}"
          required
        />
      </div>
      <div className="element radio">
        {"Gender"}
        <input
          type="radio"
          id="male"
          name="gender"
          checked={gender === "male"}
          value="male"
          onChange={() => setGender("male")}
          required
        />
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          id="female"
          name="gender"
          checked={gender === "female"}
          value="female"
          onChange={() => setGender("female")}
          required
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
