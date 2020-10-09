import React, { useState } from "react";
import clsx from "clsx";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
import {
  InputLabel,
  FormControl,
  MenuItem,
  makeStyles,
  Select,
  Input,
  Checkbox,
} from "@material-ui/core";
import CustomCheckbox from "../Checkbox/checkbox";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  select: (props) => ({
    background: theme.palette.common.white,
    color: theme.palette.secondary.dark,
    padding: "0.665rem 2.1875rem 0.665rem 1rem",
    paddingRight: "2.1875rem",
    fontSize: theme.typography.body1.fontSize,
    borderRadius: theme.shape.borderRadius,
    minWidth: "4rem",
    border: "0.01rem solid #e4e0e0",
    "&:hover": {
      boxShadow: "0 0 0.4rem #ccc",
    },
    "&:focus": {
      boxShadow: theme.shadows[2],
      background: theme.palette.common.white,
      borderRadius: theme.shape.borderRadius,
      boxShadow: "0 0 0.4rem #ccc",
    },
  }),
  selectIcon: (props) => ({
    top: "50%",
    transform: "translateY(-50%)",
    position: "absolute",
    right: "0.3rem",
    fontSize: "1.5rem",
  }),
  selectLabel: (props) => ({
    fontSize: "1rem",
    whiteSpace:"nowrap"
  }),
  menustyle: (props) => ({
    padding: "0.4rem",
  }),
}));

const SelectComponent = (props) => {
  const {
    options,
    handleChange,
    defaultValue,
    value,
    selectLabel,
    multiple,
    icon
  } = props;
 
  const [val, setVal] = useState([defaultValue]);
  const classes = useStyles();
  const handleChangeLocal = (event) => {
    if (!(event.target.value.length <= 0)) {
      setVal(event.target.value);
      handleChange(event);
    } else {
      alert("At least one checkbox must be selected");
    }
  };

  const minimalSelectClasses = useMinimalSelectStyles();
  const iconComponent = (props) => {
    return (
      <i className={`material-icons ${classes.selectIcon}`}>
         { icon &&  icon }
        { !icon && <ArrowDropDownIcon /> }
      </i>
    );
  };
  return (
    <FormControl className="custom-select">
      {selectLabel && (
        <InputLabel
          id={selectLabel}
          classes={{
            root: classes.selectLabel,
          }}
        >
          {selectLabel}
        </InputLabel>
      )}
      {multiple && (
        <Select
          disableUnderline
          labelId={selectLabel}
          classes={{
            root: classes.select,
          }}
          id={"custom-" + selectLabel}
          value={val}
          multiple={multiple}
          onChange={handleChangeLocal}
          IconComponent={iconComponent}
          renderValue={(selected) => {
            let t = selected.map((selected, i) => {
              return (selected)
            })
            return (t.join(', '))
          }}
  
        >
          {options.map((option, i) => (
            <MenuItem
              value={option.label}
              key={option.label}
              label={option.label}
              className={classes.menustyle}
            >
              {multiple && (
                <CustomCheckbox checked={val.indexOf(option.label) > -1} />
              )}
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
      {!multiple && (
        <Select
          disableUnderline
          labelId={selectLabel}
          classes={{
            root: classes.select,
          }}
          id={"custom-" + selectLabel}
          value={value}
          multiple={multiple}
          onChange={handleChangeLocal}
          IconComponent={iconComponent}
        >
          {options.map((option, i) => (
            <MenuItem value={option.value} key={option.value}>
              {multiple && (
                <CustomCheckbox checked={val.indexOf(option.value) > -1} />
              )}
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default SelectComponent;
