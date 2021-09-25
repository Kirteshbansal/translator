import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const TextBox = ({
    label,
    multiline = false,
    value,
    variant = "outlined",
    classes = "",
    changeHandler,
    formControlClasses = "",
    ...props
}) => {
    return (
        <FormControl className={formControlClasses} fullWidth size="small">
            <TextField
                className={classes}
                label={label}
                multiline={multiline}
                value={value}
                variant={variant}
                {...props}
                onChange={changeHandler}
            />
        </FormControl>
    );
};

export default TextBox;
