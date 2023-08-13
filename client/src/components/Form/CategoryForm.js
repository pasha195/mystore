import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  const isButtonDisabled = value.trim() === ""; 

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-dark" disabled={isButtonDisabled}>
          Add Category
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
