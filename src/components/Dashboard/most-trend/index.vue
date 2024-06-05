<template>
  <div class="card">
    <div class="card-header border-0 pb-0 d-sm-flex d-block">
      <div>
        <h4 class="card-title mb-1">Most Selling Items</h4>
        <small class="mb-0">Lorem ipsum dolor sit amet, consectetur</small>
      </div>
      <div class="card-action card-tabs mt-3 mt-sm-0">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              data-toggle="tab"
              href="#monthly"
              role="tab"
            >
              Monthly
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#weekly" role="tab">
              Weekly
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#today" role="tab">
              Today
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="card-body tab-content">
      <div class="tab-pane fade show active" id="monthly">
        <div class="media mb-4 items-list-2">
          <img
            class="img-fluid rounded mr-3"
            width="85"
            src="../../../assets/img/pic5.jpg"
            alt="DexignZone"
          />
          <div class="media-body col-6 px-0">
            <h5 class="mt-0 mb-1 text-black">Meidum Spicy Spagethi Italiano</h5>
            <small class="text-primary font-w500 mb-3">SPAGETHI</small>
            <span class="text-secondary mr-2 fo"></span>
            <ul class="fs-14 list-inline">
              <li class="mr-3">Serves for 4 Person</li>
              <li>24mins</li>
            </ul>
          </div>
          <div
            class="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex"
          >
            <h3 class="mb-0 font-w600 text-secondary">$12.56</h3>
          </div>
        </div>
        <div class="media mb-4 items-list-2">
          <img
            class="img-fluid rounded mr-3"
            width="85"
            src="../../../assets/img/pic4.jpg"
            alt="DexignZone"
          />
          <div class="media-body col-6 px-0">
            <h5 class="mt-0 mb-1 text-black">
              Pizza Meal for Kids (Small size)
            </h5>
            <small class="text-primary font-w500 mb-3">MAIN COURSE</small>
            <span class="text-secondary mr-2 fo"></span>
            <ul class="fs-14 list-inline">
              <li class="mr-3">Serves for 4 Person</li>
              <li>24mins</li>
            </ul>
          </div>
          <div
            class="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex"
          >
            <h3 class="mb-0 font-w600 text-secondary">$5.67</h3>
          </div>
        </div>
        <div class="media mb-4 items-list-2">
          <img
            class="img-fluid rounded mr-3"
            width="85"
            src="../../../assets/img/pic3.jpg"
            alt="DexignZone"
          />
          <div class="media-body col-6 px-0">
            <h5 class="mt-0 mb-1 text-black">Meidum Spicy Spagethi Italiano</h5>
            <small class="text-primary font-w500 mb-3">MAIN COURSE</small>
            <span class="text-secondary mr-2 fo"></span>
            <ul class="fs-14 list-inline">
              <li class="mr-3">Serves for 4 Person</li>
              <li>24mins</li>
            </ul>
          </div>
          <div
            class="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex"
          >
            <h3 class="mb-0 font-w600 text-secondary">$11.21</h3>
          </div>
        </div>
        <div class="media mb-4 items-list-2">
          <img
            class="img-fluid rounded mr-3"
            width="85"
            src="../../../assets/img/pic2.jpg"
            alt="DexignZone"
          />
          <div class="media-body col-6 px-0">
            <h5 class="mt-0 mb-1 text-black">Meidum Spicy Spagethi Italiano</h5>
            <small class="text-primary font-w500 mb-3">MAIN COURSE</small>
            <span class="text-secondary mr-2 fo"></span>
            <ul class="fs-14 list-inline">
              <li class="mr-3">Serves for 4 Person</li>
              <li>24mins</li>
            </ul>
          </div>
          <div
            class="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex"
          >
            <h3 class="mb-0 font-w600 text-secondary">$8.15</h3>
          </div>
        </div>
        <div class="media items-list-2">
          <img
            class="img-fluid rounded mr-3"
            width="85"
            src="../../../assets/img/pic1.jpg"
            alt="DexignZone"
          />
          <div class="media-body col-6 px-0">
            <h5 class="mt-0 mb-1 text-black">Meidum Spicy Spagethi Italiano</h5>
            <small class="text-primary font-w500 mb-3">MAIN COURSE</small>
            <span class="text-secondary mr-2 fo"></span>
            <ul class="fs-14 list-inline">
              <li class="mr-3">Serves for 4 Person</li>
              <li>24mins</li>
            </ul>
          </div>
          <div
            class="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex"
          >
            <h3 class="mb-0 font-w600 text-secondary">$5.67</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MostSell",
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.card {
  margin-bottom: 1.875rem;
  background-color: #fff;
  transition: all 0.5s ease-in-out;
  position: relative;
  border: 0px solid transparent;
  border-radius: 20px;
  box-shadow: 0px 12px 23px 0px rgba(62, 73, 84, 0.04);
  height: calc(100% - 30px);
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.75rem;
}
.card-header:first-child {
  border-radius: calc(0.75rem - 1px) calc(0.75rem - 1px) 0 0;
}
.card-header {
  border-color: #f0f1f5;
  position: relative;
  background: transparent;
  padding: 1.5rem 1.875rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pb-0,
.py-0 {
  padding-bottom: 0 !important;
}
.d-block {
  display: block !important;
}
@media (min-width: 576px) {
  .d-sm-flex {
    display: flex !important;
  }
}

.border-0 {
  border: 0 !important;
}
.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.card-body {
  padding: 1.875rem;
}
.card-body {
  flex: 1 1 auto;
  padding: 1.25rem;
}

.card-header .card-title {
  margin-bottom: 0px;
}
.card-title {
  font-size: 20px;
  font-weight: 500;
  color: #000;
  text-transform: capitalize;
}
.mb-1,
.my-1 {
  margin-bottom: 0.25rem !important;
}
.card-title {
  margin-bottom: 0.75rem;
}
h4,
.h4 {
  font-size: 1.125rem;
}
.mb-0,
.my-0 {
  margin-bottom: 0 !important;
}
small,
.small {
  font-size: 80%;
  font-weight: 400;
}
small {
  font-size: 80%;
}

@media (min-width: 576px) {
  .mt-sm-0,
  .my-sm-0 {
    margin-top: 0 !important;
  }
}
.mt-3,
.my-3 {
  margin-top: 1rem !important;
}

.mb-4,
.my-4 {
  margin-bottom: 1.5rem !important;
}
.media {
  display: flex;
  align-items: flex-start;
}

.media img {
  border-radius: 3px;
}
.rounded {
  border-radius: 0.375rem !important;
}
.mr-3,
.mx-3 {
  margin-right: 1rem !important;
}
.rounded {
  border-radius: 0.75rem !important;
}
.img-fluid {
  max-width: 100%;
  height: auto;
}
img {
  vertical-align: middle;
  border-style: none;
}

.pl-0,
.px-0 {
  padding-left: 0 !important;
}
.pr-0,
.px-0 {
  padding-right: 0 !important;
}
.media-body {
  flex: 1;
}
.col-6 {
  flex: 0 0 50%;
  max-width: 50%;
}

.text-black {
  color: #000 !important;
}
.mb-1,
.my-1 {
  margin-bottom: 0.25rem !important;
}
.mt-0,
.my-0 {
  margin-top: 0 !important;
}
h5,
.h5 {
  font-size: 1rem;
}
.font-w500 {
  font-weight: 500;
}
.text-primary {
  color: #2f4cdd !important;
}
.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}
small,
.small {
  font-size: 80%;
  font-weight: 400;
}
small {
  font-size: 80%;
}
.text-secondary {
  color: #3e4954 !important;
}
.mr-2,
.mx-2 {
  margin-right: 0.5rem !important;
}
.fs-14 {
  font-size: 14px !important;
  line-height: 1.5;
}
.list-inline {
  padding-left: 0;
  list-style: none;
}
ul {
  padding: 0;
  margin: 0;
}

.list-inline li {
  display: inline-block;
}
.mr-3,
.mx-3 {
  margin-right: 1rem !important;
}
li {
  list-style: none;
}
.list-inline li {
  display: inline-block;
}
li {
  list-style: none;
}
.ml-auto,
.mx-auto {
  margin-left: auto !important;
}
.align-self-center {
  align-self: center !important;
}
.align-items-center {
  align-items: center !important;
}
.font-w600 {
  font-weight: 600;
}
.text-secondary {
  color: #3e4954 !important;
}
.mb-0,
.my-0 {
  margin-bottom: 0 !important;
}
h3,
.h3 {
  font-size: 1.5rem;
}
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  color: #3d4465;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}
.card-tabs .nav-tabs {
  border-bottom: 0px;
  background: #f4f6fd;
  padding: 5px;
  border-radius: 6px;
}
.nav-tabs {
  border-bottom: 1px solid #dee2e6;
}
.nav {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
ul {
  padding: 0;
  margin: 0;
}
.nav-tabs .nav-item {
  margin-bottom: -1px;
}
li {
  list-style: none;
}
.card-tabs .nav-tabs .nav-link.active {
  background: #fff;
  color: #000000;
}
.card-tabs .nav-tabs .nav-link {
  border-radius: 6px;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 14px;
  border: 0;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #495057;
  background-color: #fbfbfb;
  border-color: #dee2e6 #dee2e6 #fbfbfb;
}
.nav-tabs .nav-link {
  border: 1px solid transparent;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
}
a:hover,
a:focus,
a.active {
  text-decoration: none;
}
.nav-link {
  display: block;
  padding: 0.5rem 1rem;
}
a {
  color: #7e7e7e;
}
a {
  color: #2f4cdd;
  text-decoration: none;
  background-color: transparent;
}

.card-header:first-child {
  border-radius: calc(0.75rem - 1px) calc(0.75rem - 1px) 0 0;
}
.card-header {
  border-color: #f0f1f5;
  position: relative;
  background: transparent;
  padding: 1.5rem 1.875rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pb-0,
.py-0 {
  padding-bottom: 0 !important;
}
</style>
