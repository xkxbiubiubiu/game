// 单对象编程，
var drawingBoard = {
    cavs: document.getElementById('cavs'),
    ctx: document.getElementById('cavs').getContext('2d'),
    colorchange: document.getElementById('colorchange'),
    lineRuler:document.getElementById('lineRuler'),
    bool: false,
    imgArr:[],
    init: function () {
        this.ctx.lineCap = 'round'//线条起始样式
        this.ctx.lineJoin = 'round'//线条圆滑
        // console.log(this.cavs)
        this.drawing()//绘画
        this.btnsALLfn()
    },
    drawing: function () {
        var self = this
        var cavs = this.cavs
        var c_left = cavs.offsetLeft;
        var c_top = cavs.offsetTop;
        this.cavs.onmousedown = function (e) {
            self.bool = true
            self.ctx.beginPath();
            self.ctx.moveTo(e.pageX - c_left, e.pageY - c_top)
            var imgData = self.ctx.getImageData(0,0,self.cavs.offsetWidth,self.cavs.offsetHeight)
            self.imgArr.push(imgData)
            console.log(self.imgArr)

            this.onmousemove = function (e) {
                if (self.bool) {
                    self.ctx.lineTo(e.pageX - c_left, e.pageY - c_top)
                    self.ctx.stroke();
                }

            }

            this.onmouseup = function () {
                self.ctx.closePath();
                this.onmousemove = null
                self.bool = false;
            }

            this.onmouseleave = function(){
                self.ctx.closePath();
                this.onmousemove = null
                self.bool = false;
            }
        }
    },
    btnsALLfn:function(){
        var self = this;
        this.colorchange.onchange = function(){
            self.ctx.strokeStyle = this.value;
        }
        this.lineRuler.onchange = function(){
            self.ctx.lineWidth = this.value;
        }

        var btnsUlNode = document.getElementsByTagName("ul")[0];
        btnsUlNode.onclick = function(e){
            console.log(e.target.id)
            switch(e.target.id){
                case "clearBoard":
                self.ctx.clearRect(0,0,self.cavs.offsetWidth,self.cavs.offsetHeight)
                break;
                case "eraser":
                self.ctx.strokeStyle = "#f3f3f1"
                break;
                case "rescind":
                if(self.imgArr.length > 0){
                    self.ctx.putImageData(self.imgArr.pop(),0,0)
                }
                break;
            }
        }
    }
}
drawingBoard.init()