import { requestUpdateIssue } from '@api/services/issue';
import UserIcon from '@component/common/UserIcon';
import { authState } from '@recoil/auth';
import { MyCalendarState } from '@recoil/calendar';
import { issueState } from '@recoil/issue';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import styles from './Calendar.module.scss';
import Toolbar from './Toolbar';

const Container = styled.div`
  .rbc-addons-dnd {
    .rbc-addons-dnd-row-body {
      position: relative;
    }
    .rbc-addons-dnd-drag-row {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
    .rbc-day-bg {
      &:hover {
        background-color: #eee;
      }
    }
    .rbc-addons-dnd-over {
      background-color: rgba(
        red($date-selection-bg-color),
        green($date-selection-bg-color),
        blue($date-selection-bg-color),
        0.3
      );
    }

    .rbc-event {
      transition: opacity 150ms;
      width: 100%;
      height: 30px;
      &:hover {
        .rbc-addons-dnd-resize-ns-icon,
        .rbc-addons-dnd-resize-ew-icon {
          display: block;
          background-color: #ccc;
        }
      }

      .rbc-event-content {
        font-size: 16px;
        margin: -4px 0 0 -2px;

        img {
          height: 24px;
          width: 24px;
        }
      }
    }

    .rbc-addons-dnd-dragged-event {
      opacity: 0;
    }

    &.rbc-addons-dnd-is-dragging
      .rbc-event:not(.rbc-addons-dnd-dragged-event):not(
        .rbc-addons-dnd-drag-preview
      ) {
      opacity: 0.5;
    }

    .rbc-addons-dnd-resizable {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .rbc-addons-dnd-resize-ns-anchor {
      width: 100%;
      text-align: center;
      position: absolute;
      &:first-child {
        top: 0;
      }
      &:last-child {
        bottom: 0;
      }

      .rbc-addons-dnd-resize-ns-icon {
        display: none;
        border-top: 3px double;
        margin: 0 auto;
        width: 20px;
        cursor: ns-resize;
      }
    }

    .rbc-addons-dnd-resize-ew-anchor {
      position: absolute;
      top: 7px;
      bottom: 0;
      &:first-child {
        left: 0;
      }
      &:last-child {
        right: 0;
      }

      .rbc-addons-dnd-resize-ew-icon {
        display: none;
        border-left: 3px double;
        margin-top: auto;
        margin-bottom: auto;
        height: 20px;
        cursor: ew-resize;
      }
    }
  }
`;

const MyCalendar = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useRecoilState(MyCalendarState);
  const [issueList, setIssueList] = useRecoilState(issueState);
  const [userInfo] = useRecoilState(authState);
  const [myEvents, setMyEvents] = useState();
  const memberId = userInfo.memberId;

  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  // Drag & Drop으로 변경
  const DragAndDropCalendar = withDragAndDrop(Calendar);

  //유즈 로 일정 데이터를 받아옴
  useEffect(() => {
    //  이슈 받아서 변환
    const fetchData = async () => {
      try {
        const adjEvents = issueList.map(data => ({
          ...data,
          start: formatToJSDate(data.startDate),
          end: formatToJSDate(data.endDate),
        }));
        console.log(adjEvents);
        setMyEvents(adjEvents);
      } catch (error) {
        console.log('error fail fetching data at calander : ' + error);
      }
    };

    console.log(issueList);
    if (Array.isArray(issueList) && issueList.length > 0) fetchData();
  }, [issueList]);

  //DB에서 들어오는 DATE 값을 JAVASCRIPT양식으로 바꿔주는 함수
  function formatToJSDate(oracleDateStr) {
    return new Date(oracleDateStr);
  }

  //값을 업데이트함
  // const {
  //   data: dataUpdate,
  //   mutate: mutateUpdate,
  //   isSuccess: isSuccessUpdate,
  // } = useMutation("updateSchedule", updateSchedule);

  //데이터 수정이 완료되면 리패치를 하여 재랜더링
  // useEffect(() => {
  //   if (isSuccessUpdate && dataUpdate) {
  //     refetchOnLoadData();
  //     setOnClickEventData(dataUpdate.param);
  //   }
  // }, [isSuccessUpdate, dataUpdate, refetchOnLoadData]);

  //DB에 넣을 시간양식 재포맷
  const formatToOracleDate = jsDateStr => {
    const date = new Date(jsDateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const formattedMonth = month.toString().padStart(2, '0');
    const day = date.getDate();
    const formattedDay = day.toString().padStart(2, '0');
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    return formattedDate;
  };

  //일정 이동 기능
  const moveEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents(prev => {
        const existing = prev.find(ev => ev.issueId === event.issueId) ?? {};
        const filtered = prev.filter(ev => ev.issueId !== event.issueId);

        const newIssue = {
          issueId: existing.issueId,
          title: existing.title,
          status: existing.status,
          startDate: formatToOracleDate(start),
          endDate: formatToOracleDate(end),
        };

        requestUpdateIssue(newIssue);

        setIssueList([...filtered, { ...existing, ...newIssue }]);

        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents],
  );

  // 일정 리사이즈 기능
  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents(prev => {
        const existing = prev.find(ev => ev.issueId === event.issueId) ?? {};
        const filtered = prev.filter(ev => ev.issueId !== event.issueId);

        const newIssue = {
          issueId: existing.issueId,
          title: existing.title,
          status: existing.status,
          startDate: formatToOracleDate(start),
          endDate: formatToOracleDate(end),
        };

        requestUpdateIssue(newIssue);

        setIssueList([...filtered, { ...existing, ...newIssue }]);

        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents],
  );

  const handleClick = issue => {
    console.log(issue);
    navigate(`/issue/${issue.issueId}`);
  };

  const loadProfileImage = issue => {
    // console.log(issue);
    return (
      <div className={styles.title}>
        <UserIcon
          key={issue.id}
          src={issue.memberInfo.img}
          alt={issue.memberInfo.name}
        />
        <p>{issue.title}</p>
      </div>
    );
  };

  //클릭한 날짜의 정보를 받아옴
  const [handleDate, setHandleDate] = useState();
  const handleDateChange = date => {
    console.log(date);
    setHandleDate(date);
  };
  //클릭한 view의 정보를 받아옴
  const [currentView, setCurrentView] = useState();
  const handleViewChange = newView => {
    setCurrentView(newView);
  };

  // event 색 변경
  const eventStyleGetter = (event, start, end, isSelected) => {
    let newStyle = {
      backgroundColor: 'lightgreen',
      color: 'black',
      borderRadius: '20px',
    };
    if (isChecked && event.memberInfo.id !== memberId) {
      newStyle.display = 'none';
    }
    if (event.memberInfo.id === memberId) {
      newStyle.backgroundColor = 'lightblue';
    }

    return {
      className: '',
      style: newStyle,
    };
  };

  //user id값을 받아와서 다른 캘린더의 정보를 받아올 때 컬러를 변경하도록한다.
  const eventPropGetter = useCallback(
    event => ({
      ...(event.allday != '0'
        ? { style: { backgroundColor: '#616264' } }
        : { style: {} }),
    }),
    [],
  );

  const DateCellContent = props => {
    const { date } = props;
    const dayOfWeek = date.getDay();
    const className = dayOfWeek === 0 ? styles.day_weekend : styles.day_working;

    return <div className={className}>{props.label}</div>;
  };

  //팝업된 일정 이동 기능
  const handleDragStart = useCallback(
    event => {
      setMyEvents(prev => {
        const existing = prev.find(ev => ev.id === event.id) ?? {};
        const filtered = prev.filter(ev => ev.id !== event.id);

        const start = event.start;
        const end = event.end;
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents],
  );

  return (
    <Container>
      <DragAndDropCalendar
        style={{ height: '540px' }}
        components={{
          toolbar: Toolbar,
          month: {
            dateHeader: DateCellContent,
          },
        }}
        eventPropGetter={eventStyleGetter}
        defaultView={Views.MONTH}
        events={myEvents}
        localizer={localizer}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        onSelectEvent={handleClick}
        // onNavigate 에서 가져온 값으로 현재 날짜를 바꿈
        date={handleDate}
        //이번달 이전 다음 에서 가져올 값들
        onNavigate={handleDateChange}
        // view를 바꿀 함수 toolbar에 있는 모든 값을 받을 수 있다.
        onView={handleViewChange}
        //보여질 화면
        view={currentView}
        popup
        resizable
        selectable
        handleDragStart={handleClick}
        titleAccessor={loadProfileImage}
      />
    </Container>
  );
};

export default MyCalendar;
