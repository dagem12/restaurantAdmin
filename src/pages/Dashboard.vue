<template>
  <div class="content">
    <div class="md-layout" ref="dashboardbox">
      <!-- cards -->
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <div class="col-xl-3 col-xxl-3 col-lg-6 col-md-6 col-sm-6">
          <div class="widget-stat card">
            <div class="card-body p-4">
              <div class="media ai-icon">
                <span class="mr-3 bgl-primary text-primary">
                  <!-- <i class="ti-user"></i> -->
                  <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M31.75 6.75H30.0064L30.2189 4.62238C30.2709 4.10111 30.2131 3.57473 30.0493 3.07716C29.8854 2.57959 29.6192 2.12186 29.2676 1.73348C28.9161 1.3451 28.4871 1.03468 28.0082 0.822231C27.5294 0.609781 27.0114 0.500013 26.4875 0.5H7.0125C6.48854 0.500041 5.9704 0.609864 5.49148 0.822391C5.01256 1.03492 4.58348 1.34543 4.23189 1.73392C3.88031 2.12241 3.61403 2.58026 3.45021 3.07795C3.28639 3.57564 3.22866 4.10214 3.28075 4.6235L5.2815 24.6224C5.31508 24.9222 5.38467 25.2168 5.48875 25.5H1.75C1.41848 25.5 1.10054 25.6317 0.866116 25.8661C0.631696 26.1005 0.5 26.4185 0.5 26.75C0.5 27.0815 0.631696 27.3995 0.866116 27.6339C1.10054 27.8683 1.41848 28 1.75 28H31.75C32.0815 28 32.3995 27.8683 32.6339 27.6339C32.8683 27.3995 33 27.0815 33 26.75C33 26.4185 32.8683 26.1005 32.6339 25.8661C32.3995 25.6317 32.0815 25.5 31.75 25.5H28.0115C28.1154 25.2172 28.1849 24.9229 28.2185 24.6235L28.881 18H31.75C32.7442 17.9989 33.6974 17.6035 34.4004 16.9004C35.1035 16.1974 35.4989 15.2442 35.5 14.25V10.5C35.4989 9.50577 35.1035 8.55258 34.4004 7.84956C33.6974 7.14653 32.7442 6.75109 31.75 6.75ZM9.0125 25.5C8.70243 25.501 8.40314 25.3862 8.17327 25.1782C7.9434 24.9701 7.79949 24.6836 7.76975 24.375L5.7685 4.37575C5.75109 4.20188 5.7703 4.0263 5.82488 3.86031C5.87946 3.69432 5.96821 3.5416 6.0854 3.412C6.2026 3.28239 6.34564 3.17877 6.50532 3.10781C6.665 3.03685 6.83777 3.00013 7.0125 3H26.4875C26.6622 3.00012 26.8349 3.03681 26.9945 3.10772C27.1541 3.17863 27.2972 3.28218 27.4143 3.4117C27.5315 3.54123 27.6203 3.69386 27.6749 3.85977C27.7295 4.02568 27.7488 4.20119 27.7315 4.375L25.7308 24.3762C25.7007 24.6848 25.5566 24.971 25.3267 25.1788C25.0967 25.3867 24.7975 25.5012 24.4875 25.5H9.0125ZM33 14.25C32.9998 14.5815 32.868 14.8993 32.6337 15.1337C32.3993 15.368 32.0815 15.4998 31.75 15.5H29.1311L29.7561 9.25H31.75C32.0815 9.2502 32.3993 9.38196 32.6337 9.61634C32.868 9.85071 32.9998 10.1685 33 10.5V14.25Z"
                      fill="#2F4CDD"></path>
                  </svg>
                </span>
                <div class="media-body">
                  <h3 class="mb-0 text-black">
                    <span class="counter ml-0">{{ cards[0].count }}</span>
                  </h3>
                  <p class="mb-0 sub-title">Active Menus</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <div class="col-xl-3 col-xxl-3 col-lg-6 col-md-6 col-sm-6">
          <div class="widget-stat card">
            <div class="card-body p-4">
              <div class="media ai-icon">
                <span class="mr-3 bgl-primary text-primary">
                  <!-- <i class="ti-user"></i> -->
                  <svg width="20" height="36" viewBox="0 0 20 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.08 24.36C19.08 25.64 18.76 26.8667 18.12 28.04C17.48 29.1867 16.5333 30.1467 15.28 30.92C14.0533 31.6933 12.5733 32.1333 10.84 32.24V35.48H8.68V32.24C6.25333 32.0267 4.28 31.2533 2.76 29.92C1.24 28.56 0.466667 26.84 0.44 24.76H4.32C4.42667 25.88 4.84 26.8533 5.56 27.68C6.30667 28.5067 7.34667 29.0267 8.68 29.24V19.24C6.89333 18.7867 5.45333 18.32 4.36 17.84C3.26667 17.36 2.33333 16.6133 1.56 15.6C0.786667 14.5867 0.4 13.2267 0.4 11.52C0.4 9.36 1.14667 7.57333 2.64 6.16C4.16 4.74666 6.17333 3.96 8.68 3.8V0.479998H10.84V3.8C13.1067 3.98667 14.9333 4.72 16.32 6C17.7067 7.25333 18.5067 8.89333 18.72 10.92H14.84C14.7067 9.98667 14.2933 9.14667 13.6 8.4C12.9067 7.62667 11.9867 7.12 10.84 6.88V16.64C12.6 17.0933 14.0267 17.56 15.12 18.04C16.24 18.4933 17.1733 19.2267 17.92 20.24C18.6933 21.2533 19.08 22.6267 19.08 24.36ZM4.12 11.32C4.12 12.6267 4.50667 13.6267 5.28 14.32C6.05333 15.0133 7.18667 15.5867 8.68 16.04V6.8C7.29333 6.93333 6.18667 7.38667 5.36 8.16C4.53333 8.90667 4.12 9.96 4.12 11.32ZM10.84 29.28C12.28 29.12 13.4 28.6 14.2 27.72C15.0267 26.84 15.44 25.7867 15.44 24.56C15.44 23.2533 15.04 22.2533 14.24 21.56C13.44 20.84 12.3067 20.2667 10.84 19.84V29.28Z"
                      fill="#2F4CDD"></path>
                  </svg>
                </span>
                <div class="media-body">
                  <h3 class="mb-0 text-black">
                    <span class="counter ml-0">{{ formattedCount }}</span>
                  </h3>
                  <p class="mb-0 sub-title">Total Revenue</p>
                  <small :class="percentageClass(cards[1].percentage)">
                    <template v-if="cards[1].percentage !== 0">
                      <q-icon :name="percentageIcon(cards[1].percentage)" />
                    </template>
                    {{ Math.abs(cards[1].percentage) }}% (30 days)
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <div class="col-xl-3 col-xxl-3 col-lg-6 col-md-6 col-sm-6">
          <div class="widget-stat card">
            <div class="card-body p-4">
              <div class="media ai-icon">
                <span class="mr-3 bgl-primary text-primary">
                  <!-- <i class="ti-user"></i> -->
                  <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 30.5H22.75C23.7442 30.4989 24.6974 30.1035 25.4004 29.4004C26.1035 28.6974 26.4989 27.7442 26.5 26.75V16.75C26.5 16.4185 26.3683 16.1005 26.1339 15.8661C25.8995 15.6317 25.5815 15.5 25.25 15.5C24.9185 15.5 24.6005 15.6317 24.3661 15.8661C24.1317 16.1005 24 16.4185 24 16.75V26.75C23.9997 27.0814 23.8679 27.3992 23.6336 27.6336C23.3992 27.8679 23.0814 27.9997 22.75 28H4C3.66857 27.9997 3.3508 27.8679 3.11645 27.6336C2.88209 27.3992 2.7503 27.0814 2.75 26.75V9.25C2.7503 8.91857 2.88209 8.6008 3.11645 8.36645C3.3508 8.13209 3.66857 8.0003 4 8H15.25C15.5815 8 15.8995 7.8683 16.1339 7.63388C16.3683 7.39946 16.5 7.08152 16.5 6.75C16.5 6.41848 16.3683 6.10054 16.1339 5.86612C15.8995 5.6317 15.5815 5.5 15.25 5.5H4C3.00577 5.50109 2.05258 5.89653 1.34956 6.59956C0.646531 7.30258 0.251092 8.25577 0.25 9.25V26.75C0.251092 27.7442 0.646531 28.6974 1.34956 29.4004C2.05258 30.1035 3.00577 30.4989 4 30.5Z"
                      fill="#2F4CDD"></path>
                    <path
                      d="M25.25 0.5C24.0139 0.5 22.8055 0.866556 21.7777 1.55331C20.7499 2.24007 19.9488 3.21619 19.4758 4.35823C19.0027 5.50027 18.8789 6.75693 19.1201 7.96931C19.3613 9.1817 19.9565 10.2953 20.8306 11.1694C21.7047 12.0435 22.8183 12.6388 24.0307 12.8799C25.2431 13.1211 26.4997 12.9973 27.6418 12.5242C28.7838 12.0512 29.7599 11.2501 30.4467 10.2223C31.1334 9.19451 31.5 7.98613 31.5 6.75C31.498 5.093 30.8389 3.50442 29.6673 2.33274C28.4956 1.16106 26.907 0.501952 25.25 0.5ZM25.25 10.5C24.5083 10.5 23.7833 10.2801 23.1666 9.86801C22.5499 9.45596 22.0693 8.87029 21.7855 8.18506C21.5016 7.49984 21.4274 6.74584 21.5721 6.01841C21.7167 5.29098 22.0739 4.6228 22.5983 4.09835C23.1228 3.5739 23.791 3.21675 24.5184 3.07206C25.2458 2.92736 25.9998 3.00162 26.6851 3.28545C27.3703 3.56928 27.9559 4.04993 28.368 4.66661C28.7801 5.2833 29 6.00832 29 6.75C28.9989 7.74423 28.6035 8.69742 27.9004 9.40044C27.1974 10.1035 26.2442 10.4989 25.25 10.5Z"
                      fill="#2F4CDD"></path>
                    <path
                      d="M6.5 13H12.75C13.0815 13 13.3995 12.8683 13.6339 12.6339C13.8683 12.3995 14 12.0815 14 11.75C14 11.4185 13.8683 11.1005 13.6339 10.8661C13.3995 10.6317 13.0815 10.5 12.75 10.5H6.5C6.16848 10.5 5.85054 10.6317 5.61612 10.8661C5.3817 11.1005 5.25 11.4185 5.25 11.75C5.25 12.0815 5.3817 12.3995 5.61612 12.6339C5.85054 12.8683 6.16848 13 6.5 13Z"
                      fill="#2F4CDD"></path>
                    <path
                      d="M5.25 16.75C5.25 17.0815 5.3817 17.3995 5.61612 17.6339C5.85054 17.8683 6.16848 18 6.5 18H17.75C18.0815 18 18.3995 17.8683 18.6339 17.6339C18.8683 17.3995 19 17.0815 19 16.75C19 16.4185 18.8683 16.1005 18.6339 15.8661C18.3995 15.6317 18.0815 15.5 17.75 15.5H6.5C6.16848 15.5 5.85054 15.6317 5.61612 15.8661C5.3817 16.1005 5.25 16.4185 5.25 16.75Z"
                      fill="#2F4CDD"></path>
                  </svg>
                </span>
                <div class="media-body">
                  <h3 class="mb-0 text-black">
                    <span class="counter ml-0">{{ cards[2].count }}</span>
                  </h3>
                  <p class="mb-0 sub-title">Total Orders</p>
                  <small :class="percentageClass(cards[2].percentage)">
                    <template v-if="cards[2].percentage !== 0">
                      <q-icon :name="percentageIcon(cards[2].percentage)" />
                    </template>
                    {{ Math.abs(cards[2].percentage) }}% (30 days)
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <div class="col-xl-3 col-xxl-3 col-lg-6 col-md-6 col-sm-6">
          <div class="widget-stat card">
            <div class="card-body p-4">
              <div class="media ai-icon">
                <span class="mr-3 bgl-primary text-primary">
                  <!-- <i class="ti-user"></i> -->
                  <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.25 19.25C12.2389 19.25 13.2056 18.9568 14.0279 18.4074C14.8501 17.8579 15.491 17.0771 15.8694 16.1634C16.2478 15.2498 16.3469 14.2445 16.1539 13.2746C15.961 12.3046 15.4848 11.4137 14.7855 10.7145C14.0863 10.0152 13.1954 9.539 12.2255 9.34608C11.2555 9.15315 10.2502 9.25217 9.33658 9.6306C8.42295 10.009 7.64206 10.6499 7.09265 11.4722C6.54325 12.2944 6.25 13.2611 6.25 14.25C6.25129 15.5757 6.77849 16.8467 7.71589 17.7841C8.65329 18.7215 9.92431 19.2487 11.25 19.25ZM11.25 11.75C11.7445 11.75 12.2278 11.8966 12.6389 12.1713C13.05 12.446 13.3705 12.8365 13.5597 13.2933C13.7489 13.7501 13.7984 14.2528 13.702 14.7377C13.6055 15.2227 13.3674 15.6681 13.0178 16.0178C12.6681 16.3674 12.2227 16.6055 11.7377 16.702C11.2528 16.7984 10.7501 16.7489 10.2933 16.5597C9.83648 16.3705 9.44603 16.0501 9.17133 15.6389C8.89662 15.2278 8.75 14.7445 8.75 14.25C8.75089 13.5872 9.01457 12.9519 9.48322 12.4832C9.95187 12.0146 10.5872 11.7509 11.25 11.75Z"
                      fill="#2F4CDD"></path>
                    <path
                      d="M30.78 22.4625C31.1927 21.9098 31.4684 21.2672 31.5844 20.5873C31.7005 19.9074 31.6537 19.2096 31.4478 18.5514L30.6543 15.9696C30.2817 14.7451 29.5244 13.6733 28.4946 12.9132C27.4648 12.1531 26.2174 11.7452 24.9375 11.75H19.3287C18.9971 11.75 18.6792 11.8817 18.4448 12.1161C18.2103 12.3505 18.0787 12.6685 18.0787 13C18.0787 13.3315 18.2103 13.6495 18.4448 13.8839C18.6792 14.1183 18.9971 14.25 19.3287 14.25H24.9375C25.6823 14.2474 26.4081 14.485 27.0073 14.9274C27.6064 15.3698 28.0471 15.9935 28.2639 16.706L29.0574 19.2866C29.145 19.5713 29.1645 19.8725 29.1145 20.1661C29.0645 20.4597 28.9463 20.7374 28.7694 20.977C28.5925 21.2166 28.3619 21.4114 28.0961 21.5456C27.8302 21.6799 27.5366 21.7499 27.2388 21.75H15.7777C15.7423 21.75 15.7127 21.7671 15.6777 21.7701C15.5937 21.7669 15.5125 21.75 15.4273 21.75H7.58978C6.20071 21.7449 4.84705 22.1879 3.72972 23.0132C2.61239 23.8385 1.79097 25.0021 1.3874 26.3312L0.454153 29.3625C0.236164 30.0719 0.187639 30.8225 0.31248 31.554C0.43732 32.2856 0.732043 32.9776 1.17296 33.5745C1.61388 34.1715 2.18869 34.6566 2.85119 34.9911C3.51369 35.3255 4.24541 35.4998 4.98753 35.5H18.0287C18.7708 35.4998 19.5026 35.3256 20.1652 34.9912C20.8277 34.6568 21.4026 34.1717 21.8436 33.5747C22.2845 32.9778 22.5793 32.2857 22.7042 31.5541C22.829 30.8226 22.7805 30.0719 22.5625 29.3625L21.6299 26.3315C21.3936 25.5767 21.0217 24.8713 20.5323 24.25H27.2388C27.9283 24.2532 28.6088 24.0928 29.2244 23.7821C29.8399 23.4714 30.3731 23.0191 30.78 22.4625ZM19.8328 32.089C19.6255 32.3726 19.3539 32.6031 19.0403 32.7614C18.7267 32.9198 18.38 33.0015 18.0287 33H4.98753C4.63653 32.9999 4.29043 32.9175 3.97708 32.7594C3.66373 32.6012 3.39187 32.3717 3.18337 32.0894C2.97487 31.807 2.83555 31.4796 2.77661 31.1336C2.71767 30.7876 2.74077 30.4326 2.84403 30.0971L3.77665 27.0661C4.02442 26.2489 4.52925 25.5335 5.21612 25.0261C5.90299 24.5188 6.73523 24.2466 7.58915 24.25H15.4267C16.2806 24.2466 17.1128 24.5188 17.7997 25.0261C18.4865 25.5335 18.9914 26.2489 19.2392 27.0661L20.1718 30.0971C20.2769 30.4323 20.301 30.7877 20.2421 31.134C20.1832 31.4804 20.0429 31.8078 19.8328 32.0894V32.089Z"
                      fill="#2F4CDD"></path>
                    <path
                      d="M21.875 9.24999C22.7403 9.24999 23.5861 8.9934 24.3056 8.51267C25.0251 8.03194 25.5858 7.34866 25.917 6.54923C26.2481 5.74981 26.3347 4.87014 26.1659 4.02148C25.9971 3.17281 25.5804 2.39326 24.9686 1.78141C24.3567 1.16955 23.5772 0.752876 22.7285 0.584066C21.8798 0.415256 21.0002 0.501896 20.2008 0.833029C19.4013 1.16416 18.7181 1.72492 18.2373 2.44438C17.7566 3.16384 17.5 4.0097 17.5 4.875C17.5014 6.03489 17.9628 7.14688 18.7829 7.96705C19.6031 8.78722 20.7151 9.2486 21.875 9.24999ZM21.875 3C22.2458 3 22.6083 3.10997 22.9167 3.31599C23.225 3.52202 23.4654 3.81485 23.6073 4.15747C23.7492 4.50008 23.7863 4.87708 23.714 5.24079C23.6416 5.6045 23.463 5.9386 23.2008 6.20082C22.9386 6.46304 22.6045 6.64162 22.2408 6.71397C21.8771 6.78631 21.5001 6.74918 21.1575 6.60727C20.8149 6.46535 20.522 6.22503 20.316 5.91669C20.11 5.60835 20 5.24584 20 4.875C20.0006 4.37789 20.1983 3.9013 20.5498 3.54979C20.9013 3.19829 21.3779 3.00056 21.875 3Z"
                      fill="#2F4CDD"></path>
                  </svg>
                </span>
                <div class="media-body">
                  <h3 class="mb-0 text-black">
                    <span class="counter ml-0">{{ cards[3].count }}</span>
                  </h3>
                  <p class="mb-0 sub-title">Total Client</p>
                  <small :class="percentageClass(cards[3].percentage)">
                    <template v-if="cards[3].percentage !== 0">
                      <q-icon :name="percentageIcon(cards[3].percentage)" />
                    </template>
                    {{ Math.abs(cards[3].percentage) }}% (30 days)
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div style="position: absolute;top:100px;">
          <div v-if="!displayTable" @click="showTable">
            <md-icon  style="color:black !important;font-size: x-large;">arrow_drop_down</md-icon>
          </div>
           <div v-if="displayTable" @click="showTable">
            <md-icon   style="color:black !important;font-size: x-large;">arrow_drop_up</md-icon>
           </div>
           
           
        </div>
      <!-- table -->
      <div v-if="displayTable" style="margin-bottom: 20px;width: 100%;">
        <!-- <img class="image box-shadow" src="../assets/img/table.png" alt="" /> -->
         <DrawResult style="width:100%;" />
      </div>

      <!-- order summary -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <div class="card">
          <div class="card-header border-0 pb-0 d-sm-flex d-block">
            <div>
              <h4 class="card-title mb-1">Orders Summary</h4>
              <small class="mb-0">A quick overview of your orders' statuses and progress.</small>
            </div>
            <div class="card-action card-tabs mt-3 mt-sm-0">
              <q-tabs v-model="activeTab" class="q-tabs-card" dense align="left" indicator-color="primary"
                active-color="primary">
                <q-tab v-for="tab in tabs" :key="tab.id" :label="tab.label" :name="tab.id"
                  :active-class="'text-primary'" @click="handleTabChange(tab)"
                  :disable="activeTab !== tab.id && tabLoading" />
              </q-tabs>
            </div>
          </div>
          <div class="card-body orders-summary">
            <template v-if="tabLoading">
              <div class="skeleton-loader">
                <div class="d-flex order-manage p-3 align-items-center mb-4">
                  <div class="skeleton-block skeleton-btn"></div>
                  <div class="skeleton-block skeleton-heading"></div>
                  <div class="skeleton-block skeleton-btn"></div>
                </div>
                <div class="row">
                  <div class="col-sm-3 mb-4">
                    <div class="skeleton-block skeleton-order-summary"></div>
                  </div>
                  <div class="col-sm-3 mb-4">
                    <div class="skeleton-block skeleton-order-summary"></div>
                  </div>
                  <div class="col-sm-3 mb-4">
                    <div class="skeleton-block skeleton-order-summary"></div>
                  </div>
                  <div class="col-sm-3 mb-4">
                    <div class="skeleton-block skeleton-order-summary"></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xl-3 col-lg-4 col-xxl-4 col-sm-4 px-0 my-2 text-center text-sm-left "
                    style="margin-right: 40px;">
                    <div class="skeleton-block skeleton-pie-chart"></div>
                  </div>
                  <div class="col-xl-8 col-lg-7 col-xxl-7 col-sm-7 px-0">
                    <div class="skeleton-row">
                      <div class="skeleton-block skeleton-progress-bar"></div>
                      <div class="skeleton-block skeleton-progress-bar"></div>
                    </div>
                    <div class="skeleton-row">
                      <div class="skeleton-block skeleton-progress-bar"></div>
                      <div class="skeleton-block skeleton-progress-bar"></div>
                    </div>
                  </div>
                </div>

              </div>
            </template>
            <template v-else>
              <div class="d-flex order-manage p-3 align-items-center mb-4">
                <q-btn to="/order" color="green" :label="orderSummary.open"
                  class="btn text-white fs-22 py-1 px-4 mr-3" />
                <h4 class="mb-0">
                  <router-link to="/order">
                    New Orders <q-icon name="fiber_manual_record" class=" fs-15 ml-1"
                      style="color: #e7faec !important;"></q-icon>
                  </router-link>
                </h4>
                <router-link to="/order" class="ml-auto text-blue-500 font-semibold">
                  Manage orders <q-icon name="arrow_forward" class="text-blue-500 ml-1"></q-icon>
                </router-link>
              </div>
              <div class="row">
                <div class="col-sm-3 mb-4">
                  <div class="border px-3 py-3 rounded-xl">
                    <h2 class="fs-20 font-w600 counter">{{ orderSummary.open }}</h2>
                    <p class="fs-12 mb-0">Open</p>
                  </div>
                </div>
                <div class="col-sm-3 mb-4">
                  <div class="border px-3 py-3 rounded-xl">
                    <h2 class="fs-20 font-w600 counter">{{ orderSummary.preparing }}</h2>
                    <p class="fs-12 mb-0">Preparing</p>
                  </div>
                </div>

                <div class="col-sm-3 mb-4">
                  <div class="border px-3 py-3 rounded-xl">
                    <h2 class="fs-20 font-w600 counter">{{ orderSummary.delivered }}</h2>
                    <p class="fs-12 mb-0">Delivered</p>
                  </div>
                </div>
                <div class="col-sm-3 mb-4">
                  <div class="border px-3 py-3 rounded-xl">
                    <h2 class="fs-20 font-w600 counter">{{ orderSummary.paid }}</h2>
                    <p class="fs-12 mb-0">Paid</p>
                  </div>
                </div>
                <div class="col-sm-3 mb-4">
                  <div class="border px-3 py-3 rounded-xl">
                    <h2 class="fs-20 font-w600 counter">{{ orderSummary.cancelled }}</h2>
                    <p class="fs-12 mb-0">Cancelled</p>
                  </div>
                </div>
              </div>
              <div class="widget-timeline-icon">
                <div class="row align-items-center mx-0">
                  <div class="col-xl-3 col-lg-4 col-xxl-4 col-sm-4 px-0 my-2 text-center text-sm-left">
                    <PieChart :orderSummary="orderSummary"></PieChart>
                  </div>
                  <div class="col-xl-9 col-lg-8 col-xxl-8 col-sm-8 px-0">
                    <div class="d-flex" style="margin-bottom: 10px !important;">
                      <p class="mb-0 fs-14 col-4 px-0">Open ({{ percentages.open }}%)</p>
                      <q-linear-progress stripe rounded size="20px" :value="progressValues.open" color="green" />
                      <span class="pull-right ml-auto col-1 px-0 text-right">{{ orderSummary.open }}</span>
                    </div>
                    <div class="d-flex" style="margin-bottom: 10px !important;">
                      <p class="mb-0 fs-14 col-4 px-0">Preparing ({{ percentages.preparing }}%)</p>
                      <q-linear-progress stripe rounded size="20px" :value="progressValues.preparing" color="blue" />
                      <span class="pull-right ml-auto col-1 px-0 text-right">{{ orderSummary.preparing }}</span>
                    </div>
                    <div class="d-flex" style="margin-bottom: 10px !important;">
                      <p class="mb-0 fs-14 col-4 px-0">Delivered ({{ percentages.delivered }}%)</p>
                      <q-linear-progress stripe rounded size="20px" :value="progressValues.delivered" color="yellow" />
                      <span class="pull-right ml-auto col-1 px-0 text-right">{{ orderSummary.delivered }}</span>
                    </div>
                    <div class="d-flex" style="margin-bottom: 10px !important;">
                      <p class="mb-0 fs-14 col-4 px-0">Paid ({{ percentages.paid }}%)</p>
                      <q-linear-progress stripe rounded size="20px" :value="progressValues.paid" color="orange" />
                      <span class="pull-right ml-auto col-1 px-0 text-right">{{ orderSummary.paid }}</span>
                    </div>
                    <div class="d-flex" style="margin-bottom: 10px !important;">
                      <p class="mb-0 fs-14 col-4 px-0">Cancelled ({{ percentages.cancelled }}%)</p>
                      <q-linear-progress stripe rounded size="20px" :value="progressValues.cancelled" color="red" />
                      <span class="pull-right ml-auto col-1 px-0 text-right">{{ orderSummary.cancelled }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

          </div>
        </div>
      </div>
      <!-- most sells -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <MostSells :title="mostSells.title" :description="mostSells.description" :tabs="mostSells.tabs"
          :loading="mostSells.loading" />
      </div>
      <!-- customer map -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <div class="card">
          <div class="card-header border-0 pb-0 d-sm-flex d-block">
            <div>
              <h4 class="card-title mb-1">Customer Map</h4>
              <small class="mb-0">Top customers and their orders/spending</small>
            </div>
            <div class="card-action card-tabs mt-3 mt-sm-0">
              <q-tabs v-model="customerActiveTab" class="q-tabs-card" dense align="left" indicator-color="primary"
                active-color="primary">
                <q-tab v-for="tab in tabs" :key="tab.id" :label="tab.label" :name="tab.id"
                  :active-class="'text-primary'" @click="handleCustomerTabChange(tab)"
                  :disable="customerActiveTab !== tab.id && customerTabLoading" />
              </q-tabs>
            </div>
          </div>
          <div class="card-body orders-summary">


            <template v-if="customerTabLoading">
              <div class="skeleton-loader">
                <q-card>
                  <q-card-section class="row items-center justify-center q-mb-md">
                    <q-skeleton class="q-mx-md" style="width: 100%; height: 400px;" />
                  </q-card-section>
                </q-card>
              </div>
            </template>
            <template v-else>
              <template v-if="topSpendersData.length === 0">
                <md-empty-state md-icon="access_time" md-label="No Data Found"
                  md-description="Currently, there are no data please check again after a while."></md-empty-state>
              </template>
              <template v-else>
                <CustomerMap :data="topSpendersData" />
              </template>


            </template>

          </div>
        </div>
      </div>

      <!-- revenue -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <div class="card">
          <div class="card-header border-0 pb-0 d-sm-flex d-block">
            <div>
              <h4 class="card-title mb-1">Revenue</h4>
              <small class="mb-0">Track your revenue and amount of orders</small>
            </div>
            <div class="card-action card-tabs mt-3 mt-sm-0">
              <q-tabs v-model="revenueActiveTab" class="q-tabs-card" dense align="left" indicator-color="primary"
                active-color="primary">
                <q-tab v-for="tab in RevenueTabs" :key="tab.id" :label="tab.label" :name="tab.id"
                  :active-class="'text-primary'" @click="handleRevenueTabChange(tab)"
                  :disable="revenueActiveTab !== tab.id && revenueTabLoading" />
              </q-tabs>
            </div>
          </div>
          <div class="card-body orders-summary">
            <template v-if="revenueTabLoading">
              <div class="skeleton-loader">
                <q-card>
                  <q-card-section class="row items-center justify-center q-mb-md">
                    <q-skeleton class="q-mx-md" style="width: 100%; height: 400px;" />
                  </q-card-section>
                </q-card>
              </div>
            </template>
            <template v-else>
              <template
                v-if="(revenueActiveTab == 'hourly' && hourlyRevenueData.length === 0) ||(revenueActiveTab == 'daily' && dailyRevenueData.length === 0) || (revenueActiveTab == 'weekly' && weeklyRevenueData.length === 0) || (revenueActiveTab == 'monthly' && monthlyRevenueData.length === 0)">
                <md-empty-state md-icon="access_time" md-label="No Data Found"
                  md-description="Currently, there are no data please check again after a while."></md-empty-state>
              </template>
              <template v-else>
                <RevenueChart :hourlyData="aggregatedHourlyRevenueData" :dailyData="dailyRevenueData" :weeklyData="weeklyRevenueData"
                  :monthlyData="monthlyRevenueData" :selectedPeriod="revenueActiveTab" />
              </template>

            </template>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import PieChart from "@/components/Dashboard/pie-chart/index.vue";
import MostSells from "@/components/Dashboard/most-trend/index.vue";
import Revenue from "@/components/Dashboard/revenue/index.vue";
import RevenueChart from "@/components/Dashboard/RevenueChart/index.vue";
import CustomerMap from "@/components/Dashboard/CustomerMap/index.vue";
import TableChair from "@/components/TableChair/index.vue";
import DashBoardManagementService from "./Api/index.js";
import { gsap } from 'gsap';
import DrawResult from "@/components/DrawResult";
import DiningTableService from "../views/DiningTable/Api/index.js";


export default {
  components: {
    MostSells,
    PieChart,
    Revenue,
    TableChair,
    CustomerMap,
    RevenueChart,
    DrawResult
  },
  mounted() {
   
    this.cardData();
    this.summaryData(this.activeTab);
    this.revenueData(this.revenueActiveTab);
    this.customerData(this.customerActiveTab);
    const dashboardbox = this.$refs.dashboardbox;
    gsap.from(dashboardbox, { duration: 1, opacity: 0, y: 1000, ease: "power1.out" });
  },
  data() {
    return {
      displayTable:false,
      hourlyRevenueData: [],
      dailyRevenueData: [],
      weeklyRevenueData: [],
      monthlyRevenueData: [],
      diningTables: [],
      activeTab: 'daily',
      revenueActiveTab: 'daily',
      customerActiveTab: 'daily',
      tabLoading: false,
      revenueTabLoading: false,
      customerTabLoading: false,
      diningTableService:new DiningTableService(),
      tabs: [
        { id: 'monthly', label: 'Monthly' },
        { id: 'weekly', label: 'Weekly' },
        { id: 'daily', label: 'Daily' },
     
      ],
      RevenueTabs: [
        { id: 'monthly', label: 'Monthly' },
        { id: 'weekly', label: 'Weekly' },
        { id: 'daily', label: 'Daily' },
        { id: 'hourly', label: 'Hourly' }
      ],
      
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({ tension: 0 }),
          low: 0,
          high: 50,
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({ tension: 0 }),
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: ["Ja", "Fe", "Ma", "Ap", "Mai", "Ju", "Jul", "Au", "Se", "Oc", "No", "De"],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]],
        },
        options: {
          axisX: { showGrid: false },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
      cards: [
        { id: 0, count: 0, title: "Total Menus", percentage: 0 },
        { id: 1, count: 0, title: "Total Revenue", percentage: 0 },
        { id: 2, count: 0, title: "Total Orders", percentage: 0 },
        { id: 3, count: 0, title: "Total Client", percentage: 0 },
      ],
      orderSummary: {
        open: 0,
        preparing: 0,
        delivered: 0,
        paid: 0,
        cancelled: 0
      },
      mostSells: {
        title: "Most Trending Dishes",
        description: "Discover the most popular and highly rated dishes currently trending.",
        tabs: [
          {
            id: "monthly",
            label: "Monthly",
            active: true,
            items: [
              {
                id: 1,
                title: "Medium Spicy Spaghetti Italiano",
                category: "Spaghetti",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLuyV_ExtmCl2_VqmL_1u2FmDNBO813EUhlQ&s",
                serving: "Serves for 4 Person",
                preparationTime: "24mins",
                price: "$12.56"
              },
            ]
          },
          {
            id: "weekly",
            label: "Weekly",
            active: false,
            items: [
              {
                id: 2,
                title: "Pizza Meal for Kids (Small size)",
                category: "MAIN COURSE",
                imageUrl: "../../../assets/img/pic4.jpg",
                serving: "Serves for 4 Person",
                preparationTime: "24mins",
                price: "$5.67"
              },
            ]
          },
          {
            id: "hourly",
            label: "Today",
            active: false,
            items: [
              {
                id: 3,
                title: "Another Item",
                category: "Category",
                imageUrl: "path/to/image.jpg",
                serving: "Serves for X Person",
                preparationTime: "X mins",
                price: "$X.XX"
              },
            ]
          }
        ],
        loading: false
      },
      topSpendersData: [],
      API: new DashBoardManagementService(),
    };
  },

  methods: {
     
    showTable() {
      this.displayTable=!this.displayTable
    },
    percentageClass(percentage) {
      if (percentage > 0) return 'text-green';
      else if (percentage === 0) return 'text-black';
      else return 'text-red';
    },
   
    percentageIcon(percentage) {
      if (percentage > 0) return 'arrow_upward';
      else if (percentage === 0) return 'drag_handle';
      else return 'arrow_downward';
    },
    cardData() {
      this.API.getDashBoardData().then((res) => {
        this.cards[0].count = res.data.totalMenus;
        this.cards[1].count = res.data.totalRevenue.todayRevenue;
        this.cards[2].count = res.data.totalOrders.todayCount;
        this.cards[3].count = res.data.totalClients.todayCount;
        this.cards[1].percentage = res.data.totalRevenue.percentageChange;
        this.cards[2].percentage = res.data.totalOrders.percentageChange;
        this.cards[3].percentage = res.data.totalClients.percentageChange;
      }).catch(err => {
        console.log(err);
      });
    },
    summaryData(tab) {
      this.tabLoading = true;
      this.API.getDashBoardDataSummaryData(tab).then((res) => {
        this.orderSummary.open = res.data.orderSummary.open || 0;
        this.orderSummary.preparing = res.data.orderSummary.preparing || 0;
        this.orderSummary.delivered = res.data.orderSummary.delivered || 0;
        this.orderSummary.paid = res.data.orderSummary.paid || 0;
        this.orderSummary.cancelled = res.data.orderSummary.cancelled || 0;
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        this.tabLoading = false;
      });
    },
    handleTabChange(tab) {
      this.activeTab = tab.id;
      this.tabs.forEach(t => {
        t.disabled = t.id !== tab.id;
      });
      this.summaryData(tab.id);
    },
    handleRevenueTabChange(tab) {
      this.revenueActiveTab = tab.id;
      this.RevenueTabs.forEach(t => {
        t.disabled = t.id !== tab.id;
      });
      this.revenueData(tab.id);
    },
    revenueData(tab) {
  this.revenueTabLoading = true;
  this.API.getDashBoardRevenueData(tab)
    .then((res) => {
      let revenueData = [];
      const data = res.data.revenueData;

      for (const [key, value] of Object.entries(data)) {
        let periodLabel = key;
        let formattedPeriod=periodLabel;
        if (tab === 'monthly') {
          formattedPeriod = `${new Date(periodLabel + '-01').toLocaleString('en-us', { month: 'long' })} ${new Date(periodLabel + '-01').getFullYear()}`;
        } else if (tab === 'weekly') {
          let [year, week] = periodLabel.split('-');
          formattedPeriod = `Week ${parseInt(week)}`;
        }
        revenueData.push({ period: formattedPeriod, revenue: value.revenue, orders: value.orders });
      }

      // Sort revenueData by period in chronological order
      revenueData.sort((a, b) => {
        // Assuming 'period' is a string in the format "Month Year" or "Week X"
        let dateA, dateB;
        if (tab === 'monthly') {
          dateA = new Date(`${a.period.split(' ')[0]} 1, ${a.period.split(' ')[1]}`);
          dateB = new Date(`${b.period.split(' ')[0]} 1, ${b.period.split(' ')[1]}`);
        } else if (tab === 'weekly') {
          // Extract week number and compare numerically
          dateA = parseInt(a.period.split(' ')[1]);
          dateB = parseInt(b.period.split(' ')[1]);
        }
        return dateA - dateB;
      });
      if (tab === 'daily' || tab === 'hourly') {
        revenueData.reverse();
      }


      // Assign sorted revenueData to respective properties based on tab
      if (tab === 'hourly') {
        this.hourlyRevenueData = revenueData;
      } else if (tab === 'daily') {
        this.dailyRevenueData = revenueData;
      } else if (tab === 'weekly') {
        this.weeklyRevenueData = revenueData;
      } else if (tab === 'monthly') {
        this.monthlyRevenueData = revenueData;
      }

      // console.log(`${tab} Revenue Data:`, this.dailyRevenueData); // Log the sorted data

    })
    .catch(err => {
      console.error('Error fetching revenue data:', err);
    })
    .finally(() => {
      this.revenueTabLoading = false;
    });
},
    handleCustomerTabChange(tab) {
      this.customerActiveTab = tab.id;
      this.tabs.forEach(t => {
        t.disabled = t.id !== tab.id;
      });
      this.customerData(tab.id);
    },
    customerData(tab) {
      this.customerTabLoading = true;
      this.API.getDashBoardCustomerMapData(tab).then((res) => {
        const topCustomersData = res.data.topCustomers.map(customer => ({
          name: customer.name,
          amountSpent: customer.totalSpent,
          numberOfOrders: customer.orderCount
        }));
        this.topSpendersData = topCustomersData;
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        this.customerTabLoading = false;
      });
    }
  },
  computed: {
    totalOrders() {
      return Object.values(this.orderSummary).reduce((sum, value) => sum + value, 0);
    },
    percentages() {
      if (this.totalOrders === 0) {
        return {
          open: 0,
          preparing: 0,
          delivered: 0,
          paid: 0,
          cancelled: 0
        };
      }
      return {
        open: ((this.orderSummary.open / this.totalOrders) * 100).toFixed(2),
        preparing: ((this.orderSummary.preparing / this.totalOrders) * 100).toFixed(2),
        delivered: ((this.orderSummary.delivered / this.totalOrders) * 100).toFixed(2),
        paid: ((this.orderSummary.paid / this.totalOrders) * 100).toFixed(2),
        cancelled: ((this.orderSummary.cancelled / this.totalOrders) * 100).toFixed(2),
      };
    },
    progressValues() {
      return {
        open: this.orderSummary.open / this.totalOrders,
        preparing: this.orderSummary.preparing / this.totalOrders,
        delivered: this.orderSummary.delivered / this.totalOrders,
        paid: this.orderSummary.paid / this.totalOrders,
        cancelled: this.orderSummary.cancelled / this.totalOrders,
      };
    },
    formattedCount() {
      let count = this.cards[1].count;
      if (count >= 1000000) {
        return (count / 1000000).toFixed(2) + "M";
      } else {
        return (count / 1000).toFixed(2) + "K";
      }
    },
    aggregatedHourlyRevenueData() {
      const aggregatedData = [
        { period: '0-8', revenue: 0, orders: 0 },
        { period: '9:00', revenue: 0, orders: 0 },
        { period: '10:00', revenue: 0, orders: 0 },
        { period: '11:00', revenue: 0, orders: 0 },
        { period: '12:00', revenue: 0, orders: 0 },
        { period: '13:00', revenue: 0, orders: 0 },
        { period: '14:00', revenue: 0, orders: 0 },
        { period: '15:00', revenue: 0, orders: 0 },
        { period: '16:00', revenue: 0, orders: 0 },
        { period: '17:00', revenue: 0, orders: 0 },
        { period: '18:00', revenue: 0, orders: 0 },
        { period: '19:00', revenue: 0, orders: 0 },
        { period: '20:00', revenue: 0, orders: 0 },
        { period: '21-24', revenue: 0, orders: 0 },
      ];

      this.hourlyRevenueData.forEach(item => {
        const hour = parseInt(item.period.split(':')[0]);
        if (hour >= 0 && hour < 9) {
          aggregatedData[0].revenue += item.revenue;
          aggregatedData[0].orders += item.orders;
        } else if (hour >= 9 && hour < 21) {
          aggregatedData[hour - 8].revenue += item.revenue;
          aggregatedData[hour - 8].orders += item.orders;
        } else if (hour >= 21 && hour <= 23) {
          aggregatedData[13].revenue += item.revenue;
          aggregatedData[13].orders += item.orders;
        }
      });

      return aggregatedData;
    }
  }
};
</script>

<style scoped>
.skeleton-loader {
  width: 100%;
  background-color: #f3f3f3;
  padding: 20px;
  border-radius: 5px;
}

.skeleton-block {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  margin-bottom: 40px;
  margin-right: 10px;
}

.skeleton-heading {
  width: 50%;
}

.skeleton-btn {
  width: 100px;
}

.skeleton-pie-chart {
  height: 200px;
}

.skeleton-progress-bar {
  width: 80%;
}

.skeleton-order-summary {
  height: 100px;
}

.text-green {
  color: green;
}

.text-black {
  color: black;
}

.text-red {
  color: red;
}

.card {
  margin-bottom: 1.875rem;
  background-color: #fff;
  transition: all 0.5s ease-in-out;
  position: relative;
  border: 0px solid transparent;
  border-radius: 20px;
  box-shadow: 0px 12px 23px 0px rgba(62, 73, 84, 0.04);

  height: calc(100% - 45px);
}

.box-shadow {
  box-shadow: 0px 12px 23px 0px rgba(62, 73, 84, 0.04);
}

.card-body {
  padding: 1.875rem;
}

.p-4 {
  padding: 0.5rem !important;
}

.widget-stat .media {
  padding: 0px 0;
  align-items: center;
}

.media {
  display: flex;
  align-items: flex-start;
}

.widget-stat .media>span {
  height: 85px;
  width: 85px;
  border-radius: 50px;
  padding: 10px 12px;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #464a53;
}

@media only screen and (max-width: 1400px) {
  .widget-stat .media>span {
    height: 70px;
    width: 70px;
    min-width: 70px;
  }
}

.bgl-primary {
  background: #f4f6fd;
  border-color: #f4f6fd;
}

.text-primary {
  color: #2f4cdd !important;
}

.media-body {
  flex: 1;
}

.widget-stat .media .media-body h3 {
  font-size: 35px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

.text-black {
  color: #000 !important;
}

.mb-0,
.my-0 {
  margin-bottom: 0 !important;
}

.widget-stat .media .media-body p {
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
}

small,
.small {
  font-size: 80%;
  font-weight: 400;
}

small {
  font-size: 80%;
}

.mr-3,
.mx-3 {
  margin-right: 1rem !important;
}

.image {
  width: 100%;
  height: 400px;
  object-fit: fill;
  margin-bottom: 25px;
}

.card-header:first-child {
  border-radius: calc(0.75rem - 1px) calc(0.75rem - 1px) 0 0;
}

.card-header {
  border-color: #ffffff;
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
  background-color: rgba(0, 0, 0, 0.0);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
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

ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 1rem;
}

.nav-tabs .nav-item {
  margin-bottom: -1px;
}

li {
  list-style: none;
}

.pb-0,
.py-0 {
  padding-bottom: 0 !important;
}

.border-0 {
  border: 0 !important;
}

.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.0);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.card-tabs .nav-tabs .nav-link {
  border-radius: 6px;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 14px;
  border: 0;
}

.nav-tabs .nav-link {
  border: 1px solid transparent;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
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

h4,
.h4 {
  font-size: 1.125rem;
}

.d-flex {
  display: flex !important;
}

.order-manage {
  background: #e7faec;
  border-radius: 12px;
}

.p-3 {
  padding: 1rem !important;
}

.mb-4,
.my-4 {
  margin-bottom: 1.5rem !important;
}

.align-items-center {
  align-items: center !important;
}

.btn {
  padding: 0.938rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 1rem;
}

@media only screen and (max-width: 1400px) {
  .btn {
    padding: 0.625rem 1rem;
    font-size: 0.813rem;
  }
}

.fs-22 {
  font-size: 22px !important;
  line-height: 1.5;
}

.pl-4,
.px-4 {
  padding-left: 1.5rem !important;
}

.pr-4,
.px-4 {
  padding-right: 1.5rem !important;
}

.pb-1,
.py-1 {
  padding-bottom: 0.25rem !important;
}

.pt-1,
.py-1 {
  padding-top: 0.25rem !important;
}

.mr-3,
.mx-3 {
  margin-right: 1rem !important;
}

.btn-success {
  color: #fff;
  background-color: #2bc155;
  border-color: #2bc155;
}

.btn {
  display: inline-block;
  font-weight: 400;
  color: #7e7e7e;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.75rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

a {
  color: #7e7e7e;
}

a {
  color: #2f4cdd;
  text-decoration: none;
  background-color: transparent;
}

.font-w500 {
  font-weight: 500;
}

.text-primary {
  color: #2f4cdd !important;
}

.ml-auto,
.mx-auto {
  margin-left: auto !important;
}

.fs-15 {
  font-size: 14px !important;
  line-height: 1.5;
}

.text-success {
  color: #2bc155 !important;
}

.ml-1,
.mx-1 {
  margin-left: 0.25rem !important;
}

.fa {
  display: inline-block;
  font: normal normal normal 14px / 1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.mb-4,
.my-4 {
  margin-bottom: 1.5rem !important;
}

.col-1,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-10,
.col-11,
.col-12,
.col,
.col-auto,
.col-sm-1,
.col-sm-2,
.col-sm-3,
.col-sm-4,
.col-sm-5,
.col-sm-6,
.col-sm-7,
.col-sm-8,
.col-sm-9,
.col-sm-10,
.col-sm-11,
.col-sm-12,
.col-sm,
.col-sm-auto,
.col-md-1,
.col-md-2,
.col-md-3,
.col-md-4,
.col-md-5,
.col-md-6,
.col-md-7,
.col-md-8,
.col-md-9,
.col-md-10,
.col-md-11,
.col-md-12,
.col-md,
.col-md-auto,
.col-lg-1,
.col-lg-2,
.col-lg-3,
.col-lg-4,
.col-lg-5,
.col-lg-6,
.col-lg-7,
.col-lg-8,
.col-lg-9,
.col-lg-10,
.col-lg-11,
.col-lg-12,
.col-lg,
.col-lg-auto,
.col-xl-1,
.col-xl-2,
.col-xl-3,
.col-xl-4,
.col-xl-5,
.col-xl-6,
.col-xl-7,
.col-xl-8,
.col-xl-9,
.col-xl-10,
.col-xl-11,
.col-xl-12,
.col-xl,
.col-xl-auto,
.col-xxl-1,
.col-xxl-2,
.col-xxl-3,
.col-xxl-4,
.col-xxl-5,
.col-xxl-6,
.col-xxl-7,
.col-xxl-8,
.col-xxl-9,
.col-xxl-10,
.col-xxl-11,
.col-xxl-12,
.col-xxl,
.col-xxl-auto {
  position: relative;
  /* width: 100%; */
  padding-right: 15px;
  padding-left: 15px;
}

@media (min-width: 576px) {
  .col-sm-4 {
    flex: 0 0 33.3333333333%;
    max-width: 33.3333333333%;
  }
}

.rounded-xl {
  border-radius: 12px !important;
}

.pl-3,
.px-3 {
  padding-left: 1rem !important;
}

.pb-3,
.py-3 {
  padding-bottom: 1rem !important;
}

.pr-3,
.px-3 {
  padding-right: 1rem !important;
}

.pt-3,
.py-3 {
  padding-top: 1rem !important;
}

.border {
  border: 1px solid #eeeeee !important;
}

.font-w600 {
  font-weight: 600;
}

.fs-20 {
  font-size: 20px !important;
  line-height: 1.25;
}

.fs-12 {
  font-size: 12px !important;
  line-height: 1.25;
}

h2,
.h2 {
  font-size: 1.875rem;
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

p {
  display: block;
  /* margin-block-start: 1em;
  margin-block-end: 1em; */
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  unicode-bidi: isolate;
}

@media only screen and (min-width: 1200px) and (max-width: 1600px) {
  .col-xxl-8 {
    flex: 0 0 66.6666666667%;
    max-width: 66.6666666667%;
  }
}

.pl-0,
.px-0 {
  padding-left: 0 !important;
}

.pr-0,
.px-0 {
  padding-right: 0 !important;
}

@media (min-width: 1200px) {
  .col-xl-9 {
    flex: 0 0 75%;
    max-width: 75%;
  }
}

@media (min-width: 992px) {
  .col-lg-8 {
    flex: 0 0 66.6666666667%;
    max-width: 66.6666666667%;
  }
}

@media (min-width: 576px) {
  .col-sm-8 {
    flex: 0 0 66.6666666667%;
    max-width: 66.6666666667%;
  }
}

.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.align-items-center {
  align-items: center !important;
}

.d-flex {
  display: flex !important;
}

.mt-3,
.my-3 {
  margin-top: 1rem !important;
}

.fs-14 {
  font-size: 14px !important;
  line-height: 1.5;
}

.pl-0,
.px-0 {
  padding-left: 0 !important;
}

.pr-0,
.px-0 {
  padding-right: 0 !important;
}

.mr-2,
.mx-2 {
  margin-right: 0.5rem !important;
}

.mb-0,
.my-0 {
  margin-bottom: 0 !important;
}

.col-4 {
  flex: 0 0 33.3333333333%;
  max-width: 33.3333333333%;
}

.text-right {
  text-align: right !important;
}

.ml-auto,
.mx-auto {
  margin-left: auto !important;
}

.pl-0,
.px-0 {
  padding-left: 0 !important;
}

.pr-0,
.px-0 {
  padding-right: 0 !important;
}

.col-1 {
  flex: 0 0 8.3333333333%;
  max-width: 8.3333333333%;
}

.sub-title {
  font-size: 14px !important;
}
</style>
