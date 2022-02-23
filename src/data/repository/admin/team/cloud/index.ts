import { ITeamResponse } from 'shared/interfaces/common/admin/team';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RabbitResource } from '../../../../gateway/api/resource';
import ResponseModel from '../../../../models/response';
import getConfig from '../../../../setting';
import ApiGateway from '../../../../gateway/api';

const DEFAULT_FILTER_PAGE_SIZE = 100;

const prepareApiCall = (
  payload: {
    [key: string]: number | string | boolean;
  } & { orderBy?: string[] }
) => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const teamResource = RabbitResource.Team.getTeams(payload);
  return { apiGateway, teamResource };
};

const getTeams = (payload: any): Observable<ResponseModel<ITeamResponse>> => {
  const { apiGateway, teamResource } = prepareApiCall(payload);
  return apiGateway.doGetAjaxRequest(teamResource).pipe(pluck('data'));
};

const getTeamsFilter = (
  payload: any
): Observable<ResponseModel<ITeamResponse>> => {
  const { apiGateway, teamResource } = prepareApiCall({
    ...payload,
    pageSize: DEFAULT_FILTER_PAGE_SIZE,
    filter: 'productType in ("products/car-insurance")',
  });
  return apiGateway
    .doGetAjaxRequest(teamResource)
    .pipe(pluck('data', 'teamsWithUsers'));
};

const getTeamsLookup = (): Observable<ResponseModel<ITeamResponse>> => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const lookupTeamResource = RabbitResource.Team.lookupTeam();
  return apiGateway.doGetAjaxRequest(lookupTeamResource).pipe(pluck('data'));
};

const lookupTeamManagers = () => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const managerResource = RabbitResource.Team.lookupTeamManagers();
  return apiGateway.doGetAjaxRequest(managerResource).pipe(pluck('data'));
};

const lookupTeamSupervisors = () => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const supervisorResource = RabbitResource.Team.lookupTeamSupervisors();
  return apiGateway.doGetAjaxRequest(supervisorResource).pipe(pluck('data'));
};

const getTeamsCarInsuranceLookup = (): Observable<
  ResponseModel<ITeamResponse>
> => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const lookupTeamResource = RabbitResource.Team.lookupTeamByProduct(
    'products/car-insurance'
  );
  return apiGateway.doGetAjaxRequest(lookupTeamResource).pipe(pluck('data'));
};

const getTeamsHealthInsuranceLookup = (): Observable<
  ResponseModel<ITeamResponse>
> => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const lookupTeamResource = RabbitResource.Team.lookupTeamByProduct(
    'products/health-insurance'
  );
  return apiGateway.doGetAjaxRequest(lookupTeamResource).pipe(pluck('data'));
};

const getElasticsearchTeam = () => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const elasticsearchUser = RabbitResource.User.getElasticsearchUser();
  return apiGateway.doGetAjaxRequest(elasticsearchUser).pipe(pluck('data'));
};

const getTeamsBySortName = (
  payload: any
): Observable<ResponseModel<ITeamResponse>> => {
  const { apiGateway, teamResource } = prepareApiCall(payload);
  return apiGateway
    .doGetAjaxRequest(teamResource)
    .pipe(pluck('data', 'teamsWithUsers'));
};
export default {
  getTeams,
  getTeamsFilter,
  getTeamsLookup,
  getTeamsCarInsuranceLookup,
  getTeamsHealthInsuranceLookup,
  getElasticsearchTeam,
  lookupTeamSupervisors,
  lookupTeamManagers,
  getTeamsBySortName,
};
