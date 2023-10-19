import React, {useState, useEffect} from 'react';

const ViewImage = ({datetimes, sliderSelectTime, setSliderSelectedTime}) => {
  // const [sliderSelectTime, setSliderSelectedTime] = useState(''); //選択した時間
  const [value, setValue] = useState(0); //スライダーの値
  const [image, setImage] = useState('./no_image.png'); //画像のパス

  // 画像が存在するかの判定
  const CheckImageExists = (imagePath, callback) => {
    const img = new Image();
    img.src = imagePath;
    img.onload = function() {
      callback(true); //画像が存在する場合
    };
    img.onerror = function() {
      callback(false); //画像が存在しない場合
    };
  }

  // 画像を表示する
  const ShowImage = (selectDatetime, value) => {
    setSliderSelectedTime(selectDatetime);
    setValue(value);
    const imagesFolder = selectDatetime.split(' ')[0];
    const imageName = selectDatetime.replace('-', '').replace('-', '').replace(':', '').replace(':', '').replace(' ', '_');
    const imageURL = `https://ezaki-lab.cloud/~nict/api/getImages.php?foldername=${imagesFolder}&filename=${imageName}`;
    CheckImageExists(imageURL, (exists) => {
      if (exists) {
        setImage(imageURL);
      } else {
        setImage('./no_image.png');
      }
    });
  }

  // スライダーを変化させた時
  const ChangeSlider = (arg) => {
    if(datetimes.length > 0) {
      ShowImage(datetimes[arg.target.value], arg.target.value);
    }
  }

  // 画像を別のタブで開く関数
  const openImageInNewTab = () => {
    // 画像を新しいタブで開く
    if(image !== './no_image.png'){
      window.open(image, '_blank');
    }
  };

  useEffect(() => {
    if(datetimes.length > 0) {
      ShowImage(datetimes[0], 0);
    }
    else{
      setSliderSelectedTime('');
      setValue(0);
      setImage('./no_image.png');

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datetimes]);

  return (
    <div className='ViewImage'>
      <a href={() => false} onClick={openImageInNewTab}>
        <img className='image' src={image} alt='画像'/><br/>
      </a>
      <input
        type = 'range'
        className = 'timeSlider'
        min = {0}
        max = {datetimes.length-1}
        step = {1}
        value = {value}
        onChange = {ChangeSlider}
      />
      <p>{sliderSelectTime}</p>
    </div>
  );
}

export default ViewImage;