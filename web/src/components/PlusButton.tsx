import React from "react";

interface IAddSkillButton {
  onClick: () => void;
  className: string;
}

const AddSkillButton: IAddSkillButton = ({ onClick, className }) => (
  <button onClick={onClick} className={className}>
    +
  </button>
);

export default AddSkillButton
