import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const SelectBox = ({
    formControlClasses = "",
    value = "",
    displayEmpty = false,
    changeHandler,
    selectClasses,
    selectProps,
    variant = "outlined",
    data,
    ...props
}) => {
    return (
        <FormControl className={formControlClasses} fullWidth size="small">
            <Select
                value={value}
                onChange={changeHandler}
                displayEmpty={displayEmpty}
                className={selectClasses}
                inputProps={selectProps}
                variant={variant}
                size="sm"
                {...props}
            >
                {data.map((e, i) => (
                    <MenuItem key={i + 1} value={e?.code}>
                        {e?.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectBox;
