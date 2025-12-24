import type {GetAllConsultantRequest} from "../../grpc/generated-stubs/jyotish/jyotish-common";
import  {ConsultantApiService} from "../../services/api/jyotish/jyotish-api-impl";
import {mealStore} from "$lib/stores/meal.store";
import {jyotishStore} from "$lib/stores/jyotish.store";

export class JyotishViewModel {
    private consultantService: ConsultantApiService;
    constructor() {
        this.consultantService = new ConsultantApiService();
    }
    async fetchConsultants(cursor = '', limit = 100) {
        jyotishStore.update(s => ({ ...s, loading: true, error: null }));
        try {

            const request: GetAllConsultantRequest = {
                nextPageToken: cursor??'',
                limit: limit,
                sku: 'j_c_np'
            };

            const res = await this.consultantService.getAllConsultants(request);
            jyotishStore.update(s => ({ ...s,consultantList:res.items, loading: true, error: null }));
        } catch (error) {
            mealStore.set({
                data: null,
                loading: false,
                error: (error as Error).message
            });
            console.error('[ERROR] failed to fetch consultants:', error);
        }
    }

}