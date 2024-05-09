import { atom, selector } from 'recoil';

export const agendaListState = atom({
  key: "agendaListState",
  default: [
    {
        "id": 1,
        "content": "content1",
        "createdAt": "2024-05-07",
        "requester": {
            "id": 4,
            "assigneeId": 4,
            "name": "requester1",
            "img": "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
        },
        "assigneeList": [
        {
            "id": 1,
            "assigneeId": 11,
            "name": "assignee1",
            "img": "https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80",
        },
        {
            "id": 2,
            "assigneeId": 22,
            "name": "assignee2",
            "img": "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
        }
        ],
        "commentList": [
        {
            "commenter": {
            "id": 2,
            "assigneeId": 22,
            "name": "assignee2",
            "img": "https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
            },
            "content": "content2"
        }
        ]
    }, 
    {
        "id": 2,
        "content": "content2",
        "createdAt": "2024-05-07",
        "requester": {
            "id": 4,
            "assigneeId": 4,
            "name": "requester1",
            "img": "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
        },
        "assigneeList": [
        {
            "id": 1,
            "assigneeId": 11,
            "name": "assignee1",
            "img": "https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80",
        },
        {
            "id": 2,
            "assigneeId": 22,
            "name": "assignee2",
            "img": "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
        }
        ],
        "commentList": [
        {
            "commenter": {
            "id": 2,
            "assigneeId": 22,
            "name": "assignee2",
            "img": "https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
            },
            "content": "content2"
        }
        ]
    },
    {
        "id": 3,
        "content": "content3",
        "createdAt": "2024-05-07",
        "requester": {
            "id": 2,
            "assigneeId": 2,
            "name": "requester1",
            "img": "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
        },
        "assigneeList": [
        {
            "id": 3,
            "assigneeId": 11,
            "name": "assignee1",
            "img": "https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80",
        },
        {
            "id": 4,
            "assigneeId": 22,
            "name": "assignee2",
            "img": "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
        }
        ],
        "commentList": [
        {
            "commenter": {
            "id": 2,
            "assigneeId": 22,
            "name": "assignee2",
            "img": "https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
            },
            "content": "content2"
        }
        ]
    }
  ]
})


