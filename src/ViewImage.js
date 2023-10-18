import React, {useState, useEffect} from 'react';

const ViewImage = ({datetimes}) => {
  const [selectDatetime, setSelectedTime] = useState('');
  const [ value, setValue ] = useState(0);

  const ChangeSlider = (arg) => {
    if(datetimes.length > 0) {
      setSelectedTime(datetimes[arg.target.value]);
      setValue(arg.target.value);
    }
  }

  useEffect(() => {
    setSelectedTime(datetimes[0]);
    setValue(0);
  }, [datetimes]);

  return (
    <div className='ViewImage'>
      <img className='image' src='./no_image.png' alt='画像'/><br/>
      <input
        type = 'range'
        className = 'timeSlider'
        min = {0}
        max = {datetimes.length-1}
        step = {1}
        onChange = {ChangeSlider}
        value = {value}
      />

      <p>{selectDatetime}</p>
    </div>
  );
}

export default ViewImage;