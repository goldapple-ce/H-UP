import { api } from "../instance/api";

export const onLoadData = async () => {
    return await api({
        url: "/api/calendar",
        method: "GET",
        data: { param: {} },
    });
};

export const updateSchedule = async (data) => {
    return await api({
        url: "/api/calendar",
        method: "POST",
        data: { param: data },
    });
};