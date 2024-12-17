export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;


const postRequest = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        if (!response.ok) throw new Error(responseData.error || 'Something went wrong');
        return responseData;
    } catch (error) {
        throw error;
    }
};


export const loginUser = async (username, password) => {
    return await postRequest('login', { username, password });
};


export const registerUser = async (username, password, fullname) => {
    return await postRequest('register', { username, password, fullname });
};
