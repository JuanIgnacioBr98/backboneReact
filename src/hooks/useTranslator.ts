import { useTranslation } from "react-i18next";

export const translate = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  const translate = (textToTranslate: string) => {
    return t(textToTranslate);
  };
  return translate;
};
