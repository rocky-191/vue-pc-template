<template>
   <div :id = "map" style="width:100%; height:100%;">

   </div>
</template>

<script>
  export default {
    name : 'publicGisMap',
    props : ['markList','map','dialogPid','pageAdd','isPanToPoint'],
    data(){
      return{
        later_lptjd : '',
        _mTempLayer : '',
        _mMap : '',
        createPointByXY : '',
        markListAdd : [],
      }
    },
    created(){
      
    },
    methods:{
      onLoad(){
        this._mMap = new DPS.Map(document.getElementById(this.map)); // 绑定生成地图

        // 地图加载完成后事件
        this._mMap.onViewLoadEvent(this, this.testonViewLoadEvent);

        this._mMap.onMouseClickEvent(this, this.getGeoPoint); // 地图点击事件

      },
      // 加载完成后事件
      testonViewLoadEvent(sender, eArgs){
        //解决vue style编译问题
        Function.prototype.bind = function() {
          const thats = this, 
          context = [].shift.call(arguments), 
          args = [].slice.call(arguments); 
          return function() {
            return thats.apply(context, [].concat.call(args, [].slice.call(arguments)));
          }
        };
        let that = this;
        var me = sender;
        me._mTempLayer = "test001";
        me._mMap.onHighlightElementClickEvent(me, this.onHighlightElementClick); // 测试事件 - 在元素上单击触发的事件


        that.setPointMarkMap();  // 根据坐标生成标点
      },
      setPointMarkMap(){
        let that = this;
        let data = [];
        if(this.pageAdd){
          data = this.markListAdd ? this.markListAdd : [];
        }else{
          data = this.markList ? this.markList : [];
        }
        let pointList = '';
        let arr = [];
        let markArr = [];
        if(data.length == 0){
            // 移除图层
          var layer = that.getElementLayer('later_lptjd');
          that._mMap.removeLayer(layer);
          that._mMap.refresh();
          return false;
        }

        let layercc = that.getElementLayer('later_lptjd');
        if(layercc){
          that._mMap.removeLayer(layercc);
        }
        that.later_lptjd = DPS.Factory.createElementLayer('later_lptjd');
        this._mMap.addLayer(that.later_lptjd);
        for(let i=0; i<data.length; i++){
          let str = data[i]._mX + ' ' + data[i]._mY;
          arr.push(str)
        }
        for(let j=0; j<arr.length; j++){
          var strShape = arr[j];
          pointList = "Point(" + strShape + ')';
          var geo = DPS.Factory.createGeometry(pointList);
          var marker = DPS.Factory.createMarkerElement();
          marker.setAttributes(data[j].pid);
          marker.setGeometry(geo);
          let url = '';  // 图标URL
          if(data[j].url){
            url = data[j].url;
          }else{
            url = "../../../static/images/map/expert/map-natural.png";
          }
          // 正常样式
          var tempNormalSymbol = marker.getNormalSymbol();
          tempNormalSymbol.setUrl(url);
          tempNormalSymbol.setWidth(32);
          tempNormalSymbol.setHeight(32);

          // 高亮样式
          var tempHighlightSymbol = marker.getHighlightSymbol();
          tempHighlightSymbol.setUrl(url);
          tempHighlightSymbol.setWidth(64);
          tempHighlightSymbol.setHeight(64);
          this.later_lptjd.addElement(marker);
          markArr.push(marker)
          
        }

        // 是否平移中心点
        if(this.isPanToPoint){
          var point = DPS.Factory.createPointByXY(this.markList[0]._mX, this.markList[0]._mY);
          this._mMap.panToPoint(point);
        }
          // 地图刷新
        this._mMap.refresh();
      },
      //构造图层，如果存在直接使用，不存在直接构造
      getElementLayer(name){
        var tempLayer = null;
        // 先取图层
        tempLayer = this._mMap.getLayerByName(name);
        if (!tempLayer) {
          // 图层不存在，构造后使用
          tempLayer = DPS.Factory.createElementLayer(name);
          this._mMap.addLayer(tempLayer);
        }
        return tempLayer;
      },
      // 生成的坐标的点击回调
      onHighlightElementClick(sender, eArgs){
        console.log(sender)
        console.log(eArgs)
        console.log(eArgs.getAttributes())
        console.log(eArgs.getPoint())
        if(document.getElementsByClassName('dialogs').length == 0){
          return false;
        }
        this.$emit('dialogDetails', eArgs.getAttributes())
        // 获取父组件的弹窗组件
        var me = sender;
        var offsetGeoPoint = eArgs.getPoint();
        // opt 气泡样式
        var opt = {
          size : new DPS.Size(500,300), //infowindow大小
          isAdjustPositon : true, //infoWIndow是否自适应，即infoWindow总会自动调整到视野范围内
          offsetSize : new DPS.Size(0,0) //infoWindow箭头偏移大小
        }
        setTimeout(function(){
          var testHtml = document.getElementsByClassName('dialogs')[0].innerHTML;
          me._mMap.openInfoWindowHtml(offsetGeoPoint, testHtml, opt);
        },500)
      },
      // 点击地图回调
      getGeoPoint(self, eArgs){
        console.log(self)
        console.log(eArgs)
        console.log(this._mMap.getMapLevel())
        let position = {
          lng : eArgs._mGeoPoint._mX,
          lat : eArgs._mGeoPoint._mY,
          level : this._mMap.getMapLevel() // 比例尺级别
        }
        this.$emit('getPoint', position); // 父组件接受坐标方法
        if(this.pageAdd){
          this.markListAdd = [];
          this.markListAdd.push({
            _mX : eArgs._mGeoPoint._mX,
            _mY : eArgs._mGeoPoint._mY,
            pid : ''
          })
          this.setPointMarkMap();
        }
      },
    },
    mounted(){
      
      this.onLoad();
    },
    components : {
    },
    watch: {
      markList: {
        handler: function(val, oldVal) {
          if(this.markList){
            this.markListAdd = this.markList;
          }
          this.setPointMarkMap();
          this._mMap.closeInfoWindow();
        },
      },
      dialogPid: {
        handler: function(val, oldVal){
          var layer = this.getElementLayer('later_lptjd');
          let data = this.markList ? this.markList : [];
          let that = this;
          let offsetGeoPoint = '';
          console.log(this.dialogPid)
          for(let i=0; i<data.length; i++){
            if(this.dialogPid == layer.getElementByIndex(i).getAttributes()){
              offsetGeoPoint = layer.getElementByIndex(i).getGeometry();
            }
          }
          var opt = {
            size : new DPS.Size(500,300), //infowindow大小
            isAdjustPositon : true, //infoWIndow是否自适应，即infoWindow总会自动调整到视野范围内
            offsetSize : new DPS.Size(0,0) //infoWindow箭头偏移大小
          }
          setTimeout(function(){
            var testHtml = document.getElementsByClassName('dialogs')[0].innerHTML;
            that._mMap.openInfoWindowHtml(offsetGeoPoint, testHtml, opt);
          },500)
        }
      }
    }
  }
</script>

<style scoped lang = "css">
/* #map{
  width:100%;
  height:100%;
} */
</style>



