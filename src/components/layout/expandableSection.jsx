import React, { useState, useEffect } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import styles from "../../styles/expandableSection.module.css";

const ExpandableSection = ({ title, children, relationship = true, expanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  useEffect(() => {
    setIsExpanded(expanded); 
  }, [expanded]);

  if (!relationship) {
    return null; 
  }

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState); 
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title} onClick={toggleExpand}>
        {isExpanded ? (
          <AiOutlineDown
            style={{
              marginRight: "8px",
              fontSize: "14px",
              color: "#0091ae",
            }}
          />
        ) : (
          <AiOutlineRight
            style={{
              marginRight: "8px",
              fontSize: "14px",
              color: "#0091ae",
            }}
          />
        )}
        {title}
      </h3>
      {isExpanded && <div className={styles.details}>{children}</div>}
    </div>
  );
};

export default ExpandableSection;
