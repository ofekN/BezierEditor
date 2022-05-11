import * as transform from './get-transform.js'

export default class BezierAnimation{
     // libary is under Mit license,made by ofek nakar.

    constructor()
    {
        this.animationsTO = []
        this.animationsFROM = []

        this.inActive = false
        document.addEventListener("visibilitychange", (event) => {
            if (document.visibilityState == "visible") {
              this.inActive = false
              console.log('visible')
            } else {
                this.inActive = true
                console.log('invisible')

            }
          });


        this.loop = this.loop.bind(this);
        this.loop()
        this.easing = BezierEasing(0, 0, 1, 0.5);
    }
    to(el,opt)
    {
        if('delay' in opt)
        {
            setTimeout(() => {
                this.animationsTO.push({
                    element:el,options:opt,type:this.checkType(el),easeNum:0,
                })
            }, 1100 * opt.delay);
        }
        else{
            this.animationsTO.push({
                element:el,options:opt,type:this.checkType(el),easeNum:0,
            })
        }
    }
    checkType(el)
    {
     if(el instanceof HTMLElement)
     {
         return 'html';
     }
     else{
         return 'object';
     }

    }
    htmlTween(el,opt,index)
    {
       let duration = 1
       if('duration' in opt) duration = opt.duration
       let miliduration = duration *60
       let increaseBy = 1/miliduration
    //    console.log(increaseBy)
       const startX = el.x || 0
       const startY =el.y || 0
       const startRotate = el.rotate || 0
       const startScale = el.scale || 1
       const startRotateY = el.rotateY || 0
       const startRotateX = el.rotateX || 0
       let endX = startX
       let endY = startY
       let endRotate = startRotate
       let endScale = startScale
       let endRotateX = startRotateX
       let endRotateY = startRotateY

     
    //   let d = transform.getY(el)
    //    console.log(d)

       let betweenNumX,betweenNumY,betweenNumScale,betweenNumRotate,betweenNumRotateX,betweenNumRotateY
       let finalX = startX,finalY = startY,finalScale = startScale,finalRotate = startRotate,finalRotateX = startRotateX,finalRotateY = startRotateY

       if('ease' in opt)
       {
           this.easing = opt.ease
       }
       if('x' in opt)
       {
            endX = opt.x
            betweenNumX = this.checkValues(startX,endX)
       }
       if('y' in opt)
       {
           endY = opt.y
           betweenNumY = this.checkValues(startY,endY)
       }
       if('scale' in opt)
       {
           endScale = opt.scale
           betweenNumScale = this.checkValues(startScale,endScale)
       }
       if('rotate' in opt)
       {
           endRotate = opt.rotate
           betweenNumRotate = this.checkValues(startRotate,endRotate)
       }
       if('rotateX' in opt)
       {
           endRotateX = opt.rotateX
           betweenNumRotateX = this.checkValues(startRotateX,endRotateX)
       }
       if('rotateY' in opt)
       {
           endRotateY = opt.rotateY
           betweenNumRotateY = this.checkValues(startRotateY,endRotateY)
       }

       if(this.animationsTO[index].easeNum < 1)
       {
          
        if(this.inActive === false)
        {
                    
       this.animationsTO[index].easeNum +=increaseBy
    
       if('x' in opt)  finalX = this.transformValues(startX,endX,betweenNumX,this.animationsTO[index].easeNum) ;
       if('y' in opt ) finalY = this.transformValues(startY,endY,betweenNumY,this.animationsTO[index].easeNum);
       if('scale' in opt ) finalScale = this.transformValues(startScale,endScale,betweenNumScale,this.animationsTO[index].easeNum);
       if('rotate' in opt ) finalRotate = this.transformValues(startRotate,endRotate,betweenNumRotate,this.animationsTO[index].easeNum);
       if('rotateX' in opt ) finalRotateX = this.transformValues(startRotateX,endRotateX,betweenNumRotateX,this.animationsTO[index].easeNum);
       if('rotateY' in opt ) finalRotateY = this.transformValues(startRotateY,endRotateY,betweenNumRotateY,this.animationsTO[index].easeNum);


       el.style.transform = 
       `translateY(${finalY}%) 
       translateX(${finalX}%) 
       rotate(${finalRotate}deg) 
       rotateX(${finalRotateX}deg) 
       rotateY(${finalRotateY}deg) 
       scale(${finalScale}) `
        }

       }
       else{
          if('y' in opt)  el.y = endY
          if('x' in opt)  el.x = endX
          if('scale' in opt)  el.scale = endScale
          if('rotate' in opt)  el.rotate = endRotate
          if('rotateX' in opt)  el.rotateX = endRotateX

          this.animationsTO.splice(index,1)
       }

          
   


    }
    checkValues(start,endVal)
    {

        if(Math.sign(start) === 1 || Math.sign(start) === 0 && Math.sign(endVal) === 1 )
        {
                return Math.abs(start-endVal);
            
        }
     
        //senario two +start and 0end
        else if(Math.sign(start) === 1 || Math.sign(start) === 0 && Math.sign(endVal) === 0 )
        {

            return Math.abs(start-endVal)
        }
        //senario three -start and +end
        else if(Math.sign(start) === -1  && Math.sign(endVal) === 1  ||  Math.sign(endVal) === 0)
        {
            return Math.abs(start-endVal)

        }
        //senario four -start and -end
        else if(Math.sign(start) === -1 || Math.sign(start) === 0 && Math.sign(endVal) === -1 )
        {
            return Math.abs(-start+endVal)
        }
 
       
    }

    
    transformValues(start,endVal,betweenNum,easeNum)
    {
        // console.log(Math.sign(endVal))

            //senario one +start and +end
            if(Math.sign(start) === 1 && Math.sign(endVal) === 1 )
            {
                if(start > endVal) return (start - (betweenNum * this.easing(easeNum)))
                else return (start + (betweenNum * this.easing(easeNum)))

          
            }
        
            else if(Math.sign(start) === 0 && Math.sign(endVal) === 1 )
            {
                    return (start + (betweenNum * this.easing(easeNum)))

            }
            //senario two +start and 0end
            else if(Math.sign(start) === 1 || Math.sign(start) === 0 && Math.sign(endVal) === 0 )
            {
                // console.log('wow')
                    return (start - (betweenNum * this.easing(easeNum)))
            }
            //senario three -start and +end
            else if(Math.sign(start) === -1  && Math.sign(endVal) === 1  ||  Math.sign(endVal) === 0)
            {
                    return (start + (betweenNum * this.easing(easeNum)))

            }
            //senario four -start and -end
            else if(Math.sign(start) === -1 || Math.sign(start) === 0  && Math.sign(endVal) === -1 )
            {
            return (start - (betweenNum * this.easing(easeNum)))

            }


       

    }
  
    loop()
    {
        

        if(this.inActive === false) requestAnimationFrame(this.loop)
        else if(this.inActive === true) cancelAnimationFrame(this.loop)
       

        this.animationsTO.forEach((animation,i)=>{
             if(animation.type === 'html')  this.htmlTween(animation.element,animation.options,i,animation.easeNum)
               
              
            
        })

    }


}

