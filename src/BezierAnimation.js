
export default class bezierEditor{
    constructor(){
        
        this.bezierEditorDiv = document.createElement('div')
        this.bezierEditorDiv.setAttribute('class','theBezierDiv')
        this.holder = document.createElement('div')
        this.holder.setAttribute('class','boxholder')
        this.mousex,this.mousey,this.mousex1,this.mousey1;
        this.bezierSize = 220
        this.x = 0;
        this.x1 = 0;
        this.y = this.bezierSize;
        this.y1 = this.bezierSize;

        this.bezierValues = [
            this.x/this.bezierSize,
            this.x1/this.bezierSize,
            this.y/this.bezierSize,
            this.y1/this.bezierSize
        ]

        this.xSlide = {
            first:0,
            second:0
        }
        
        this.ySlide = {
            first:0,
            second:0
        }
        this.dotDown = false
        this.dotDown1 = false

        
        this.bezierTextRow = document.createElement('div')
        this.bezierTextRow.setAttribute('class','bezierTextRow')

        this.bezierText = document.createElement('p')
        this.bezierText.textContent =  `Bezier (${parseFloat(this.x/this.bezierSize).toFixed(2)},${parseFloat(this.x1/this.bezierSize).toFixed(2)},${parseFloat(this.y/this.bezierSize).toFixed(2)},${parseFloat(this.y1/this.bezierSize).toFixed(2)})`


        this.bezierTextRow.appendChild(this.bezierText)

        this.bezierEditorDiv.appendChild(this.bezierTextRow)

        this.curveCanvas = document.createElement('canvas')
        this.curveCanvas.setAttribute('class','canvas')


        this.canvasBox = document.createElement('div')
        this.canvasBox.setAttribute('class','canvasBox')
        

        this.canvasBoxCanvas = document.createElement('canvas')
        this.canvasBoxCanvas.setAttribute('class','canvasBoxing')


        this.dot = document.createElement('div')
        this.dot.setAttribute('class','dot')
        this.dot1 = document.createElement('div')
        this.dot1.setAttribute('class','dot1')



        this.canvasBox.appendChild(this.canvasBoxCanvas)
        this.canvasBox.appendChild(this.dot)
        this.canvasBox.appendChild(this.dot1)


        this.holder.appendChild(this.curveCanvas)
        this.holder.appendChild(this.canvasBox)
        this.bezierEditorDiv.appendChild(this.holder)
        document.body.appendChild(this.bezierEditorDiv)
        
        this.size = this.holder.getBoundingClientRect().width 
        this.curveCanvas.width = this.size 
        this.curveCanvas.height = this.size 
        this.canvasBoxCanvas.width = this.size
        this.canvasBoxCanvas.height = this.size


        
        const last_mousex = parseInt(this.curveCanvas.getBoundingClientRect().width+10);
        const last_mousey = parseInt(35);
        const last_mousex1 = parseInt(45);
        const last_mousey1 = parseInt(this.curveCanvas.getBoundingClientRect().height);

        console.log(last_mousex)

        this.last_mousex = last_mousex
        this.last_mousey = last_mousey
        this.last_mousex1 = last_mousex1
        this.last_mousey1 = last_mousey1
       
        this.canvasx = this.holder.getBoundingClientRect().left
        this.canvasy = this.holder.getBoundingClientRect().top

    

        
      this.ctx = this.curveCanvas.getContext('2d')
      this.ctxBox = this.canvasBoxCanvas.getContext('2d')

      this.dot.addEventListener('mousedown',(e)=>{this.dotDown = true})
      this.dot.addEventListener('mouseup',()=>{this.dotDown = false})
      this.dot1.addEventListener('mousedown',(e)=>{this.dotDown1 = true})
      this.dot1.addEventListener('mouseup',()=>{this.dotDown1 = false})



      this.holder.addEventListener('mousemove',(e)=>{

    document.querySelector('.input-title-x').innerHTML  =parseFloat(this.x/this.bezierSize).toFixed(2)
    document.querySelector('.input-title-x1').innerHTML  =parseFloat(this.x1/this.bezierSize).toFixed(2)
    document.querySelector('.input-title-y').innerHTML  =parseFloat(this.y/this.bezierSize).toFixed(2)
    document.querySelector('.input-title-y1').innerHTML  =parseFloat(this.y1/this.bezierSize).toFixed(2)
    this.bezierValues = [
        parseFloat(this.x/this.bezierSize).toFixed(2),
        parseFloat(this.x1/this.bezierSize).toFixed(2),
        parseFloat(this.y/this.bezierSize).toFixed(2),
        parseFloat(this.y1/this.bezierSize).toFixed(2)
    ]

    this.bezierText.textContent =  `Bezier (${parseFloat(this.x/this.bezierSize).toFixed(2)},${parseFloat(this.x1/this.bezierSize).toFixed(2)},${parseFloat(this.y/this.bezierSize).toFixed(2)},${parseFloat(this.y1/this.bezierSize).toFixed(2)})`



        if(this.dotDown === true)
        {
    
            this.mousex = parseInt(e.clientX-this.canvasx);
            this.mousey = parseInt(e.clientY-this.canvasy);
            // console.log(Math.abs((mousey/220)-1.1))
            this.dot.style.left = `${((this.mousex/this.bezierSize)*100)}%`
            this.dot.style.top = `${(this.mousey/this.bezierSize)*100}%`
            
            if(this.xSlide.first < 0) this.xSlide.first = 0;
            else if(this.xSlide.first > 1) this.xSlide.first = 1
            else this.xSlide.first = (this.mousex/this.bezierSize);
            if(this.xSlide.second < 0) this.xSlide.second = 0
            else if(this.xSlide.second > 1) this.xSlide.second = 1
            else  this.xSlide.second =Math.abs((this.mousey/this.bezierSize)-1.1);
           
            
           this.x = parseFloat(this.xSlide.first*this.bezierSize).toFixed(2)
           this.x1 = parseFloat(this.xSlide.second*this.bezierSize).toFixed(2)
           
    
        }
        if(this.dotDown1 === true)
        {
    
            this.mousex1 = parseInt(e.clientX-this.canvasx);
            this.mousey1 = parseInt(e.clientY-this.canvasy);
            // console.log(Math.abs((mousey/220)-1.1))
            this.dot1.style.left = `${((this.mousex1/this.bezierSize)*100)}%`
            this.dot1.style.top = `${(this.mousey1/this.bezierSize)*100}%`
            
            if(this.ySlide.first < 0) this.ySlide.first = 0;
            else if(this.ySlide.first > 1) this.ySlide.first = 1
            else this.ySlide.first = (this.mousex1/this.bezierSize);
            if(this.ySlide.second < 0) this.ySlide.second = 0
            else if(this.ySlide.second > 1) this.ySlide.second = 1
            else  this.ySlide.second =Math.abs((this.mousey1/this.bezierSize)-1.1);
           
            
            this.y= parseFloat(this.ySlide.first*this.bezierSize).toFixed(2)
           this.y1 = parseFloat(this.ySlide.second*this.bezierSize).toFixed(2)
     
        }
    })

    }

    bezierLoop(){


        this.ctx.clearRect(0, 0, this.curveCanvas.width, this.curveCanvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(30, 30);
        this.ctx.bezierCurveTo(this.x,this.x1, this.y,this.y1, this.bezierSize,this.bezierSize);
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = 'black'
        this.ctx.stroke();



        this.ctxBox.clearRect(0, 0, this.curveCanvas.width, this.curveCanvas.height);
        this.ctxBox.beginPath();
        this.ctxBox.strokeStyle ='rgb(72, 132, 253'
        this.ctxBox.moveTo(this.last_mousex,this.last_mousey);
        this.ctxBox.lineTo(this.mousex,this.mousey);
        this.ctxBox.lineWidth = 2;
        this.ctxBox.stroke();
        this.ctxBox.closePath();

        this.ctxBox.beginPath();
        this.ctxBox.strokeStyle = 'rgb(153, 244, 89)'
        this.ctxBox.moveTo(this.last_mousex1,this.last_mousey1);
        this.ctxBox.lineTo(this.mousex1,this.mousey1);
        this.ctxBox.lineWidth = 2;
        this.ctxBox.stroke();
        this.ctxBox.closePath();
    }
}
