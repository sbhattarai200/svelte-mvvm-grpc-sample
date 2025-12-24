import type {GetAllConsultantRequest, GetAllConsultantResponse} from "../grpc/generated-stubs/jyotish/jyotish-common";
import jyotishServiceClients from "../grpc/clients/jyotish-client";
import {grpc_call} from "./controller/grpc-request-controller";

export const getAllConsultantRpc = (
    request: GetAllConsultantRequest,
    retryTimes: number
): Promise<GetAllConsultantResponse> => {
    return grpc_call(
        jyotishServiceClients.consultantServiceClient,
        (client) => client.getAllConsultant.bind(client),
        request,
        retryTimes
    );
};