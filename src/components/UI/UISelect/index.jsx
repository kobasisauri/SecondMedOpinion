import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import useOnClickOutside from "../../../hooks/on-click-outside";
// import Loader from '../Loader';
import Toggle, { closeClass } from "./Toggle";
import styles from "./styles.module.scss";

const Base = (
  {
    label,
    placeholder = "",
    name,
    initialValue = null,
    fetchedData,
    loading,
    clearable,
    multipleCheck,
    isInvalid,
    errorMSG,
    disabled,
    toggleClassName,
    endpoint,
    handleChange,
    setTouched,
    ...rest
  },
  ref
) => {
  const { t } = useTranslation();

  const [initialLoading, setInitialLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const inputRef = useRef();
  const nodeRef = useRef();

  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (endpoint) {
      setInitialLoading(true);
      endpoint()
        .then((res) => setData(res))
        .finally(() => setInitialLoading(false));
    }
  }, [endpoint]);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  const onClickOutside = useCallback(() => {
    if (visible) {
      setVisible(false);

      if (setTouched) setTouched();
    }
  }, [setTouched, visible]);

  useOnClickOutside(nodeRef, onClickOutside);

  useEffect(() => {
    if (initialValue === null || !data) {
      return;
    }

    let scopedSelectedVal = [];

    const setScopedVal = (item) => {
      if (
        (initialValue instanceof Array && initialValue.includes(item.value)) ||
        item.value === initialValue
      ) {
        scopedSelectedVal.push(item);
      }
    };

    data.forEach((item) => {
      const children = item.children;

      if (children) {
        children.forEach((subItem) => setScopedVal(subItem));
      } else {
        setScopedVal(item);
      }
    });

    setSelected(scopedSelectedVal);
  }, [data, initialValue]);

  const handelMouseDown = (e) => {
    const isCloseEl = e.target.classList.contains(closeClass);

    if (!isCloseEl) {
      setVisible(!visible);
    } else {
      if (setTouched) setTouched();

      setSelected(null);
      handleChange(null);
    }
  };

  const onSelect = (item) => {
    if (!multipleCheck) {
      setVisible(false);
    }

    let SelectedBeforeSet = null;

    if (multipleCheck && selected) {
      const includes = !!selected.find((i) => i.value === item.value);

      SelectedBeforeSet = !includes
        ? [...selected, item]
        : selected.filter((i) => i.value !== item.value);
      SelectedBeforeSet = SelectedBeforeSet.length ? SelectedBeforeSet : null;
    } else {
      SelectedBeforeSet = [item];
    }

    multipleCheck
      ? handleChange(SelectedBeforeSet)
      : handleChange(SelectedBeforeSet[0]);
    setSelected(SelectedBeforeSet);

    setTimeout(() => {
      if (setTouched) setTouched();
    });
  };

  const isChecked = (value) => {
    return (
      !!selected &&
      !!selected.find((item) => {
        return item.value === value;
      })
    );
  };

  useImperativeHandle(ref, () => ({
    clear: () => {
      setSelected(null);
      handleChange(null);
    },
  }));

  return (
    <div {...rest}>
      {label && <label className="mb-2 ms-1">{t(label)}</label>}
      <div className="position-relative">
        <Dropdown ref={nodeRef} show={disabled ? false : visible}>
          <Dropdown.Toggle
            as={Toggle}
            name={name}
            clearable={clearable}
            visible={visible}
            selected={selected}
            placeholder={t(placeholder)}
            inputRef={inputRef}
            isInvalid={isInvalid}
            disabled={disabled}
            toggleClassName={toggleClassName}
            handelMouseDown={handelMouseDown}
            t={t}
          />

          <Dropdown.Menu
            className={`light-scroll ${styles["dropdown-menu"]}`}
            popperConfig={{
              modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
            }}
          >
            <div className="position-relative">
              {data?.map((item, i) => {
                if (multipleCheck) {
                  if (item.children) {
                    return (
                      <div key={i}>
                        <b className={styles.title}>{t(item.label)}</b>
                        {item.children.map((subItem, j) => (
                          <label
                            key={j}
                            className={`${styles.item} ${styles.nested}`}
                          >
                            <input
                              type="checkbox"
                              className="form-check-input me-2"
                              checked={isChecked(subItem.value)}
                              onChange={() => onSelect(subItem)}
                            />
                            {t(subItem.label)}
                          </label>
                        ))}
                      </div>
                    );
                  }

                  return (
                    <label key={i} className={styles.item}>
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={isChecked(item.value)}
                        onChange={() => onSelect(item)}
                      />
                      {t(item.label)}
                    </label>
                  );
                }

                if (item.children) {
                  return (
                    <div key={i}>
                      <b className={styles.title}>{t(item.label)}</b>
                      {item.children.map((subItem, j) => (
                        <div
                          className={`${styles.item} ${styles.nested}`}
                          onClick={() => onSelect(subItem)}
                          key={j}
                        >
                          {t(subItem.label)}
                        </div>
                      ))}
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    className={styles.item}
                    onClick={() => onSelect(item)}
                  >
                    {t(item.label)}
                  </div>
                );
              })}
              {!data?.length && (
                <div className={styles["not-found"]}>{t("DataNotFound")}</div>
              )}
            </div>
          </Dropdown.Menu>

          {
            (loading || initialLoading) && <></>
            // <Loader size="sm" />
          }
        </Dropdown>
      </div>
      {isInvalid && <div className={styles["error-msg"]}>{t(errorMSG)}</div>}
    </div>
  );
};

const UISelect = React.forwardRef(Base);

export default UISelect;
