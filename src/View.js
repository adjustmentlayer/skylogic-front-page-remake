
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
const WheelIndicator = require('wheel-indicator');

import { 
  sliderMouseWheelMsg,
} from './Update';

const { div,a, pre } = hh(h);


// Обработчик события
function wheel(event) {
  var delta; // Направление скролла
  // -1 - скролл вниз
  // 1 - скролл вверх
  event = event || window.event;
  // Opera и IE работают со свойством wheelDelta
  if (event.wheelDelta) {
  delta = event.wheelDelta / 120;
  // В Опере значение wheelDelta такое же, но с противоположным знаком
  if (window.opera) delta = -delta;
  // В реализации Gecko получим свойство detail
  } else if (event.detail) {
  delta = -event.detail / 3;
  }
  // Запрещаем обработку события браузером по умолчанию
  if (event.preventDefault) event.preventDefault();
  event.returnValue = false;
  return delta > 0 ? "up": "down";
}



function slideView(filteredSlides, className, position){
  return a(
    {
      href: filteredSlides[position].link, 
      target:"_blank", 
      title:"Посмотреть исходный код"
    },
    div({
      className,
      style:`background-image:url(images/${filteredSlides[position].src});background-size:cover`,
    }),
  );
}





function getSlides(model){
  
  const filteredSlides = model.slides;
  
  
  if(filteredSlides.length == 1){
    const slides = [
      slideView(filteredSlides,'mw6 h5 center z-3 relative shadow-1',0),
    ];
    return slides;
  }

  if(filteredSlides.length == 2){
    const slides = [
      slideView(filteredSlides,'mw6 h5 center z-3 relative shadow-1',0),
      slideView(filteredSlides,'w6 mw6 h5 z-2 right-4 absolute top-0 narrow-75 shadow-1',1),
    ];
    return slides;
  }

  if(filteredSlides.length == 3){
    const slides = [
      slideView(filteredSlides,'w6 mw6 h5 z-2 left-4 absolute top-0 narrow-75 shadow-1',0),
      slideView(filteredSlides,'mw6 h5 center z-3 relative shadow-1',1),
      slideView(filteredSlides,'w6 mw6 h5 z-2 right-4 absolute top-0 narrow-75 shadow-1',2),
    ];
    return slides;
  }

  if(filteredSlides.length == 4){
    const slides = [
      slideView(filteredSlides,'w6 mw6 h5 z-2 left-4 absolute top-0 narrow-75 shadow-1',0),
      slideView(filteredSlides,'mw6 h5 center z-3 relative shadow-1',1),
      slideView(filteredSlides,'w6 mw6 h5 z-2 right-4 absolute top-0 narrow-75 shadow-1',2),
      slideView(filteredSlides,'w6 mw6 h5 z-1 right--4 absolute top-0 narrow-50 shadow-1',3),
    ];
    return slides;
  }

  if(filteredSlides.length >= 5){
    const slides = [
      slideView(filteredSlides,'w-80 mw6 h5 z-1 left--4 absolute top-0 narrow-50 shadow-1',1),
      slideView(filteredSlides,'w-80 mw6 h5 z-2 left-4 absolute top-0 narrow-75 shadow-1',2),
      slideView(filteredSlides,'w-90 w-70-l w-60-m w-50-ns mw6 h5 center z-3 relative shadow-1',3),
      slideView(filteredSlides,'w-80 mw6 h5 z-2 right-4 absolute top-0 narrow-75 shadow-1',4),
      slideView(filteredSlides,'w-80 mw6 h5 z-1 right--4 absolute top-0 narrow-50 shadow-1',0),
    ];
    return slides;
  }
}


function slider(dispatch, model){
  
  return div(
    {
        className:"relative ",
        onmousewheel: e => dispatch(sliderMouseWheelMsg(wheel(e)), model),
    },[
      getSlides( model),
    ]);
}

function view(dispatch, model) {
  
  return div({ className: 'mw8 center' }, [
    slider(dispatch, model)
  ]);
}

export default view;
