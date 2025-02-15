import { DependencyManager } from "../../dependencyManager";
import { IHttpClient } from "../httpClient/interfaces";
import { EditAgeAction } from "./preFilterAge/core/actions/EditAgeAction";
import { GetAgesAction } from "./preFilterAge/core/actions/GetAgesAction";
import { AgesGateway } from "./preFilterAge/infrastructure/gateways/AgesGateway";
import { DeleteAgreementAction } from "./preFilterAgreement/core/actions/DeleteAgreementAction";
import { EditAgreementAction } from "./preFilterAgreement/core/actions/EditAgreementAction";
import { GetAgreementsAction } from "./preFilterAgreement/core/actions/GetAgreementsAction";
import { GetTypeOfAgreementsAction } from "./preFilterAgreement/core/actions/GetTypeOfAgreementsAction";
import { EditTypeOfAgreementAction } from "./preFilterTypeOfAgreement/core/actions/EditTypeOfAgreementAction";
import { SaveTypeOfAgreementAction } from "./preFilterTypeOfAgreement/core/actions/SaveTypeOfAgreementAction";
import { TypeOfAgreementGateway } from "./preFilterTypeOfAgreement/infrastructure/gateways/TypeOfAgreementGateway";
import { DeleteTypeOfAgreementAction } from "./preFilterTypeOfAgreement/core/actions/DeleteTypeOfAgreementAction";
import { SaveAgreementAction } from './preFilterAgreement/core/actions/SaveAgreementAction';
import { AgreementsGateway } from "./preFilterAgreement/infrastructure/gateways/AgreementsGateway";
import { DeletePipeAction } from "./preFilterPipes/core/actions/DeletePipeAction";
import { EditPipeAction } from "./preFilterPipes/core/actions/EditPipeAction";
import { GetPipesAction } from "./preFilterPipes/core/actions/GetPipesAction";
import { SavePipeAction } from "./preFilterPipes/core/actions/SavePipeAction";
import { PipesGateway } from "./preFilterPipes/infrastructure/gateways/PipesGateway";
import { EditSegmentAction } from "./preFilterSegments/core/actions/EditSegmentAction";
import { GetSegmentsAction } from "./preFilterSegments/core/actions/GetSegmentsAction";
import { SegmentsGateway } from "./preFilterSegments/infrastructure/gateways/SegmentsGateway";

export const manageParametersModuleInitialize = (dependencyManager: DependencyManager) => {
  const pipesGateway = PipesGateway(GetHttpClientDependency(dependencyManager));
  const getPipesAction = GetPipesAction(pipesGateway);
  const editPipeAction = EditPipeAction(pipesGateway);
  const savePipeAction = SavePipeAction(pipesGateway);
  const deletePipeAction = DeletePipeAction(pipesGateway);

  const agesGateway = AgesGateway(GetHttpClientDependency(dependencyManager));
  const getAgesAction = GetAgesAction(agesGateway);
  const editAgeAction = EditAgeAction(agesGateway);

  const agreementsGateway = AgreementsGateway(GetHttpClientDependency(dependencyManager));
  const getAgreementsAction = GetAgreementsAction(agreementsGateway);
  const editAgreementAction = EditAgreementAction(agreementsGateway);
  const saveAgreementAction = SaveAgreementAction(agreementsGateway);
  const deleteAgreementAction = DeleteAgreementAction(agreementsGateway);
  
  const typeOfAgreementsGateway = TypeOfAgreementGateway(GetHttpClientDependency(dependencyManager));
  const editTypeOfAgreementAction = EditTypeOfAgreementAction(typeOfAgreementsGateway);
  const saveTypeOfAgreementAction = SaveTypeOfAgreementAction(typeOfAgreementsGateway);
  const deleteTypeOfAgreementAction = DeleteTypeOfAgreementAction(typeOfAgreementsGateway);
  const getTypeOfAgreementsAction = GetTypeOfAgreementsAction(agreementsGateway);

  const segmentsGateway = SegmentsGateway(GetHttpClientDependency(dependencyManager));
  const getSegmentsAction = GetSegmentsAction(segmentsGateway);
  const editSegmentAction = EditSegmentAction(segmentsGateway);

  dependencyManager.register("getPipesAction", getPipesAction);
  dependencyManager.register("editPipeAction", editPipeAction);
  dependencyManager.register("savePipeAction", savePipeAction);
  dependencyManager.register("deletePipeAction", deletePipeAction);

  dependencyManager.register("getAgesAction", getAgesAction);
  dependencyManager.register("editAgeAction", editAgeAction);

  dependencyManager.register("getAgreementsAction", getAgreementsAction);
  dependencyManager.register("editAgreementAction", editAgreementAction);
  dependencyManager.register("saveAgreementAction", saveAgreementAction);
  dependencyManager.register("deleteAgreementAction", deleteAgreementAction);

  dependencyManager.register("deleteTypeOfAgreementAction", deleteTypeOfAgreementAction);
  dependencyManager.register("editTypeOfAgreementAction", editTypeOfAgreementAction);
  dependencyManager.register("saveTypeOfAgreementAction", saveTypeOfAgreementAction);
  dependencyManager.register("getTypeOfAgreementsAction", getTypeOfAgreementsAction);

  dependencyManager.register("getSegmentsAction", getSegmentsAction);
  dependencyManager.register("editSegmentAction", editSegmentAction);
};

export const GetHttpClientDependency = (
  dependencyManager: DependencyManager
) => {
  // Aca creamos una funcion que permite traer desde el dependency manager, al http client y asi pasarselo al gateway
  return dependencyManager.resolve("httpClient") as IHttpClient;
};
