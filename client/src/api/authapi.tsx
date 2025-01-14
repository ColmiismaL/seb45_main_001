import axios, { AxiosResponse, AxiosError, Method } from 'axios';

export const localapiUrl = `http://52.79.212.94:8080`;
export const apiUrl = ``;
export const jsonUrl = `http://localhost:5002`;

export const lastUrl = `${jsonUrl}`;

function getToken() {
    return localStorage.getItem('jwt');
}

const token = getToken();
const headers = {
    Authorization: `${token}`,
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

    return axios({
        method: config.method,
        url: fullUrl,
        data: config.data,
        headers,
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
