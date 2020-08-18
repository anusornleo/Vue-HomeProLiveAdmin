(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ed13ba2"],{"090b":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"flex flex-wrap items-start justify-between"},[a("h1",{staticClass:"text-3xl mb-6"},[e._v("Start to Live")]),a("div",{staticClass:"text-xl items-baseline cursor-pointer bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 text-white",on:{click:e.goLiveNow}},[e._v(" Start Live "),a("span",{staticClass:"material-icons",staticStyle:{"vertical-align":"bottom","margin-bottom":"6px"}},[e._v("live_tv")])])]),a("div",{staticClass:"flex flex-row"},[e._m(0),a("div",{staticClass:"w-2/3 flex flex-wrap content-between ml-10"},[a("div",{staticClass:"w-1/4 text-xl"},[e._v("Title")]),a("div",{staticClass:"w-3/4"},[a("el-input",{attrs:{placeholder:"Please input"},model:{value:e.modelTitle,callback:function(t){e.modelTitle=t},expression:"modelTitle"}})],1),a("div",{staticClass:"w-1/4 text-xl"},[e._v("Camera")]),a("div",{staticClass:"w-3/4"},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Select"},model:{value:e.currentCamera,callback:function(t){e.currentCamera=t},expression:"currentCamera"}},e._l(e.cameras,(function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e}})})),1)],1),a("div",{staticClass:"w-1/4 text-xl"},[e._v("Microphone")]),a("div",{staticClass:"w-3/4"},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Select"},model:{value:e.currentMicrophone,callback:function(t){e.currentMicrophone=t},expression:"currentMicrophone"}},e._l(e.microphones,(function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e}})})),1),a("div",{staticClass:"w-full h-10 mt-5"},[a("el-progress",{attrs:{percentage:e.volumeTest,color:e.customColorMethod,"show-text":!1}})],1)],1)])]),a("div",{staticClass:"flex flex-wrap items-center justify-between"},[a("h1",{staticClass:"text-3xl my-3"},[e._v("Product in Live (12)")]),a("div",{staticClass:"text-xl my-3 items-baseline cursor-pointer bg-green-400 px-5 py-2 rounded-full hover:bg-green-500 text-white",on:{click:e.goFindProduct}},[e._v("Add + ")])]),a("div",{staticClass:"flex flex-wrap"},e._l(e.mockProduct,(function(e){return a("CardProduct",{key:e.id,attrs:{productData:e}})})),1)])},c=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"w-1/3"},[a("div",{staticClass:"player w-full",attrs:{id:"pre-local-player"}})])}],i=(a("d3b7"),a("3ca3"),a("ddb0"),a("3835")),o=(a("96cf"),a("1da1")),s=a("d13a"),n=a("e671"),l=a.n(n),u=a("9294"),d=a("8aa5"),m=a.n(d),p=m.a.firestore(),h={name:"StartLivePage",components:{CardProduct:u["a"]},data:function(){return{mockProduct:[{sku:12324,image:"url",brand:"brand",title:"title",price:12334}],modelTitle:"",currentCamera:null,currentMicrophone:null,currentResolution:null,cameras:[],microphones:[],localTracks:{videoTrack:null,audioTrack:{getVolumeLevel:function(){return 0}}},resolutions:[{label:"720x1280 15p"},{label:"720x1280 30p"}]}},beforeCreate:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l.a.getCameras();case 2:return e.cameras=t.sent,t.next=5,l.a.getMicrophones();case 5:return e.microphones=t.sent,t.next=8,Promise.all([l.a.createMicrophoneAudioTrack(),l.a.createCameraVideoTrack()]);case 8:a=t.sent,r=Object(i["a"])(a,2),e.localTracks.audioTrack=r[0],e.localTracks.videoTrack=r[1],e.localTracks.videoTrack.play("pre-local-player"),0===e.cameras.length?e.currentCamera="No Camera":e.currentCamera=e.cameras[0],0===e.microphones.length?e.currentMicrophone="No Microphone":e.currentMicrophone=e.microphones[0];case 15:case"end":return t.stop()}}),t)})))()},methods:{customColorMethod:function(e){return e<30?"#cbd5e0":e<70?"#38a169":"#f56565"},goLiveNow:function(){var e=this;this.$store.commit("setCurrentOption",{appId:s["a"],camera:this.currentCamera,microphone:this.currentMicrophone,channel:this.modelTitle}),this.$store.commit("setIsLive",!0),p.collection("CurrentLive").doc(this.modelTitle).set({startTime:Date.now(),channelName:this.modelTitle}).then((function(){e.$notify({title:"Success",message:"Start Live Success",type:"success"}),e.$router.push({path:"live_now"})})).catch((function(t){e.$notify({title:"Error",message:t,type:"error"})}))},goFindProduct:function(){this.getVideo(),this.$router.push({path:"findproduct"})},getVideo:function(){var e=document.getElementsByTagName("video");e[0].addEventListener("loadedmetadata",(function(e){console.log("e = "+e)}),!1)}},computed:{volumeTest:function(){return 100*this.localTracks.audioTrack.getVolumeLevel()}},watch:{currentCamera:function(e){this.currentCamera=e,this.localTracks.videoTrack.setDevice(e.deviceId)},currentMicrophone:function(e){this.currentMicrophone=e,this.localTracks.audioTrack.setDevice(e.deviceId)}}},v=h,f=(a("8808"),a("2877")),x=Object(f["a"])(v,r,c,!1,null,"37d01feb",null);t["default"]=x.exports},2272:function(e,t,a){},8808:function(e,t,a){"use strict";var r=a("2272"),c=a.n(r);c.a},9294:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"w-1/5 h-80 p-2 text-center shadow-md mb-10 rounded-lg hover:bg-white_active cursor-pointer"},[a("h3",{staticClass:"text-info"},[e._v("SKU : "+e._s(e.productData.sku))]),a("img",{staticClass:"my-3",attrs:{src:"https://pht.qoo-static.com/-tinv3wt-7QR6cNYu3fLw5ySktJ0Mb5iydk5QIAPphFkvBuE-xwFuxsy57IGY5lVSQM=w300",alt:"image"}}),a("h3",{staticClass:"text-info"},[e._v(e._s(e.productData.brand))]),a("h3",[e._v(e._s(e.productData.title))]),a("h1",[e._v(e._s(e.productData.price))])])},c=[],i={name:"CardProduct",props:["productData"],data:function(){return{id_sku:null}}},o=i,s=a("2877"),n=Object(s["a"])(o,r,c,!1,null,null,null);t["a"]=n.exports}}]);
//# sourceMappingURL=chunk-3ed13ba2.59b32f4d.js.map