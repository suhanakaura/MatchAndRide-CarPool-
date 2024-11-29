const baseUrl = "http://localhost:4007/api/v1"

export const postRequest = async(url, body = null) => {
    try {
        const response = await fetch(`${baseUrl}/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body ? body : null,
            credentials: "include"
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Error Response:", errorResponse);
            return { error: true, message: errorResponse.message || "Something went wrong" };
        }

        const data = await response.json();
        console.log("Response Data:", data);
        return data;
    } catch (error) {
        console.error("Network Error:", error.message);
        return { error: true, message: error.message || "An unexpected error occurred." };
    }
};

export const putRequest = async(url, body) => {
    try {
        const response = await fetch(`${baseUrl}/${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: body,
            credentials: "include"
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Network Error:", error.message);
        return { error: true, message: error.message || "An unexpected error occurred." };
    }
};

export const getRequest = async(url)=>{
    try{
        const response = await fetch(`${baseUrl}/${url}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            },
            credentials:"include"
        })
        const data = await response.json();
        return data;
    }
    catch(error){
        return { error: true, message: error.message || "An unexpected error occurred." };

    }
}
