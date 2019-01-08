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
import { loadModules } from 'esri-loader'
var instance = null
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
      total: 0
    }
  },
  created: function () {
    instance = this
  },
  methods: {
    drawMap: function () {
      var test = typeof window.require.on
      console.log('typeof test: ' + test)
      loadModules([
        'esri/Map',
        'esri/views/MapView'
      ], {
          // use a specific version instead of latest 4.x
          url: 'https://js.arcgis.com/4.10/'
        }).then(([Map, MapView]) => {
          console.log('Modules loaded!')
          map = new Map({
            basemap: 'streets'
          })

          const view = new MapView({
            container: 'viewDiv',
            map,
            zoom: 3,
            center: [0, 0] // longitude, latitude
          })
        })
    },
    setSearchpopup: function () {
      this.$refs['viewmodal'].show()
    },
    hidepopup: function () {
      this.$refs['missionmodal'].hide()
    },
    addStore: function () {
      alert('Add Store for point at ' + this.latitude + ', ' + this.longitude)
    }
  },
  mounted: function () {
    console.log('component mounted')
    instance.drawMap()
  }
}
</script>
<style scoped>
  #mapwrapper {
    height: 100vh;
    width: 100%;
  }

  #toolbar {
    height: 10vh;
    width: 100%;
  }

  #txtSearch {
    width: 100%;
  }

  #viewDiv {
    height: 90vh;
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
