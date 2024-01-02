interface UserInfo {
    email: string;
    token: string;
}



// Variable to store the token
let storedToken: string | null = null;

// Save the token to memory
export const saveToken = (userInfo: UserInfo): void => {
    const { token } = userInfo;
    storedToken = token;
};

// Get the token from memory
export const getToken = (): string | null => {
    return storedToken;
};

// Remove the token from memory
export const removeToken = (): void => {
    storedToken = null;
};