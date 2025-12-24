import type {
	GetAllConsultantRequest,
	GetAllConsultantResponse
} from "../../../grpc/generated-stubs/jyotish/jyotish-common";
import {getAllConsultantRpc} from "../../../requests/jyotish-requests";
import type {ConsultantApiDefinitions} from "./jyotish-api-definitions";


export class ConsultantApiService implements ConsultantApiDefinitions {
	getAllConsultants(
		getAllConsultantRequest: GetAllConsultantRequest
	): Promise<GetAllConsultantResponse> {
		return getAllConsultantRpc(getAllConsultantRequest, 3);
	}
}
