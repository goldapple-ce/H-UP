import { api } from "../instance/api";

export const onLoadMemberData = async (memberId) => {
    return await api({
        url: `${process.env.REACT_APP_API_BASE_URL}/api/issue/list/${memberId}`,
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