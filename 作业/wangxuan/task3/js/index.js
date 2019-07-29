

{
    function $(id) {
        return document.getElementById(id);  //获取id工具函数
    }


    let startX;//全局变量开始位置
    let dra_cur = $('drag_cur');//获取拖快
    let drag_text = $('drag_text');//获取拖动验证的文本
    let canvas = $('canvas'); //获取canvas画布
    let tips = $('tips');
    let btn_login = $('btn_login');
    let verifier = $('verifier');
    let btn_close = $('btn_close');
    let ctx = canvas.getContext('2d');
    let block = $('block');
    let block_ctx = block.getContext('2d');
    let dis; //x移动的距离位置

    /********************************图片canvas处理***************************/

    //let img = new Image();
    let img = document.createElement('img');
    img.onload = function(){

        ctx.drawImage(img,0,0);
        block_ctx.drawImage(img, 0, 0, 310, 155)
        let blockWidth = w + r * 2
        let _y = y - r * 2 + 2 // 滑块实际的y坐标
        let ImageData = block_ctx.getImageData(x, _y, blockWidth, blockWidth)
        block.width = blockWidth
        block_ctx.putImageData(ImageData, 0, _y)

    }

    img.src='image/v2.png'
    let x = 180, y = 60, w = 42, r = 10, PI = Math.PI;

    //抠出拼图块
    function draw(ctx,operation) {
        ctx.beginPath()
        ctx.moveTo(x,y)
        ctx.lineTo(x+w/2,y)
        ctx.arc(x+w/2,y-r+2, r,0,2*PI) //
        ctx.lineTo(x+w/2,y)
        ctx.lineTo(x+w,y)
        ctx.lineTo(x+w,y+w/2)
        ctx.arc(x+w+r-2,y+w/2,r,0,2*PI) //
        ctx.lineTo(x+w,y+w/2)
        ctx.lineTo(x+w,y+w)
        ctx.lineTo(x,y+w)
        ctx.lineTo(x,y)
        // ctx.clip()
        ctx.fillStyle = '#fff'
        ctx[operation]()
        ctx.beginPath()
        ctx.arc(x,y+w/2, r,1.5*PI,0.5*PI) // 只需要画正方形内的半圆就行，方便背景图片的裁剪
        ctx.globalCompositeOperation = "xor"
        ctx.fill()
    }
   draw(ctx, 'fill')
   draw(block_ctx, 'clip')
    /*******************************图片canvas处理***********************/

    btn_login.addEventListener('click',function () {
        verifier.style.display='block'
    })
    btn_close.addEventListener("click",function () {
        verifier.style.display='none'

    })

    let mMove = function (event){

        let  mouseX = event.clientX;
             dis = mouseX-startX;
        console.log(dis)
        if ( dis >= 10 && dis <=260){
            dra_cur.style.left=dis+"px";
        }
        if (dis >= 20 && dis<=278){
            block.style.left = dis+"px";
        }

    };


    dra_cur.addEventListener("mousedown",function(event){
        tips.innerHTML=""
        event.preventDefault();
        drag_text.classList.add("hidden-text");
        drag_text.classList.remove('show-text')
        dra_cur.classList.remove("initialize");
        //JQ drag_text.addClass('hidden-text').removeClass('show-text');
        //点击滑块添加 消失文字类;
        startX = event.clientX ; //记录鼠标点下开始的x坐标，相对于窗口;

        document.addEventListener('mousemove',mMove);
    });

    document.addEventListener("mouseup",function(event){

        //如果验证失败 拖快自动回到原始位置,初始化位置,显示文字
        if (dis >=190 && dis <=193){
            tips.innerHTML="验证成功";
            verifier.classList.add('ani-hidden');

        }else {

            tips.innerHTML="验证失败"
            drag_text.classList.add("show-text");
            dra_cur.classList.add("initialize");
            drag_text.classList.remove('hidden-text')
            dra_cur.style.left=12+"px";
            block.style.left = 20+"px";
        }

        // JQ drag_text.addClass('show-text').removeClass('hidden-text');


        // dra_cur.style.left=12+"px";
        //如果验证成功 拖快暂时不变,之后再初始化位置,初始化类;
        document.removeEventListener("mousemove", mMove);
    });

}



