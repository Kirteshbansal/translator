import api from "./api";
import apiPaths from "./apiPaths";

export const getLanguages = async () => {
    try {
        const res = await api.get(apiPaths.languagesList);
        return res.data;
    } catch (err) {
        console.error(err);
        return err;
    }
};

export const detectLanguage = async (reqData) => {
    try {
        const res = await api.post(apiPaths.detectLang, reqData);
        return res.data;
    } catch (err) {
        console.error(err);
        return err;
    }
};

export const translateText = async (reqData) => {
    try {
        const res = await api.post(apiPaths.translate, reqData);
        return res.data;
    } catch (err) {
        console.error(err);
        return err;
    }
};
