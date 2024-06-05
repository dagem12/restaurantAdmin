<template>
    <div style="padding:1%;">
        <div class="form-head d-flex mb-3 align-items-start">
            <div class="mr-auto d-none d-lg-block">
                <h2 class="text-black font-w600 mb-0">Order ID #5552351</h2>

            </div>

        </div>
        <div class="col-xl-9 col-xxl-9 col-lg-12 col-md-12">
            <div class="row">
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-body pt-2">
                            <div class="table-responsive ">
                                <table class="table items-table">
                                    <tbody>
                                        <tr>
                                            <th class="my-0 text-black font-w500 fs-20">Items</th>
                                            <th style="width:10%;" class="my-0 text-black font-w500 fs-20">Qty</th>
                                            <th style="width:10%;" class="my-0 text-black font-w500 fs-20">Price</th>
                                            <th class="my-0 text-black font-w500 fs-20">Total Price</th>
                                            <th></th>
                                        </tr>
                                        <tr v-for="order in orderItems" :key="order.id">
                                            <td style>
                                                <div class="media">
                                                    <img class="mr-3 img-fluid rounded" width="85" src=""
                                                        alt="DexignZone">
                                                    <div class="media-body">

                                                        <h5 class="mt-0 mb-2 text-black mb-4">{{ order.name }}</h5>
                                                        <div class="star-review fs-14">
                                                            <i class="fa fa-star text-orange"></i>
                                                            <i class="fa fa-star text-orange"></i>
                                                            <i class="fa fa-star text-orange"></i>
                                                            <i class="fa fa-star text-gray"></i>
                                                            <i class="fa fa-star text-gray"></i>
                                                            <span class="ml-3 text-dark">451 reviews</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h4 class="my-0 text-secondary font-w600">{{ order.quantitiy }}x</h4>
                                            </td>
                                            <td>
                                                <h4 class="my-0 text-secondary font-w600">Birr{{ order.unitPrice }}</h4>
                                            </td>
                                            <td>
                                                <h4 class="my-0 text-secondary font-w600">Birr{{ order.totalPrice }}
                                                </h4>
                                            </td>
                                            <td>
                                                <a href="#" class="ti-close fs-28 text-danger las la-times-circle"></a>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>
<script>


export default {
    components: {

    },
    data() {
        return {
            orderItems: [
                {
                    "id": 1,
                    "name": "Chicken curry special with cucumber",
                    "quantitiy": 2,
                    "unitPrice": 230,
                    "totalPrice": 560
                },
                {
                    "id": 2,
                    "name": "Burger",
                    "quantitiy": 2,
                    "unitPrice": 230,
                    "totalPrice": 560
                },
                {
                    "id": 3,
                    "name": "BurgerSpecial special with cucumber",
                    "quantitiy": 2,
                    "unitPrice": 230,
                    "totalPrice": 560
                },
                {
                    "id": 4,
                    "name": "Pizza special with cucumber",
                    "quantitiy": 2,
                    "unitPrice": 230,
                    "totalPrice": 560
                },
                {
                    "id": 5,
                    "name": "Chikencn special with cucumber",
                    "quantitiy": 2,
                    "unitPrice": 230,
                    "totalPrice": 560
                }
            ]

        };
    },
};
</script>
<style scoped>
@media only screen and (min-width: 1200px) and (max-width: 1600px) {
    .col-xxl-9 {
        flex: 0 0 75%;
        max-width: 75%;
    }
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}

@media (min-width: 1200px) {
    .col-xl-12 {
        flex: 0 0 100%;
        max-width: 100%;
    }
}

.card {
    margin-bottom: 1.875rem;
    background-color: #fff;
    transition: all .5s ease-in-out;
    position: relative;
    border: 0px solid transparent;
    border-radius: 20px;
    box-shadow: 0px 12px 23px 0px rgba(62, 73, 84, 0.04);
    height: calc(100% - 30px);
}

.card-body {
    padding: 1.875rem;
}

.pt-2,
.py-2 {
    padding-top: 0.5rem !important;
}

.card-body {
    flex: 1 1 auto;
    padding: 1.25rem;
}

.table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.table {
    width: 100%;
    margin-bottom: 1rem;
    color: #7e7e7e;
}

table {
    border-collapse: collapse;
}

tbody {
    display: table-row-group;
    vertical-align: middle;
    unicode-bidi: isolate;
    border-color: inherit;
}

.items-table tbody tr {
    padding: 0;
    border-radius: 0.375rem;
    position: relative;
    box-shadow: 0 1px 0 0 #f8f8f8;
    -webkit-transition: all 0.5s;
    -ms-transition: all 0.5s;
    transition: all 0.5s;
}

.items-table tbody tr th,
.items-table tbody tr td {
    border: 0;
    padding: 10px 8px;
}

.table th,
.table td {
    border-color: #f0f1f5;
    padding: 12px 9px;
    width: 100%;
}

.table th,
.table td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #EEEEEE;
    width: 100% !important;
}

.font-w500 {
    font-weight: 500;
}

.mr-auto,
.mx-auto {
    margin-right: auto !important;
}

@media (min-width: 992px) {
    .d-lg-block {
        display: block !important;
    }
}

.font-w600 {
    font-weight: 600;
}

.text-black {
    color: #000 !important;
}

.mb-0,
.my-0 {
    margin-bottom: 0 !important;
}

h2 {
    font-size: 1.5rem !important;
    line-height: 1.5rem !important;
    letter-spacing: -0.00833em;
}

h4 {
    font-size: 1.125rem !important;
    line-height: 1.5rem !important;
    letter-spacing: 0.00735em;
}

.items-table tbody tr {
    padding: 0;
    border-radius: 0.375rem;
    position: relative;
    -webkit-box-shadow: 0 1px 0 0 #f8f8f8;
    box-shadow: 0 1px 0 0 #f8f8f8;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
}

tr {
    display: table-row;
    vertical-align: inherit;
    unicode-bidi: isolate;
    border-color: inherit;
}

.items-table tbody tr {
    padding: 0;
    border-radius: 0.375rem;
    position: relative;
    box-shadow: 0 1px 0 0 #f8f8f8;
    -webkit-transition: all 0.5s;
    -ms-transition: all 0.5s;
    transition: all 0.5s;
}

.items-table tbody tr th,
.items-table tbody tr td {
    border: 0;
    padding: 18px 8px;
}

.table th,
.table td {
    border-color: #f0f1f5;
    padding: 12px 9px;
}

.table th,
.table td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #EEEEEE;
}
</style>
