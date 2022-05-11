# BezierEditor
Simple Bezier Curve Editor





# Code Example



    import bezierEditor from './index.js'
        let bezier = new bezierEditor()


        document.addEventListener('click',()=>{
            console.log(bezier.bezierValues)
        })



        function animation(){
        window.requestAnimationFrame(animation)

        bezier.bezierLoop()

        }

        animation()



![Alt Text](https://media.giphy.com/media/gclBNGdjtBTaQG833I/giphy.gif)


