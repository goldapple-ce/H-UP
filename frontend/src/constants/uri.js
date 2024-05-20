const API_URI = {
  BASE: '/api',
  // member
  SIGN_UP: '/member/signup',
  ID_CHECK: '/member/check',
  SHOW_MEMBER_ALL: '/member/all',
  // auth
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  // issue
  ISSUE: '/issue',
  ISSUE_LIST: '/issue/list',
  UPDATE_ISSUE: '/issue/update',
  //team
  TEAM: '/team',
  TEAM_LIST: '/team/me',
  TEAM_MEMBER_LIST: '/team/members',
  //project
  PROJECT: '/project',
  PROJECT_LIST: '/project/list/team',
  PROJECT_MEMBER_LIST: '/project/members',
  PROJECT_INVITE_MEMBER: '/project/member',

  // to_do
  TODO: '/todo',
  TODO_ASSIGN: '/todo/assignee',
  TODO_LIST: '/todo/list',

  // agenda
  AGENDA_LIST: '/agenda/list/project',
  AGENDA: '/agenda',
  AGENDA_ASSIGNEE: '/agenda/assignee',
};

export default API_URI;
