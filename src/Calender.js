// 参考 https://qiita.com/FumioNonaka/items/1810f7e211638988af62
import React, {useCallback, useRef, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // pluginは、あとから
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin from "@fullcalendar/interaction";
import "./css/Calender.css"

let event_date = [];

export const Calender = ({GetTimeList, AccessApi, setTimeDates, setPositions, setSelectedTime}) => {
  // const events = useRef([]);
  const calendarRef = useRef(null);
  const [dates, setDates] = useState([]);
  const d = new Date();
  const startDate = useRef(`${d.getFullYear()}-${d.getMonth()+1}-1`);
  const endDate = useRef(`${d.getFullYear()}-${d.getMonth()+2}-1`);

  const GetEvent = async (arg) => {
    const tempStartDate = arg.start;
    const tempEndDate = arg.end;

    startDate.current = `${tempStartDate.getFullYear()}-${tempStartDate.getMonth() + 1}-${tempStartDate.getDate()}`;
    endDate.current = `${tempEndDate.getFullYear()}-${tempEndDate.getMonth() + 1}-${tempEndDate.getDate()}`;

    const URL = `https://ezaki-lab.littlestar.jp/nict/api/get_date.php?start_date=${startDate.current}&end_date=${endDate.current}`;
    event_date = [];
    try {
      const data = await AccessApi(URL);
      for (let i = 0; i < data.length; i++) {
        event_date.push({ title: `${data[i]['data_num']}回分`, date: data[i]['date'] });
      }
      setDates(event_date);
    } catch (error) {
      // エラーハンドリング
    }
  };

  // 日付をクリックした時
  const HandleDateClick = useCallback((arg) => {
    const events_date = event_date.map((item) => {
      return item.date;
    });
    if(events_date.includes(arg.dateStr)) {
      GetTimeList(arg.dateStr);
    }
    else{
      setTimeDates([]);
      setPositions([]);
      setSelectedTime('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 前後の月に移動した時 https://zenn.dev/takky94/articles/7d10cfc95c77de
  const HandleDatesClick = (arg) => {
    GetEvent(arg);
  }

  return(
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" //表示の種類
        locales={allLocales} //全部を日本語化
        locale="ja" //日本語表記
        // イベントを表示 forで配列作って入れ込む?
        events={dates}
        dateClick={HandleDateClick} //日付押したら
        datesSet={HandleDatesClick} //月変えたら
        contentHeight="auto" // 高さを自動調整
      />
    </div>
  )
}