<template>
  <div id="mapwrapper">
    <div class="toolbar" id="toolbar">
      <!--<b-btn v-if="ready" size="sm" @click="addLists">Add Lists</b-btn>-->
      <!--<a class="btn btn-warning" @click="toggleGantt" href="#">Switch To Gantt</a>-->
      <!--<router-link to="/Gantt" class="btn btn-warning">Switch To Gantt</router-link>-->
    </div>
    <div class="map" id="viewDiv"></div>
    <b-modal id="ViewModal" ref="viewmodal" cancel-disabled centered title="Add Store To Stores Map">
      <b-container fluid>
        <div class="popSearch" id="popSearch">
          <b>Latitude: </b>{{latitude}}, <b>Longitude: </b>{{longitude}}<br />
          <a href="#" @click="addStore()">Add Store</a><br />
        </div>
      </b-container>
      <div slot="modal-footer" class="w-100"></div>
    </b-modal>
    <b-modal id="StoreModal" ref="storemodal" cancel-disabled centered :title="title">
      <b-container fluid>
        <div class="popData" id="popData">
          <b>Latitude: </b>{{latitude}}, <b>Longitude: </b>{{longitude}}<br />
          <p>This is where the store details will go</p>
        </div>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <b-btn size="sm" class="float-right" @click="hidepopup">
          Close
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>
<script>
/* eslint-disable */
import JQuery from 'jquery'
// let $ = JQuery
var map, site
export default {
  name: 'shop',
  data: function () {
    return {
      stores: [],
      site: '',
      list: '',
      action: '',
      dlgid: '',
      dlgbody: '',
      title: '',
      map: null,
      latitude: null,
      longitude: null,
      geometry: null,
      feature: null,
      listsexist: false,
      ready: false,
      isdev: true,
      message: null,
      count: 0,
      total: 0,
      emap: null,
      redicon: null,
      blackicon: null
    }
  },
  created: function () {
    var SLASH = "/";
    var tp1 = new String(window.location.protocol);
    var tp2 = new String(window.location.host);
    site = tp1 + SLASH + SLASH + tp2 + _spPageContextInfo.webServerRelativeUrl;
  },
  methods: {
    drawMap: function (stores) {
      this.emap = L.map('viewDiv').setView([36.783862, -76.099385], 7);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.emap);

      this.redicon = L.icon({
        iconUrl: '/sites/dpg/SiteAssets/html/static/img/LegoRed1x1.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, 40],
      })

      this.blackicon = L.icon({
        iconUrl: '/sites/dpg/SiteAssets/html/static/img/LegoBlack1x1.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, 40],
      })

      for (var i = 0; i < stores.length; i++) {
        // var status = recs[i]["RecommendationStatusValue"];
        var lat = stores[i]['Latitude']
        var long = stores[i]['Longitude']
        var cls = stores[i]['ClassName']
        var icon = cls === 'redPopup' ? this.redicon : this.blackicon
        var panel = cls == 'redPopup' ? 'redPopupPanel' : 'blackPopupPanel'
        L.marker([lat, long], { icon: icon }).bindPopup('<div class="' + panel + '">' + stores[i]['Title'] + '<br/>' + stores[i]['Address'] + '</div>', { className: cls }).addTo(this.emap)
      }

      // L.marker([40.088270, -75.391740], { icon: this.redicon }).bindPopup('<div class="redPopupPanel">King of Prussia Mall. 160 N Gulph Rd #1150, King of Prussia, PA 19406, USA</div>', { className: 'redPopup'}).addTo(this.emap)

      // L.marker([38.863340, -77.060500], { icon: this.blackicon }).bindPopup('<div class="blackPopupPanel">Fashion Centre. 4907, 1100 S Hayes St #0G07B, Arlington, VA 22202, USA</div>', { className: 'blackPopup' }).addTo(this.emap)

      // L.marker([38.640580, -77.295220], { icon: this.redicon }).bindPopup('<div class="redPopupPanel">Potomac Mills. 2700 Potomac Mills Cir #767, Woodbridge, VA 22192- 4673, USA</div>', { className: 'redPopup' }).addTo(this.emap)

      // L.marker([38.917370, -77.220760], { icon: this.blackicon }).bindPopup('<div class="blackPopupPanel">Tysons, Tysons Corner Center #7966, McLean, VA 22102- 4500, USA</div>', { className: 'blackPopup' }).addTo(this.emap)
    },
    getStores: function (zurl) {
      if (zurl === null) {
        zurl = site + "/_api/web/lists/getByTitle('Stores')/items?";
        zurl += "$select=Id,Title,Address,Latitude,Longitude,ClassName";
      }
      console.log("STORES URL: " + zurl);
      var vm = this;
      JQuery.ajax({
        url: zurl,
        method: "GET",
        headers: { 'accept': 'application/json; odata=verbose' },
        error: function (jqXHR, textStatus, errorThrown) {
          logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
        },
        success: function (data) {
          vm.stores = vm.stores.concat(data.d.results);
          if (data.d.__next) {
            zurl = data.d.__next;
            vm.getStores(zurl);
          }
          else {
            vm.stores = JQuery.parseJSON(JSON.stringify(vm.stores));
            vm.drawMap(vm.stores);
          }
        }
      })
    }
  },
  async mounted() {
    console.log('component mounted')
    this.getStores(null)
  }
}
</script>
<style scoped>
  #mapwrapper {
    height: 90vh;
    width: 100%;
  }

  #toolbar {
    height: 5vh;
    width: 100%;
  }

  #txtSearch {
    width: 100%;
  }

  #viewDiv {
    height: 85vh;
    width: 100%;
    z-index: 100;
  }

  .panel-body {
    min-height: 100px;
  }

  .widgetbody {
    width: 100%;
    min-height: 100px;
    position: relative;
  }
</style>
