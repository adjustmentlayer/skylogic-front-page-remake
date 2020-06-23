import * as R from 'ramda';

const MSGS = {
  SLIDER_MOUSEWHEEL: 'SLIDER_UP_MOUSEWHEEL',
}

export function sliderMouseWheelMsg(direction){
  return {
    type: MSGS.SLIDER_MOUSEWHEEL,
    direction
  }
} 

function update(msg, model) {
  switch(msg.type){
    case MSGS.SLIDER_MOUSEWHEEL:{
      
      if(msg.direction == 'up'){

        const shiftedSlides =model.slides.splice(-1).concat(model.slides);;
        return {...model, slides: shiftedSlides};

      }
      if(msg.direction == 'down'){

        const shiftedSlides =model.slides.splice(1).concat(model.slides);;
        return {...model, slides: shiftedSlides};


      }
     
    }
    
  }
  return model;
}


export default update;
