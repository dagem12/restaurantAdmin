<template>
  <q-dialog
    v-model="showDialogEdit"
    class="customdialog"
    transition-show="rotate"
    transition-hide="rotate"
  >
    <q-card class="q-pa-md" style="width: 600px; max-width: 90vw">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Update Shop</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input
          ref="name"
          v-model="shop.name"
          label="Name*"
          class="q-mb-md"
          :rules="[rules.required]"
        />

        <q-input
          v-model="shop.description"
          label="Description"
          type="textarea"
          class="q-mb-md"
        />

        <q-toggle
          v-model="shop.enable"
          label="Enable"
          type="number"
          class="q-mb-md"
        />
        <q-input
          ref="address"
          v-model="shop.address"
          label="Address*"
          type="text"
          class="q-mb-md"
          :rules="[rules.required]"
        />
        <div style="margin: auto; padding: 5px">
          <l-map
            :zoom="zoom"
            :center="initialLocation"
            class="map-container"
            @click="onMapClick"
          >
            <l-tile-layer :url="tileLayerUrl"></l-tile-layer>
            <l-marker
              :lat-lng="selectedLocation"
              :draggable="true"
              @moveend="onMarkerDragEnd"
            ></l-marker>
          </l-map>
          <div>
            {{ selectedLocation }}
            Latitude:
            <q-input v-model="shop.latitude" type="number" step="any" />
            Longitude:
            <q-input v-model="shop.longitude" type="number" step="any" />
          </div>
          <div style="margin: auto; padding: 10px">
            <q-btn @click="getUserLocation">Use Current Location</q-btn>
          </div>
        </div>

        <q-toggle
          v-model="shop.orderService"
          label="Order Service"
          class="q-mb-md"
        />

        <q-uploader
          ref="imageUploader"
          url="http://localhost:8081/upload"
          label="Click or Drag logo* "
          @added="onFileAdded"
          @uploaded="onFileUploaded"
          :headers="uploadHeaders"
          :factory="uploadFactory"
        />
        <label></label>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="Update"
          :loading="loading"
          @click="validateForm"
        />
        <q-btn color="secondary" label="Cancel" @click="cancelAddItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import ShopService from "../Api/index.js";
import fileService from "../../../utils/file.service.js";
import { Notify } from "quasar";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props: {
    retrieveAllShops: {
      type: Function,
    },
    shop: {
      type: Object,
    },
  },
  data() {
    return {
      imageError: "",
      rules: {
        required: (val) => !!val || "Field is required",
        email: (val) => /.+@.+\..+/.test(val) || "Email must be valid",
        minLength: (len) => (val) =>
          (val && val.length >= len) || `Minimum ${len} characters required`,
        onlyAlphabets: (val) =>
          /^[a-zA-Z]+$/.test(val) || "Only alphabets are allowed",
        onlyNumbers: (val) =>
          /^[0-9]+$/.test(val) || "Only numbers are allowed",
        validImage: (file) => {
          const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
          const maxSize = 2 * 1024 * 1024; // 2MB

          if (!file) return "Image is required";
          if (!allowedTypes.includes(file.type))
            return "Only JPEG, PNG, and GIF formats are allowed";
          if (file.size > maxSize) return "Image size must be less than 2MB";

          return true;
        },
      },
      showDialogEdit: false,

      showDialog: false,
      shopService: new ShopService(),
      uploadHeaders: {
        Authorization: "Bearer YOUR_AUTH_TOKEN",
      },
      loading: false,
      shopItem: {
        name: "",
        tenant: null,
        description: "",
        address: "",
        enable: false,
        orderService: false,
        contact: null,
        shortcutIcon: "",
      },
      contactOptions: [
        { label: "Abebe", value: "1" },
        { label: "Kebede", value: "2" },
        { label: "Rebede", value: "3" },
      ],
      tenantOptions: [
        { label: "Et Restaurnt", value: "1" },
        { label: "Kaldis Restaurant", value: "2" },
      ],
      selectedLocation: {},
      zoom: 15,
      tileLayerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      initialLocation: [], // Example initial location (London)
    };
  },
  created() {
    this.selectedLocation = {
      lat: this.$props.shop.latitude,
      lng: this.$props.shop.longitude,
    };

    this.initialLocation = [
      this.$props.shop.latitude,
      this.$props.shop.longitude,
    ];
  },
  methods: {
    validateForm() {
      // Perform form validation
      const inputs = [this.$refs.name, this.$refs.address];

      const valid = inputs.reduce(
        (acc, input) => acc && input.validate(),
        true
      );

      if (valid) {
        this.updateItem();
      }
    },

    async updateItem() {
      this.loading = true;

      // if ((this.shop.latitude) && (this.selectedLocation.lat != this.shop.latitude)) {
      //     this.shop.latitude = this.selectedLocation.lat;
      // } else if ((this.shop.longitude)&&(this.selectedLocation.lng != this.shop.longitude)) {
      //     this.shop.longitude = this.selectedLocation.lng;
      // } else if (!this.shop.longitude) {
      //     console.log("ammherre")
      //     this.shop.longitude = this.selectedLocation.lng;
      // } else if (!this.shop.latitude) {
      //     this.shop.latitude = this.selectedLocation.lat;
      // }
      this.shopService
        .update(this.shop)
        .then(() => {
          // console.log(' Shop Updated successfully.');
          this.loading = false;
          this.showDialogEdit = false;

          this.notifySuccess("Shop Updated successfully");
          this.$emit("getShop");
          this.resetMenuItem();
        })
        .catch((error) => {
          this.loading = false;
          this.showDialogEdit = false;
          console.error("Error adding new Shop:", error);
        });
    },
    cancelAddItem() {
      this.showDialogEdit = false;
      this.resetMenuItem();
    },
    resetMenuItem() {
      this.shop = {
        name: "",
        tenant: null,
        description: "",
        address: "",
        enable: "",
        orderService: "",
        contact: null,
        shortcutIcon: "",
      };
      this.selectedLocation = {
        lat: 0.0,
        lng: 0.0,
      };
    },
    notifySuccess(message) {
      Notify.create({
        message: message,
        timeout: 3000,
        position: "center",
        color: "green",
      });
    },

    notifyError(message) {
      Notify.create({
        message: message,
        timeout: 3000,
        position: "center",
        color: "red",
      });
    },
    onFileAdded(files) {
      // console.log('Files added:', files);
      const formDataFile = new FormData();
      formDataFile.append("file", files[0]);
      fileService
        .createFile(formDataFile)
        .then((res) => {
          this.shop.shortcutIcon = res.data.fileName;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    onFileUploaded(response) {
      // console.log('File uploaded:', response);
    },
    uploadFactory(files) {
      // Customize how files are uploaded, if necessary
      return files.map((file) => ({
        url: "http://localhost:8081/upload",
        formData: {
          file,
        },
      }));
    },

    getUserLocation() {
      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        };

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.selectedLocation = { lat: latitude, lng: longitude };
            this.initialLocation = [latitude, longitude]; // Center the map on the user's location
            this.$props.shop.latitude = latitude;
            this.$props.shop.longitude = longitude;
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Failed to get current location. Please try again.");
          },
          options
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    onMarkerDragEnd(event) {
      this.selectedLocation.lat = event.latlng.lat;
      this.selectedLocation.lng = event.latlng.lng;
    },
    onMapClick(event) {
      this.selectedLocation.lat = event.latlng.lat;
      this.selectedLocation.lng = event.latlng.lng;
    },
  },
};
</script>

<style scoped>
.q-pa-md {
  padding: 16px;
}

.q-mb-md {
  margin-bottom: 16px;
}

.customdialog /deep/ .q-dialog__backdrop {
  backdrop-filter: blur(4px) !important;
}
.map-container {
  height: 200px; /* Adjust height as needed */
}
</style>
