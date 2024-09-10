
const API_URL = 'http://localhost:5000/api'; 


async function apiRequest(endpoint, method = 'GET', data = null, token = null) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    try {
        //console.log("${API_URL}${endpoint}");
        //console.log(config);
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || result.message || 'Something went wrong');
        }

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Auth 

export async function registerUser(userData) {
    return await apiRequest('/auth/register', 'POST', userData);
}

export async function loginUser(credentials) {
    return await apiRequest('/auth/login', 'POST', credentials);
}

// Password Reset
export async function requestPasswordReset(email) {
    return await apiRequest('/password-tokens/request', 'POST', { email });
}

export async function verifyPasswordToken(token) {
    return await apiRequest('/password-tokens/verify', 'POST', { token });
}

export async function resetPassword(token, newPassword) {
    return await apiRequest('/password-tokens/reset', 'POST', { token, password: newPassword });
}

// Users
export async function getAllUsers(token) {
    return await apiRequest('/users', 'GET', null, token);
}

// export async function getUserById(userId, token) {
//     return await apiRequest(`/users/${userId}`, 'GET', null, token);
// }

export async function getUserType(token) {
    return await apiRequest('/users/user-type', 'GET', null, token);
  }

  
export async function getUserById(userId) {
    const token = localStorage.getItem('token'); 
    return await apiRequest(`/users/${userId}`, 'GET', null, token);
}

export async function createUser(userData, token) {
    return await apiRequest('/users', 'POST', userData, token);
}

export async function updateUser(userId, updatedData, token) {
    return await apiRequest(`/users/${userId}`, 'PUT', updatedData, token);
}

export async function deleteUser(userId, token) {
    return await apiRequest(`/users/${userId}`, 'DELETE', null, token);
}

// Shows
// export async function getAllShows() {
//     return await apiRequest('/shows', 'GET');
// }

export async function getPagingShows(page = 1, limit = 10) {
    return await apiRequest(`/shows?page=${page}&limit=${limit}`, 'GET'); // limit = number of shows per page
}

export async function getShowById(showId) {
    return await apiRequest(`/shows/${showId}`, 'GET');
}

export async function getManagerShows(token) {
    return await apiRequest('/shows/manager', 'GET', null, token);
}

export async function createShow(showData, token) {
    console.log(showData)
    return await apiRequest('/shows', 'POST', showData, token);
}

export async function updateShow(showId, updatedData, token) {
    return await apiRequest(`/shows/${showId}`, 'PUT', updatedData, token);
}

export async function deleteShow(showId, token) {
    return await apiRequest(`/shows/${showId}`, 'DELETE', null, token);
}

// Tickets
export async function getAllTickets(token) {
    return await apiRequest('/tickets', 'GET', null, token);
}

export async function getUserTickets(token) {
    return await apiRequest('/tickets/user', 'GET', null, token); 
  }

export async function getTicketById(ticketId, token) {
    return await apiRequest(`/tickets/${ticketId}`, 'GET', null, token);
}

export async function createTicket(ticketData, token) {
    return await apiRequest('/tickets', 'POST', ticketData, token);
}

export async function updateTicket(ticketId, updatedData, token) {
    return await apiRequest(`/tickets/${ticketId}`, 'PUT', updatedData, token);
}

export async function deleteTicket(ticketId, token) {
    return await apiRequest(`/tickets/${ticketId}`, 'DELETE', null, token);
}

// Places 
export async function getAllPlaces() {
    return await apiRequest('/places', 'GET');
}

export async function getPlaceById(placeId) {
    return await apiRequest(`/places/${placeId}`, 'GET');
}

export async function createPlace(placeData, token) {
    return await apiRequest('/places', 'POST', placeData, token);
}

export async function updatePlace(placeId, updatedData, token) {
    return await apiRequest(`/places/${placeId}`, 'PUT', updatedData, token);
}

export async function deletePlace(placeId, token) {
    return await apiRequest(`/places/${placeId}`, 'DELETE', null, token);
}

