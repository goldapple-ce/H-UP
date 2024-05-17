const API_URI = {
  BASE: '/api',
  // member
  SIGN_UP: '/member/signup',
  ID_CHECK: '/member/check',
  SHOW_MEMBER_ALL:'/member/all',
  // auth
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  // issue
  ISSUE: '/issue',
  ISSUE_LIST: '/issue/list',
  UPDATE_ISSUE: '/issue/update',
  UPDATE_ISSUE_STATUS: '/issue/status',
  UPDATE_ISSUE_DATE: '/issue/date',
  MY_ISSUE_LIST: '/issue/list',

  // todo
  TODO: '/todo',
  TODO_ASSIGNEE: '/todo/assignee',
  TODO_LIST: '/todo/list',

  //team
  TEAM: '/team',
  TEAM_LIST: '/team/me',
  MY_TEAM_LIST: '/team/me',
  TEAM_MEMBER_LIST: '/team/members',
  SHOW_TEAM: '/team/me',
  SHOW_TEAM_MEMBER: '/team/members',

  //project
  PROJECT: '/project',
  PROJECT_LIST: '/project/list/team',
  PROJECT_MEMBER_LIST: '/project/members',
  SHOW_TEAM_PROJECT: '/project/list/team',
  SHOW_PROJECT_MEMBER : '/project/members',
  INVITE_PROJECT_MEMBER : '/project/member',
  INVITE_TEAM_MEMBER : '/team/members',
  MY_PROJECT_LIST: '/project/list/team',

  // to_do
  TODO: '/todo',
  TODO_ASSIGN: '/todo/assignee',
  TODO_LIST: '/todo/list',

  // agenda
  AGENDA_LIST: '/agenda/list/project',
  // team
  TEAM: '/team',
  // project
  PROJECT: '/project'
};

export default API_URI;
