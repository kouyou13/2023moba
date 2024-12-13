import React from 'react'

const TimeList = ({ TimeDates, GetPositions, selectedTime, setSelectedTime }) => {
  // 時間選択
  const SelectRadio = (e) => {
    setSelectedTime(e.target.value)
    // setInterval(() => {
    //   GetPositions(e.target.value);
    // }, 1000);
    GetPositions(e.target.value)
  }

  return (
    <div className="TimeList">
      {TimeDates.length > 0 ? (
        TimeDates.map((time, index) => (
          <label key={index}>
            <input
              type="radio"
              name="time"
              value={time.datetime}
              checked={selectedTime === time.datetime}
              onChange={SelectRadio}
            />
            {time.datetime}から
            <br />
          </label>
        ))
      ) : (
        <p>データがありません</p>
      )}
    </div>
  )
}

export default TimeList
