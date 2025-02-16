/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { translate } from "../../../hooks/useTranslator";
import { ICendeuPresenter } from "../core/presentation/ICendeuPresenter";
import { ICendeuScreen } from "../core/screens/ICendeuScreen";
import { cendeuPresenterProvider } from "../infrastructure/presentation/presenterProvider";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";

const CendeuScreen = () => {
  const presenterProvider = cendeuPresenterProvider();

  const t = translate();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [presenter, setPresenter] = useState<ICendeuPresenter>(
    {} as ICendeuPresenter
  );

  const cendeuTitleTab = "CENDEU | Accicom - Préstamos personales";

  // *Estos View Handlers son muy practicos para establecer acciones 
  // que se disparan cuando nuestra peticion al backend es exitosa o falló
  // En estos ejemplos por ejemplo cuando hay error se llama a un toast con un mensaje de error (que está usando un traductor t)
  // **/
  const viewHandlers: ICendeuScreen = {
    onProcessFileSuccess: function (): void {
      setLoading(false);
    },
    onProcessFileError: function (err: any): void {
      setLoading(false);
      showErrorToast(
        err?.period
          ? t("cendeu.error_periodErrorTitle")
          : t("cendeu.error_title"),
        err?.period
          ? t("cendeu.error_periodErrorDescription")
          : t("cendeu.error_message")
      );
    },
    onDownloadFileSuccess: function (): void {
      showSuccessToast(t("leads.success_title"));
    },
    onDownloadFileError: function (): void {
      showErrorToast(t("leads.error_title"), t("leads.error_message"));
    },
    updateStatusSuccess(): void {
      showSuccessToast(t("cendeu.update_status_success"));
    },
    updateStatusError(): void {
      showErrorToast(t("cendeu.error_title"), t("cendeu.error_message"));
    },
  };

  //Con este useEffect cargamos nuestro presenter, el que se encargará de traer todas nuestras funciones que construimos
  useEffect(() => {
    document.title = cendeuTitleTab;
    setPresenter(presenterProvider.getPresenter(viewHandlers));
    setLoaded(true); // Indicamos que se cargaron los elementos necesarios para la pagina
  }, []);

  useEffect(() => {
    if (loaded) {
      setLoading(true);
      //Aca podemos llamar a funciones generalmente encargadas de traer datos del backend, para eso usamos el presenter
      // presenter.getRegisters();
    }
  }, [loaded]);

  //ABAJO NUESTROS ELEMENTOS QUE SE RENDERIZARAN EN LA PAGINA
  return (
    <Container fluid mx={"2rem"}>
      <h1>HOLA DESDE MODULO CENDEU</h1>
    </Container>
  );
};

export default CendeuScreen;
