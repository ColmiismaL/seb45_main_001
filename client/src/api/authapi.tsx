import axios, { AxiosResponse, AxiosError, Method } from 'axios';

export const localapiUrl = `http://52.79.212.94:8080`;
export const apiUrl = `http://13.209.157.148:8080`;
export const apilongurl = `http://ec2-13-209-157-148.ap-northeast-2.compute.amazonaws.com`;

export const jsonUrl = `http://localhost:5002`;

export const lastUrl = `${apiUrl}`;

function getToken() {
    return sessionStorage.getItem('jwt');
}

const token = getToken();

const headers = {
    // "Session-Id": `${token}`,
    Authorization: `${token}`,
    // 'Cookie': `sessionId=${token}`
    // withCredentials: true,
};


type ApiConfig<D> = {
    method: Method;
    url: string;
    data?: D;
};



export function apiCall<T = any, D = any>(config: ApiConfig<D>): Promise<AxiosResponse<T>> {
    const fullUrl = `${lastUrl}/${config.url}`;
    console.log('api:', fullUrl);
    console.log('origin', location.origin);
    console.log('Request Headers:', headers);

    return axios({
        method: config.method,
        url: fullUrl,
        data: config.data,
        headers,
        // withCredentials: true,
    })
        .then((response: AxiosResponse<T>) => {
            console.log('Response Data:', response.data);
            console.log('Response received:', response);
            return response;
        })
        .catch((error: AxiosError) => {
            console.log('Error occurred:', error);
            throw error;
        });
}

// GET 예시

// apiCall<{ id: number; name: string }>({
//     method: 'GET',
//     url: 'endpoint',
// });

// POST 예시

// apiCall<{ id: number }, { email: string; password: string }>({
//     method: 'POST',
//     url: 'another_endpoint',
//     data: { email: 'test@example.com', password: 'password123' },
// });
