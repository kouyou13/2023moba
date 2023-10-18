import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Map from './Map';
import Calender from './Calender';
import TimeList from './TimeList';
import ViewImage from './ViewImage';
import './css/App.css';


const App = () => {
  // DOMに現れるものをuseState，表れないものをuseRefにする（レンダリングするかしないか）
  const [Positions, setPositions] = useState([]); //緯度経度
  const [centerPositions, setCenterPositions] = useState({ lat: 34.48520833, lng: 136.8251525}); //中心座標
  const [TimeDates, setTimeDates] = useState([]); //開始時間時間
  const [selectedTime, setSelectedTime] = useState(''); //TimeListから選択した時間
  const [datetimes, setDatetimes] = useState([]); //時間
  let tempTimeDates = [];

  // APIからデータ取得
  const AccessApi = async (URL) => {
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log(URL);
      switch (error.response.status) {
        case 400:
          console.log('認証エラーです');
          break;
        case 401:
          console.log('認証エラーです');
          break;
        case 404:
          console.log('URL先がないです');
          break;
        default:
          console.log(error);
      }
      throw error;
    }
  };

  // 指定日の開始時間を取得
  const GetTimeList = async (selectedDate) => {
    // console.log(selectedDate);
    const URL = `https://ezaki-lab.cloud/~nict/api/get_start_data.php?date=${selectedDate}`;
    const res = await AccessApi(URL);
    tempTimeDates = res;
    await setTimeDates(res);
  }

  // 指定日の緯度経度を取得
  const GetPositions = async (checkedTime) => {
    const temp = TimeDates.map((item) => {
      return item.datetime;
    });
    const checkedTimeIndex = temp.indexOf(checkedTime);
    if(checkedTimeIndex !== -1) {
      const startDate = temp[checkedTimeIndex].replace(' ', '_');
      let endDate;
      if(checkedTimeIndex !== temp.length - 1) {
        endDate = temp[checkedTimeIndex + 1].replace(' ', '_');
      }
      else{
        endDate = temp[checkedTimeIndex].replace(' ', '_');
      }
      const URL = `https://ezaki-lab.cloud/~nict/api/get_gps.php?start_date=${startDate}&end_date=${endDate}`;

      if(URL !== ''){
        const res = await AccessApi(URL);
        console.log(res[0]);
        const temp = res.map((item) => {
          return item.datetime;
        });
        setDatetimes(temp);
        res.forEach(function (item) {
          for (var key in item) {
            item[key] = parseFloat(item[key]);
          }
        });
        setPositions(res);
        setCenterPositions(res[0]);
      }
    }
  }

  useEffect(() => {
    (async() => {
      const d = new Date();
      const today = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
      await GetTimeList(today);
      // console.log(tempTimeDates);
      await setTimeDates(tempTimeDates);
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div className="calendar_container">
        <h1>日付選択</h1>
        <Calender GetTimeList={GetTimeList} AccessApi={AccessApi} setTimeDates={setTimeDates} setPositions={setPositions} setSelectedTime={setSelectedTime} setDatetimes={setDatetimes}/>
        <hr/>
        <h1>開始時刻</h1>
        <TimeList TimeDates={TimeDates} GetPositions={GetPositions} selectedTime={selectedTime} setSelectedTime={setSelectedTime}/>
        <hr/>
        <h1>撮影画像</h1>
        <ViewImage datetimes={datetimes}/>
      </div>
      <Map Positions={Positions} centerPositions={centerPositions}/>
    </div>
  );
}

export default App;
