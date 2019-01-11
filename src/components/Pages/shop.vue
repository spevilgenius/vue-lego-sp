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
// import { loadModules } from 'esri-loader'
var map
export default {
  name: 'shop',
  data: function () {
    return {
      items: [],
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
    
  },
  methods: {
    drawMap: function () {
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

      L.marker([40.088270, -75.391740], { icon: this.redicon }).bindPopup('<div class="redPopupPanel">I am cool right!</div>', { className: 'redPopup'}).addTo(this.emap)

      L.marker([38.863340, -77.060500], { icon: this.blackicon }).bindPopup('<div class="blackPopupPanel">I am cool right!</div>', { className: 'blackPopup' }).addTo(this.emap)

      L.marker([38.640580, -77.295220], { icon: this.redicon }).bindPopup('<div class="redPopupPanel">I am cool right!</div>', { className: 'redPopup' }).addTo(this.emap)

      L.marker([38.917370, -77.220760], { icon: this.blackicon }).bindPopup('<div class="blackPopupPanel">I am cool right!</div>', { className: 'blackPopup' }).addTo(this.emap)
    },
    drawEsri: function () {
      esriLoader.loadModules([
        'esri/Map',
        'esri/views/MapView'
      ])
      .then(([Map, MapView]) => {
        console.log('modules loaded from esri')
        map = new Map({
          basemap: 'streets'
        })

        const view = new MapView({
          container: 'viewDiv',
          map,
          zoom: 3,
          center: [0, 0]
        })

        return view
      })
    },
    setSearchpopup: function () {
      this.$refs['viewmodal'].show()
    },
    hidepopup: function () {
      this.$refs['storemodal'].hide()
    },
    addStore: function () {
      alert('Add Store for point at ' + this.latitude + ', ' + this.longitude)
    }
  },
  async mounted() {
    console.log('component mounted')
    this.drawMap()
    // this.drawEsri()
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
