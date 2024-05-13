import { authAxios } from '@api';

export const onLoadMemberData = async () => {
  return await authAxios({
    url: `/calendar`,
    method: 'GET',
    data: { param: {} },
  });
};

export const updateSchedule = async data => {
  return await authAxios({
    url: '/calendar',
    method: 'POST',
    data: { param: data },
  });
};
