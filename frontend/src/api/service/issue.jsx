import { api } from "../instance/api";

export const LoadIssueList = async (memberId) => {
    memberId = 1; // 테스트 코드

    return await api({
        url: `/issue/list/${memberId}`,
        method: "GET",
        data: { param: {} },
    });
};

export const LoadIssueData = async (id) => {

    return await api({
        url: `/issue/${id}`,
        method: "GET",
        data: { param: {} },
    });
};

export const updateIssue = async (data) => {
    return await api({
        url: "/issue/status",
        method: "POST",
        data: { param: data },
    });
};