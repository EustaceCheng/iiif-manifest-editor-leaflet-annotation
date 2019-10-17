import React from 'react'
var {connect} = require('react-redux');
/*新增的require*/
var actions = require('actions');

/*新增的小全域變數*/
var manifest,_this;

var LeafletViewer = React.createClass({
	componentDidMount: function() {
		// console.log('componentDidMount');
		this.initLeaflet();
	},
	initLeaflet: function() {
		let id = this.props.config.id ? this.props.config.id : this.props.default_config.id;// html tag div id=leaflet-viewer
		
		/**/
		manifest = this.props.manifestoObject;
        var sequence = manifest.getSequenceByIndex(0);
        var canvas = sequence.getCanvasById(this.props.selectedCanvasId);
		
		var canvasIndex = canvas !== null ? sequence.getCanvasIndexById(canvas.id) : 0;
        var canvasAnnotation = this.props.canvasAnnotation;//start with empty for save new annotation
		this.props.dispatch(actions.setShowMetadataSidebar(true)); //for origin sider bar //uncheck
		var serviceId = ''; 
		serviceId = this.props.config.tileSources[0]; 
        _this = this;			
		/*annolabel*/
		$('#backgroundLabel').remove();
		
		var backgroundLabel = $('<div id = "backgroundLabel" class="scrollbar style-1"><span id="labelClose"> X </span></div>');
		$('body').append(backgroundLabel);
		$('#backgroundLabel').hide();
		
		this.iiif_draw(serviceId, canvas, canvasAnnotation , id);		
	},
		
		
	/*換頁*/
	render: function() {
		
		
		let id = this.props.config.id ? this.props.config.id : this.props.default_config.id
		  
		return (
			<div className="leaflet-viewer col-md-12">
				<div id={id}>
				</div>
			</div>
		);
	},
	/*iiif_draw 舊版套入*/
	iiif_draw: function(serviceId, canvas, canvasAnnotation, id) {
		/*get zoom*/
		for(var zoomtemp = 0 ;zoomtemp<18; zoomtemp++){
			if(Math.max(canvas.__jsonld.width,canvas.__jsonld.height) < 256*Math.pow(2,zoomtemp) ){break;}
		}
		var map = L.map(id, {
			zoom : 13,
			crs : L.CRS.Simple,
			center : [0,0]
		});	
		var iiif_layer = L.tileLayer.iiif(serviceId).addTo(map);
        var drawnItems = L.featureGroup().addTo(map);
		
		L.control.layers({
            "iiif": iiif_layer
        }, {
            'drawlayer': drawnItems,
        }, {
            position: 'topleft',
            collapsed: false
        }).addTo(map);
		map.addControl(new L.Control.Draw({
            
            draw: {
                
                rectangle: true,
                
            }
        }));
		
		/*開始繪圖*/
		var x,y;
		var annoArray=[]
		map.on(L.Draw.Event.DRAWSTART, function(event) {
            $(document).mousemove(function(event) {
                x = event.pageX;
                y = event.pageY;
            });
        });
		var colorArray = ['#000000',
'#696969',
'#808080',
'#A9A9A9',
'#C0C0C0',
'#D3D3D3',
'#DCDCDC',
'#F5F5F5',
'#FFFFFF',
'#FFFAFA',
'#625B57',
'#E6C3C3',
'#BC8F8F',
'#F08080',
'#CD5C5C',
'#A52A2A',
'#B22222',
'#800000',
'#8B0000',
'#E60000',
'#FF0000',
'#FF4D40',
'#FFE4E1',
'#FA8072',
'#FF2400',
'#FF6347',
'#E9967A',
'#FF7F50',
'#FF4500',
'#FFA07A',
'#FF4D00',
'#A0522D',
'#FF8033',
'#A16B47',
'#E69966',
'#4D1F00',
'#FFF5EE',
'#8B4513',
'#D2691E',
'#CC5500',
'#FF7300',
'#FFDAB9',
'#F4A460',
'#B87333',
'#FAF0E6',
'#FFB366',
'#CD853F',
'#704214',
'#CC7722',
'#FFE4C4',
'#F28500',
'#FF8C00',
'#FAEBD7',
'#D2B48C',
'#DEB887',
'#FFEBCD',
'#FFDEAD',
'#FF9900',
'#FFEFD5',
'#CCB38C',
'#996B1F',
'#FFE4B5',
'#FDF5E6',
'#F5DEB3',
'#FFE5B4',
'#FFA500',
'#FFFAF0',
'#DAA520',
'#B8860B',
'#4D3900',
'#E6C35C',
'#FFBF00',
'#FFF8DC',
'#E6B800',
'#FFD700',
'#FFFACD',
'#F0E68C',
'#EEE8AA',
'#BDB76B',
'#E6D933',
'#FFFDD0',
'#FFFFF0',
'#F5F5DC',
'#FFFFE0',
'#FAFAD2',
'#FFFF99',
'#CCCC4D',
'#FFFF4D',
'#808000',
'#FFFF00',
'#FFFF00',
'#697723',
'#CCFF00',
'#6B8E23',
'#9ACD32',
'#556B2F',
'#8CE600',
'#ADFF2F',
'#99E64D',
'#7CFC00',
'#7FFF00',
'#73B839',
'#99FF4D',
'#66FF00',
'#66FF59',
'#F0FFF0',
'#8FBC8F',
'#90EE90',
'#98FB98',
'#36BF36',
'#228B22',
'#32CD32',
'#006400',
'#008000',
'#00FF00',
'#22C32E',
'#16982B',
'#73E68C',
'#50C878',
'#4DE680',
'#127436',
'#A6FFCC',
'#2E8B57',
'#3CB371',
'#F5FFFA',
'#00FF80',
'#00A15C',
'#00FA9A',
'#66CDAA',
'#7FFFD4',
'#0DBF8C',
'#66FFE6',
'#33E6CC',
'#30D5C8',
'#20B2AA',
'#48D1CC',
'#E0FFFF',
'#89CFF0',
'#AFEEEE',
'#2F4F4F',
'#008080',
'#008B8B',
'#00FFFF',
'#AFDFE4',
'#00CED1',
'#5F9EA0',
'#00808C',
'#B0E0E6',
'#006374',
'#ADD8E6',
'#7AB8CC',
'#4798B3',
'#00BFFF',
'#87CEEB',
'#87CEFA',
'#00477D',
'#003153',
'#4682B4',
'#F0F8FF',
'#708090',
'#778899',
'#1E90FF',
'#004D99',
'#007FFF',
'#5686BF',
'#B0C4DE',
'#0047AB',
'#5E86C1',
'#6495ED',
'#4D80E6',
'#003399',
'#082567',
'#002FA7',
'#2A52BE',
'#4169E1',
'#24367D',
'#0033FF',
'#0D33FF',
'#F8F8FF',
'#E6E6FA',
'#CCCCFF',
'#191970',
'#000080',
'#00008B',
'#0000CD',
'#0000FF',
'#5C50E6',
'#483D8B',
'#6A5ACD',
'#7B68EE',
'#6640FF',
'#B399FF',
'#9370DB',
'#6633CC',
'#8674A1',
'#5000B8',
'#B8A1CF',
'#8A2BE2',
'#8B00FF',
'#4B0080',
'#9932CC',
'#9400D3',
'#7400A1',
'#D94DFF',
'#E680FF',
'#BA55D3',
'#E6CFE6',
'#D8BFD8',
'#CCA3CC',
'#DDA0DD',
'#EE82EE',
'#800080',
'#8B008B',
'#FF00FF',
'#F400A1',
'#DA70D6',
'#FFB3E6',
'#B85798',
'#FF66CC',
'#C71585',
'#FF0DA6',
'#FF007F',
'#CC0080',
'#E63995',
'#FF1493',
'#E68AB8',
'#FF80BF',
'#FF69B4',
'#470024',
'#FF73B3',
'#E6005C',
'#FFD9E6',
'#990036',
'#FFF0F5',
'#DB7093',
'#DE3163',
'#FF8099',
'#DC143C',
'#FFC0CB',
'#FFB6C1',
'#FFB3BF',
'#E32636'];
		var anno_latLng_Array=[];
		var tooptip_center_Array=[];
		var leaflet_ids = [];
		if (canvas.__jsonld.otherContent !== undefined) {			
            $.getJSON(canvas.__jsonld.otherContent[0]['@id'], function(annoData) {//這時候才拿annotations
                var mapAidToLid = [];
				annoArray=annoData;				
                $.each(annoData.resources, function(i, value) {
                    var layer,shape;
                    if (typeof value.on === 'object') {
                        //多邊形                       
                    } else {
                        //矩形
                        shape = 'rectangle';
                        var b = /xywh=(.*)/.exec(value.on)[1].split(',');
                        var minPoint = L.point(b[0], b[1]);
                        var maxPoint = L.point(parseInt(b[0]) + parseInt(b[2]), parseInt(b[1]) + parseInt(b[3]));
                        var min = map.unproject(minPoint, zoomtemp);
                        var max = map.unproject(maxPoint, zoomtemp);
						var latLng = L.latLngBounds(min, max);
						var anno_latLng = {};
						var point = [min,max];
						var centerPoint = [(min.lat+max.lat)/2,(max.lng+min.lng)/2]
						layer = L.rectangle(L.latLngBounds(min, max));
                        drawnItems.addLayer(layer);
						anno_latLng={ 
							'bounds':layer.getBounds(),
							'point': point,
							'centerPoint': centerPoint,
							'chars': value.resource.chars,
							'leaflet_id':layer._leaflet_id
						};
						anno_latLng_Array.push(anno_latLng);
						
                    }

                    /**/
                    var mapObject = {
                        'aid': value['@id'],
                        'lid': layer._leaflet_id,
                        'layer': layer._map._layers,
                        'shape': shape,
						'content': value.resource.chars
                    };
					
                    mapAidToLid.push(mapObject);
                    
 
                });
                _this.props.dispatch(actions.setMapAidToLid(mapAidToLid));
            });
        }else{
			console.log('canvas.otherContent is undefined');
		}
			
		/*為annotation添增mousemove事件*/
		map.on('mousemove',function(event){
			var lat = event.latlng.lat;			
			var lng = event.latlng.lng;
			var latLng = event.latlng;
			var point = map.latLngToContainerPoint(latLng);
			var str = '';
			var anno_latLng_array_IDs = [];
			for(var i = 0; i<anno_latLng_Array.length ;i++){
				if(hasAnno(latLng,anno_latLng_Array,i)){
					//mouse is on annotaiton
					anno_latLng_array_IDs.push(i);
					createLabel(i);
					str = anno_latLng_Array[i].chars;
					var div = document.createElement("div");
					if(str!=null){
						
						div.innerHTML = str;
						
					}
					str=div.innerText;
					
					$('#label'+i).html('<a id="tip'+i+'" class="tip"></a><a id=blank></a>'+str);
					$('#tip'+i).css('background-color',colorArray[i*5]);
					
					//L.rectangle(anno_latLng_Array[i].bounds, {color: colorArray[i*5], weight: 1}).addTo(map);
	
					// $('#label'+i).text(anno_latLng_Array[i].chars);
				}else{
					
					$('#label'+i).remove();
				}				
			}
			if(anno_latLng_array_IDs.length!=0){
				// $('#backgroundLabel').html(getLabelChars(anno_latLng_Array,anno_latLng_array_IDs));				
				$('#labelClose').click(function(){$('#backgroundLabel').hide();});
				//關閉label
				
				$('#backgroundLabel').show();	
				
			}else{
				$('#backgroundLabel').hide();	
				
			}
			var midy = ($('#backgroundLabel').height())/2;
			$('#backgroundLabel').css({
			   'left':point.x,'top':point.y-midy 			   
			});
			
			
		});
		
		/* is mousemove on annotation */
		function hasAnno(latLng,anno_latLng_Array,i){
			if((latLng.lat<anno_latLng_Array[i].point[0].lat)&&(latLng.lat>anno_latLng_Array[i].point[1].lat)&&(latLng.lng>anno_latLng_Array[i].point[0].lng)&&(latLng.lng<anno_latLng_Array[i].point[1].lng)){
				return true;
			}else{
				return false;
			}
		}
		
		function createLabel(i){
			if($('#label'+i).length > 0){
				
			}else{
				var label = $('<div id="label'+i+'" class="anno-label scrollbar style-1"></div>');
				
				$('#backgroundLabel').append(label);
			}
			
		}
		// jQuery.fn.exists = function(){ return this.length > 0; }
		function getLabelChars( chars , arr ){
			var str = '';
			for(var i=0;i<arr.length;i++){
				str += chars[arr[i]].chars;
			}
		
			
			return str;
		}
		
		
		
        
	}//iiif_draw end
	
	
	
	
});

LeafletViewer.defaultProps = {  default_config: {
                                    id: 'leaflet-viewer'
                                }
                             }
							 
const propTypes = {
	config: React.PropTypes.object.isRequired
}

LeafletViewer.propTypes = propTypes

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      selectedCanvasId: state.manifestReducer.selectedCanvasId,
      showMetadataSidebar: state.manifestReducer.showMetadataSidebar,
	  /*add props*/
	  mapAidToLid: state.manifestReducer.mapAidToLid,
	  canvasAnnotation: state.manifestReducer.canvasAnnotation,
	  editStatus: state.manifestReducer.editStatus
    };
  }
)(LeafletViewer);