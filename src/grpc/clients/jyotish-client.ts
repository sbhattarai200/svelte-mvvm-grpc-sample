
import { UserConsultantServiceClient } from '../generated-stubs/jyotish/user-consultant-service.client';


import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';

let transport = new GrpcWebFetchTransport({
	baseUrl: "https://jyotish-backend-grpc.hamropatro.com"
});

export const consultantServiceClient = new UserConsultantServiceClient(transport);


const jyotishServiceClients = {
	consultantServiceClient,
};

export default jyotishServiceClients;
