import { authAxios } from '@api';
import API_URI from "@constant/uri";

export const CreateProject = () => {
    return authAxios.post(`${API_URI.PROJECT}`);
}