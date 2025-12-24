import type {
	Consultant,
	GetAllConsultantRequest,
	GetAllConsultantResponse, GetByIdRequest
} from "../../../grpc/generated-stubs/jyotish/jyotish-common";

export interface ConsultantApiDefinitions {
	getAllConsultants(
		getAllConsultantRequest: GetAllConsultantRequest
	): Promise<GetAllConsultantResponse>;

}

