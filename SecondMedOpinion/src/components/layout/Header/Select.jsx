import React, { useState, useRef, useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styles from "./Select.module.scss";

import useOnClickOutside from "../../../hooks/on-click-outside";

import geo from "../../../assets/georgia.svg";
import uk from "../../../assets/uk.svg";
import ru from "../../../assets/russia.svg";

const closeClass = "close-class";

const data = [
  { label: "GEO", value: "ka", img: geo },
  { label: "ENG", value: "en", img: uk },
  { label: "RUS", value: "ru", img: ru },
];

const Toggle = React.forwardRef(
  ({ selected, placeholder, toggleClassName, handelMouseDown }, ref) => {
    const className = `d-flex ms-3 ${styles["extended-select"]} ${
      toggleClassName ? toggleClassName : ""
    }`;

    return (
      <div className={className} onMouseDown={handelMouseDown} ref={ref}>
        <img src={selected.img} alt="flag" />
      </div>
    );
  }
);

function Select() {
  const { i18n } = useTranslation();
  const [visible, setVisible] = useState(false);

  const inputRef = useRef();
  const nodeRef = useRef();

  const [selected, setSelected] = useState({
    label: "GEO",
    value: "ka",
    img: geo,
  });

  const onClickOutside = useCallback(() => {
    if (visible) {
      setVisible(false);
    }
  }, [visible]);

  useOnClickOutside(nodeRef, onClickOutside);

  const handelMouseDown = (e) => {
    const isCloseEl = e.target.classList.contains(closeClass);

    if (!isCloseEl) {
      setVisible(!visible);
    } else {
      setSelected(null);
    }
  };

  const onSelect = (item) => {
    setVisible(false);
    setSelected(item);

    i18n.changeLanguage(item.value);
  };

  return (
    <Dropdown ref={nodeRef} show={visible}>
      <Dropdown.Toggle
        as={Toggle}
        name="test"
        visible={visible}
        selected={selected}
        placeholder="placeholder"
        inputRef={inputRef}
        // toggleClassName={toggleClassName}
        handelMouseDown={handelMouseDown}
      />

      <Dropdown.Menu
        className={`light-scroll ${styles["dropdown-menu"]}`}
        popperConfig={{
          modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
        }}
      >
        <div className="position-relative">
          {data
            .filter((item) => item.value !== selected.value)
            .map((item) => (
              <div
                key={item.value}
                className={styles.item}
                onClick={() => onSelect(item)}
              >
                {item.label}
                <img src={item.img} alt="flag" />
              </div>
            ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Select;
