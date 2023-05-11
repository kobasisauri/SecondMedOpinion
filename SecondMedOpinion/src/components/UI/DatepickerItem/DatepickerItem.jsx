import React, { useState } from "react";
import DatePicker from "react-datepicker";
import UIFormControl from "../FormControl/UIFormControl";

const DatePickerElement = React.forwardRef(
  (
    { value, onClick, invalid, errors, inputName, inputLabel, placeholderText },
    ref
  ) => (
    <div ref={ref}>
      <UIFormControl
        type="string"
        label={inputLabel}
        name={inputName || ""}
        placeholder={placeholderText}
        value={value}
        handleClick={onClick}
        readOnly
        isInvalid={invalid}
        errorMSG={errors}
      />
    </div>
  )
);

const DatepickerItem = ({
  label,
  placeholder,
  name,
  isInvalid,
  errorMSG,
  valChange,
  setTouched,
}) => {
  const [value, setValue] = useState("");

  return (
    <DatePicker
      calendarClassName="portal-datepicker"
      closeOnScroll={true}
      withPortal
      showMonthDropdown
      showYearDropdown
      customInput={
        <DatePickerElement
          inputLabel={label}
          invalid={isInvalid}
          errors={errorMSG}
          inputName={name}
          placeholderText={placeholder}
        />
      }
      dateFormat="dd/MM/yyyy"
      dropdownMode="select"
      fixedHeight
      calendarStartDay={1}
      onCalendarClose={() => {
        setTimeout(() => {
          if (setTouched) setTouched();
        });
      }}
      onChange={(val) => {
        setValue(val);
        valChange(val);
      }}
      selected={value}
    />
  );
};

export default DatepickerItem;
