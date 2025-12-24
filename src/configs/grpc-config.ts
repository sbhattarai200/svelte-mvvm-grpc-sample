
export function retryCase(errCode: number | string, errMessage: string): boolean {
    if (errMessage && errMessage === 'Http response at 400 or 500 level') {
        return false;
    }

    return [7, 5, 1, 2, 16, 3, 11].includes(
        typeof errCode === 'string' ? parseInt(errCode) : errCode
    );
}

export const MetaHeaders = async (): Promise<any> => {
    return await metaDataHeader();
};

export async function metaDataHeader(addTz: boolean = true): Promise<any> {
    let token;
    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const headers: any = {
        'app-id': 'hamropatro'
    };
    //     const profile = miniapp?.getUserProfile();
    // if (profile) {
    //         token = await profile?.accessToken;
    // }
    if (addTz) {
        headers['tz'] = tz;
    }
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
}
