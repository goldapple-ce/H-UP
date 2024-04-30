import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Toolbar from './Toolbar';
import events from './Events'

const MyCalendar = () => {
    const [myEvents, setMyEvents] = useState(events)
    const navigate = useNavigate();

    moment.locale('ko-KR');
    const localizer = momentLocalizer(moment);
    const DragAndDropCalendar = withDragAndDrop(Calendar);

    const moveEvent = useCallback(
      ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
        const { allDay } = event
        if (!allDay && droppedOnAllDaySlot) {
          event.allDay = true
        }
  
        setMyEvents((prev) => {
          const existing = prev.find((ev) => ev.id === event.id) ?? {}
          const filtered = prev.filter((ev) => ev.id !== event.id)
          return [...filtered, { ...existing, start, end, allDay }]
        })
      },
      [setMyEvents]
    )
      
    const resizeEvent = useCallback(
      ({ event, start, end }) => {
        setMyEvents((prev) => {
          const existing = prev.find((ev) => ev.id === event.id) ?? {}
          const filtered = prev.filter((ev) => ev.id !== event.id)
          return [...filtered, { ...existing, start, end }]
        })
      },
      [setMyEvents]
    )


    const handleClick = (issue) => {
      navigate(`/issue/${issue.id}`)
    }

    return (
        <DragAndDropCalendar
          style={{ height: 500 }}
          components={{
            toolbar: Toolbar, // 툴바 커스터마이징
          }}
          defaultView={Views.MONTH}
          events={myEvents}
          localizer={localizer}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onSelectEvent={handleClick}
          popup
          resizable
        />
    )
}

export default MyCalendar;