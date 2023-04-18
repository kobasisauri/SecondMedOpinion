import React from "react";
import styles from "./styles.module.scss";

export const closeClass = "close-class";

const Toggle = React.forwardRef(
  (
    {
      name,
      inputRef,
      clearable,
      visible,
      selected,
      placeholder,
      isInvalid,
      disabled,
      toggleClassName,
      handelMouseDown,
      t,
    },
    ref
  ) => {
    const className = `d-flex ${styles["extended-select"]} ${
      toggleClassName ? toggleClassName : ""
    } ${visible ? styles.visible : ""} ${isInvalid ? styles.warning : ""} ${
      selected ? styles.selected : ""
    } ${disabled ? styles.disabled : ""}`;

    let constructedPlaceholder = placeholder ? t(placeholder) : "";

    if (selected && selected.length) {
      constructedPlaceholder = selected.map((item) => t(item.label)).join(" ");
    }

    return (
      <div className={className} onMouseDown={handelMouseDown} ref={ref}>
        <input
          type="text"
          className="w-100"
          ref={inputRef}
          placeholder={constructedPlaceholder}
          name={name || ""}
          autoComplete="off"
          readOnly
        />

        <div className={`d-flex align-items-center ${styles.actions}`}>
          {clearable && selected && (
            <i className={`bi bi-x me-1 ${closeClass} ${styles.action}`}></i>
          )}
          <i className="bi bi-chevron-down"></i>
        </div>
      </div>
    );
  }
);

export default Toggle;
