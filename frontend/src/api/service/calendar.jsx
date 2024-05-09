import { api } from "../instance/api";

export const onLoadMemberData = async () => {
    return await api({
        url: `/calendar`,
        method: "GET",
        data: { param: {} },
    });
};

export const updateSchedule = async (data) => {
    return await api({
        url: "/calendar",
        method: "POST",
        data: { param: data },
    });
};