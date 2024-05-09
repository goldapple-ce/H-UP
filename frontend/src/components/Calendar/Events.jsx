const now = new Date();

export default [
  /* {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2024, 3, 0),
    end: new Date(2024, 3, 1),
  }, */
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2024, 3, 7),
    end: new Date(2024, 3, 10),
    member: 'user1234',
    profile:
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2024, 2, 13, 0, 0, 0),
    end: new Date(2024, 2, 20, 0, 0, 0),
    member: 'user1234',
    profile:
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2024, 10, 6, 0, 0, 0),
    end: new Date(2024, 10, 13, 0, 0, 0),
    member: 'user1234',
    profile:
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
  },

  {
    id: 4,
    title: 'Some Event',
    start: new Date(2024, 3, 9, 0, 0, 0),
    end: new Date(2024, 3, 9, 0, 0, 0),
    allDay: true,
    member: 'user1234',
    profile:
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
  },

  {
    id: 92,
    title: 'Some Other Event',
    start: new Date(2024, 3, 9, 8, 0, 0),
    end: new Date(2024, 3, 10, 11, 30, 0),
    member: 'user1234',
    profile:
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
  },
  {
    id: 5,
    title: 'Conference',
    start: new Date(2024, 3, 11),
    end: new Date(2024, 3, 13),
    desc: 'Big conference for important people',
    member: 'user1234',
    profile:
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
  },
  {
    id: 6,
    title: 'Meeting',
    start: new Date(2024, 3, 12, 10, 30, 0, 0),
    end: new Date(2024, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
    member: 'user1234',
    profile:
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2024, 3, 12, 12, 0, 0, 0),
    end: new Date(2024, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
    memberId: 'good1234',
    profile:
      'https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80',
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2024, 3, 12, 14, 0, 0, 0),
    end: new Date(2024, 3, 12, 15, 0, 0, 0),
    memberId: 'good1234',
    profile:
      'https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80',
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2024, 3, 12, 17, 0, 0, 0),
    end: new Date(2024, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
    memberId: 'good1234',
    profile:
      'https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80',
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2024, 3, 12, 20, 0, 0, 0),
    end: new Date(2024, 3, 12, 21, 0, 0, 0),
    memberId: 'good1234',
    profile:
      'https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80',
  },
  {
    id: 11,
    title: 'Planning Meeting with Paige',
    start: new Date(2024, 3, 13, 8, 0, 0),
    end: new Date(2024, 3, 13, 10, 30, 0),
    memberId: 'good1234',
    profile:
      'https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80',
  },
  {
    id: 11.1,
    title: 'Inconvenient Conference Call',
    start: new Date(2024, 3, 13, 9, 30, 0),
    end: new Date(2024, 3, 13, 12, 0, 0),
    memberId: 'good1234',
    profile:
      'https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80',
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2024, 3, 13, 11, 30, 0),
    end: new Date(2024, 3, 13, 14, 0, 0),
    memberId: 'good1234',
    profile:
      'https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80',
  },
  {
    id: 11.3,
    title: 'Quote Follow-up - Tea by Tina',
    start: new Date(2024, 3, 13, 15, 30, 0),
    end: new Date(2024, 3, 13, 16, 0, 0),
    memberId: 'good1234',
    profile:
      'https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80',
  },
  {
    id: 12,
    title: 'Late Night Event',
    start: new Date(2024, 3, 17, 19, 30, 0),
    end: new Date(2024, 3, 18, 2, 0, 0),
    memberId: 'SayN',
    profile:
      'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 12.5,
    title: 'Late Same Night Event',
    start: new Date(2024, 3, 17, 19, 30, 0),
    end: new Date(2024, 3, 17, 23, 30, 0),
    memberId: 'SayN',
    profile:
      'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2024, 3, 20, 19, 30, 0),
    end: new Date(2024, 3, 22, 2, 0, 0),
    memberId: 'SayN',
    profile:
      'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    memberId: 'SayN',
    profile:
      'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 15,
    title: 'Point in Time Event',
    start: now,
    end: now,
    memberId: 'SayN',
    profile:
      'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 16,
    title: 'Video Record',
    start: new Date(2024, 3, 14, 15, 30, 0),
    end: new Date(2024, 3, 14, 19, 0, 0),
    memberId: 'SayN',
    profile:
      'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 17,
    title: 'Dutch Song Producing',
    start: new Date(2024, 3, 14, 16, 30, 0),
    end: new Date(2024, 3, 14, 20, 0, 0),
    memberId: 'SayN',
    profile:
      'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 18,
    title: 'Itaewon Meeting',
    start: new Date(2024, 3, 14, 16, 30, 0),
    end: new Date(2024, 3, 14, 17, 30, 0),
    memberId: 'SayN',
    profile:
      'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 19,
    title: 'Online Coding Test',
    start: new Date(2024, 3, 14, 17, 30, 0),
    end: new Date(2024, 3, 14, 20, 30, 0),
    memberId: 'SayN',
    profile:
      'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 20,
    title: 'An overlapped Event',
    start: new Date(2024, 3, 14, 17, 0, 0),
    end: new Date(2024, 3, 14, 18, 30, 0),
    memberId: 'SayN',
    profile:
      'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 21,
    title: 'Phone Interview',
    start: new Date(2024, 3, 14, 17, 0, 0),
    end: new Date(2024, 3, 14, 18, 30, 0),
    memberId: 'hard',
    profile:
      'https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 22,
    title: 'Cooking Class',
    start: new Date(2024, 3, 14, 17, 30, 0),
    end: new Date(2024, 3, 14, 19, 0, 0),
    memberId: 'hard',
    profile:
      'https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 23,
    title: 'Go to the gym',
    start: new Date(2024, 3, 14, 18, 30, 0),
    end: new Date(2024, 3, 14, 20, 0, 0),
    memberId: 'hard',
    profile:
      'https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 24,
    title: 'DST ends on this day (Europe)',
    start: new Date(2022, 9, 30, 0, 0, 0),
    end: new Date(2022, 9, 30, 4, 30, 0),
    memberId: 'hard',
    profile:
      'https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 25,
    title: 'DST ends on this day (America)',
    start: new Date(2022, 10, 6, 0, 0, 0),
    end: new Date(2022, 10, 6, 4, 30, 0),
    memberId: 'hard',
    profile:
      'https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 26,
    title: 'DST starts on this day (America)',
    start: new Date(2023, 2, 12, 0, 0, 0),
    end: new Date(2023, 2, 12, 4, 30, 0),
    memberId: 'hard',
    profile:
      'https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
  },
  {
    id: 27,
    title: 'DST starts on this day (Europe)',
    start: new Date(2023, 2, 26, 0, 0, 0),
    end: new Date(2023, 2, 26, 4, 30, 0),
    memberId: 'hard',
    profile:
      'https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
  },
];
