const API_URI = {
  BASE: '/api',
  // member
  SIGN_UP: '/member/signup',
  ID_CHECK: '/member/check',
  // auth
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  // issue
  ISSUE: '/issue',
  ISSUE_LIST: '/issue/list',
  UPDATE_ISSUE_STATUS: '/issue/status',
  UPDATE_ISSUE_DATE: '/issue/date',
  //team
  TEAM_LIST: '/team/me',
  //project
  PROJECT_LIST: '/project/list/team',
  // to_do
  TODO: '/todo',
  TODO_ASSIGNEE: '/todo/assignee',
  TODO_LIST: '/todo/list',
  // agenda
  AGENDA_LIST: '/agenda/list/project',
};

export default API_URI;
