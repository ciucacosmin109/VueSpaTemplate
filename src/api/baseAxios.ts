import { showToast } from "@/plugins/toaster/toaster";
import { ToastType } from "@/stores/toast";
import axios from "axios";
import userManager from "./authApi";

const baseAxios = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
});

export const loadingStartedEvent = () => new CustomEvent("lodingStarted");
export const loadingStoppedEvent = () => new CustomEvent("lodingStopped");

// Add a request interceptor
baseAxios.interceptors.request.use(
    async config => {
        // Global loading event
        dispatchEvent(loadingStartedEvent());

        // Auth
        const user = await userManager.getUser();
        if (user) {
          const authToken = user.access_token;
          if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
          }
        } 

        return config;
    }, 
    error => {
        // Global loading event
        dispatchEvent(loadingStoppedEvent());

        return Promise.reject(error);
    }
);

// Add a response interceptor
baseAxios.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        
        // Global loading event
        dispatchEvent(loadingStoppedEvent());

        return response;
    }, 
    error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        
        // Global loading event
        dispatchEvent(loadingStoppedEvent());

        // Errors
        switch(error?.response?.status) {
            case 401:
                showToast("You must be logged-in to be able to do this", ToastType.Unauthorized); 
                // TODO: Redirect to login
                break;
            
            case 403:
                showToast("You are not authorized to do this", ToastType.Unauthorized);
                break;
                
            case 400:
                showToast(error?.response?.data?.message ?? "Unknown error", ToastType.Error);
                break;
            
            case 500:
                showToast(error?.response?.data?.message ?? "Internal server error", ToastType.Exception); 
                break;

            default:
                showToast(error?.message ?? error?.code ?? "Error", ToastType.Exception);
                break;
        }
        
        return Promise.reject(error);
    }
);

export default baseAxios;