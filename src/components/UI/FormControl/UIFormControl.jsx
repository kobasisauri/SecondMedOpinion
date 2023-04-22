import { useRef } from "react";
import { useTranslation } from "react-i18next";
import classes from "./UIFormControl.module.scss";

const UIFormControl = ({
  label,
  name,
  value,
  type,
  className,
  isInvalid,
  errorMSG,
  handleChange,
  handleBlur,
  handleClick,
  disabled,
  placeholder,
  prefix,
  suffix,
  autoComplete,
  readOnly,
  ...rest
}) => {
  const { t } = useTranslation();
  const inputEl = useRef();
  const onFocus = () => inputEl.current.focus();

  return (
    <div className={`w-100 ${className ? className : ""}`} {...rest}>
      {label && <label className="mb-2  ms-1">{label}</label>}
      <div
        className={`d-flex align-items-center ${classes.wrapper} ${
          isInvalid ? classes.warning : ""
        } `}
        onClick={onFocus}
      >
        {prefix && <div className={classes.prefix}>{prefix}</div>}
        <input
          ref={inputEl}
          className={`w-100 border-0 ${disabled ? classes.disabled : ""}`}
          type={type || "text"}
          name={name}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          onClick={handleClick}
          disabled={disabled || false}
          readOnly={readOnly}
          autoComplete={autoComplete || "off"}
        />
        {suffix && <div className={classes.suffix}>{suffix}</div>}
      </div>
      {isInvalid && <div className={classes.errorMSG}>{t(errorMSG)}</div>}
    </div>
  );
};

export default UIFormControl;
