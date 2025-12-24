import { writable } from 'svelte/store';
import type { GetAllConsultantResponse} from "../../grpc/generated-stubs/jyotish/jyotish-common";

export const jyotishStore = writable<{
    consultantList: GetAllConsultantResponse | null;
    loading: boolean;
    error: string | null;
}>({
    consultantList: null,
    loading: false,
    error: null
});
