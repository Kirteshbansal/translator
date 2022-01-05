/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";

import TextBox from "./Common/TextBox";
import SelectBox from "./Common/SelectBox";
import { getLanguages, detectLanguage, translateText } from "../api/apiService";
import translatorLogo from "../public/images/translate.png";
import { BounceLoader } from "./Common/Loaders";

const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5em 1.25em 1.25em",
        marginBottom: "1em",
        [theme.breakpoints.up("sm")]: {
            marginTop: "2em",
            marginBottom: "2em",
        },
        [theme.breakpoints.up("md")]: {
            marginTop: "3.5em",
            marginBottom: "2em",
        },
    },
    header__title: {
        fontSize: "1.5em",
        margin: "0 0.5em",
        [theme.breakpoints.up("md")]: {
            fontSize: "2em",
        },
    },
    header__img: {
        width: "3em",
        [theme.breakpoints.up("sm")]: {
            width: "3.5em",
        },
        [theme.breakpoints.up("md")]: {
            width: "4em",
        },
    },
    formControlClasses: {
        marginBottom: theme.spacing(2),
    },
    alert: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    btn: {
        margin: "1em auto",
    },
    textBox: {
        "&:disabled": {
            color: grey[900],
            cursor: "not allowed",
        },
    },
}));

const initialState = {
    loading: false,
    languages: [],
    detectLang: {},
    textToTranslate: "",
    translatedText: "",
    targetLang: "en",
    translationLoading: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, loading: action?.payload };
        case "languages":
            return { ...state, languages: action?.payload };
        case "detectLanguage":
            return { ...state, detectLang: action?.payload };
        case "textToTranslate":
            return { ...state, textToTranslate: action?.payload };
        case "translatedText":
            return { ...state, translatedText: action?.payload };
        case "translationLoading":
            return { ...state, translationLoading: action?.payload };
        case "targetLanguage":
            return { ...state, targetLang: action?.payload };
        default:
            return state;
    }
}

const Translate = () => {
    const classes = useStyles();
    const smSize = useMediaQuery((theme) => theme.breakpoints.up("sm"));
    const mdSize = useMediaQuery((theme) => theme.breakpoints.up("md"));
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        (async () => {
            try {
                dispatch({ type: "loading", payload: true });
                const res = await getLanguages();
                dispatch({ type: "loading", payload: false });
                dispatch({ type: "languages", payload: res });
            } catch (err) {
                console.error(err);
                dispatch({ type: "loading", payload: false });
            }
        })();
    }, []);

    useEffect(() => {
        (async () => await detectLanguageSource(state?.textToTranslate))();
    }, [state?.textToTranslate]);

    const getTextLang = () => {
        const { textToTranslate, detectLang } = state;
        if (detectLang?.name) {
            return detectLang?.language;
        } else if (!textToTranslate.length) {
            return null;
        }
    };

    const detectLanguageSource = async (textData) => {
        try {
            const res = await detectLanguage({ q: textData });
            const lang = state.languages.filter((e) => {
                return e.code === res[0].language;
            });
            dispatch({ type: "detectLanguage", payload: { ...res[0], name: lang[0].name } });
        } catch (err) {
            console.error(err);
            return err;
        }
    };

    const inputHandler = (e) => {
        const eventName = e.target.name;
        const val = e.target.value;
        if (eventName === "enterText") {
            dispatch({ type: "textToTranslate", payload: val });

            if (val.length === 0) {
                dispatch({ type: "translatedText", payload: "" });
                dispatch({ type: "detectLanguage", payload: {} });
            }
        } else if (eventName === "language") {
            dispatch({ type: "targetLanguage", payload: val });
        }
    };

    const translateHandler = async () => {
        try {
            dispatch({ type: "translationLoading", payload: true });

            const reqBody = {
                q: state?.textToTranslate,
                source: state.detectLang?.language,
                target: state?.targetLang,
            };
            const res = await translateText(reqBody);
            dispatch({ type: "translatedText", payload: res });
            dispatch({ type: "translationLoading", payload: false });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {state.loading ? (
                <BounceLoader />
            ) : (
                <>
                    <Box className={classes.header}>
                        <img src={translatorLogo} alt="logo" className={classes.header__img} />
                        <Typography component="h4" color="textPrimary" className={classes.header__title}>
                            Easy Translator
                        </Typography>
                    </Box>
                    {!state.loading &&
                        (state?.translatedText?.error ||
                            state?.translatedText?.isAxiosError ||
                            state?.languages?.isAxiosError ||
                            state.detectLang?.error ||
                            state.detectLang?.isAxiosError) && (
                            <Alert severity="error" className={classes.alert}>
                                There is some error. Please try refreshing the page!
                            </Alert>
                        )}
                    <Grid container spacing={3}>
                        <BoxItem
                            label="Enter Text"
                            inputVal={state.detectLang?.name}
                            changeHandler={inputHandler}
                            textName="enterText"
                            inputReadOnly={true}
                            inputPlaceHolder="Detect Language"
                            selectVal={getTextLang()}
                            errDisabled={state?.translatedText?.isAxiosError || state?.languages?.isAxiosError}
                            textValue={state.textToTranslate}
                            allowedRows={mdSize ? 15 : smSize ? 8 : 5}
                        />
                        <BoxItem
                            data={state?.languages.length ? state?.languages : []}
                            selectVal={state?.targetLang}
                            withSelect={true}
                            changeHandler={inputHandler}
                            selectName="language"
                            textReadOnly={true}
                            textValue={state?.translatedText?.translatedText}
                            errDisabled={state?.translatedText?.isAxiosError || state?.languages?.isAxiosError}
                            allowedRows={mdSize ? 15 : smSize ? 8 : 5}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.btn}
                            onClick={translateHandler}
                            disabled={
                                state.textToTranslate.length < 3 ||
                                state?.translatedText?.isAxiosError ||
                                state?.languages?.isAxiosError
                            }
                        >
                            {state?.translationLoading ? <BounceLoader fixed={false} btnLoader={true} /> : "Translate"}
                        </Button>
                    </Grid>
                </>
            )}
        </>
    );
};

const BoxItem = ({
    textValue = "",
    selectVal = "",
    withSelect = false,
    inputVal = "",
    inputReadOnly = "",
    inputLabel = "",
    inputPlaceHolder = "",
    label,
    data,
    formControlClasses,
    displayEmpty = false,
    changeHandler,
    selectReadOnly = false,
    textReadOnly = false,
    textName,
    selectName,
    inputName,
    errDisabled,
    allowedRows,
    ...props
}) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} md={6}>
            {withSelect ? (
                <SelectBox
                    data={data}
                    value={selectVal}
                    formControlClasses={classes.formControlClasses}
                    displayEmpty={displayEmpty}
                    changeHandler={changeHandler}
                    disabled={errDisabled}
                    readOnly={selectReadOnly}
                    name={selectName}
                />
            ) : (
                <TextBox
                    classes={classes.textBox}
                    label={inputLabel ? inputLabel : ""}
                    placeholder={inputPlaceHolder}
                    multiline={false}
                    size="small"
                    formControlClasses={classes.formControlClasses}
                    fullWidth
                    value={inputVal}
                    name={inputName}
                    variant="outlined"
                    changeHandler={changeHandler}
                    disabled={errDisabled || inputReadOnly}
                />
            )}
            <TextBox
                classes={classes.textBox}
                label={label}
                multiline={true}
                minRows={allowedRows}
                maxRows={allowedRows}
                fullWidth
                value={textValue}
                name={textName}
                variant="outlined"
                changeHandler={changeHandler}
                disabled={errDisabled || textReadOnly}
            />
        </Grid>
    );
};

export default React.memo(Translate);
