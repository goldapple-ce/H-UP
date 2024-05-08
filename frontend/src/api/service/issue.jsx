import { api } from "../instance/api";

export const onLoadData = async (memberId) => {
    return await api({
        url: `${process.env.REACT_APP_API_BASE_URL}/api/issue/list/${memberId}`,
        method: "GET",
        data: { param: {} },
    });
};

export const updateIssue = async (data) => {
    return await api({
        url: "/api/issue/status",
        method: "POST",
        data: { param: data },
    });
};