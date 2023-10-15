import React from "react"

export const TimeList = ({TimeDates, GetPositions, selectedTime, setSelectedTime}) => {
  // 時間選択
  const SelectRadio = (e) => {
    console.log(e.target.value);
    setSelectedTime(e.target.value);
    GetPositions(e.target.value);
  }

  return (
    <div id="TimeList">
      {TimeDates.length > 0 ? (
          TimeDates.map((time, index) => (
            <label key={index}>
              <input
                type="radio"
                name='time'
                value={time.datetime}
                checked={selectedTime === time.datetime}
                onChange={SelectRadio}
              />
              {time.datetime}から<br/>
            </label>))
        ) : (
          <p>データがありません</p>
        )
      }
    </div>
  )
}