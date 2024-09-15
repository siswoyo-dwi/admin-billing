<template>
  <div class="grid">
    <div class="col-12 lg:col-12 xl:col-12">
      <div class="card mb-0">
        <DataTable 
          class="p-datatable"
          tableStyle="min-width: 50rem" 
          :value="items" 
          paginator 
          :rows="$store.state.pagination.row" 
          :rowsPerPageOptions="$store.state.pagination.perPage"
          v-model:filters="filters"
        >
          <template #header>
            <div class="flex justify-content-end">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Search" />
              </span>
            </div>
          </template>
          <Column field="no" header="No" class="text-center" style="width: 0px">
            <template #body="{ index }">
              {{1 + index}}
            </template>
          </Column>
          <Column field="nama_unit" header="Nama unit" class="" style=""></Column>
          <Column field="nama_ps" header="PS" class="" style=""></Column>
          <Column field="nama_paket" header="Paket" class="" style=""></Column>
          <Column field="kalkulasi_biaya" header="Biaya" class="" style=""></Column>
          <Column field="jam_mulai" header="Start" class="" style=""></Column>
          <Column field="jam_selesai" header="End" class="" style=""></Column>

          <Column field="actions" header="" bodyClass="text-center" style="width: 0px">
            <template #body="{ data }">
              <div class="flex sm:flex-row">
                <div class="m-1">
                  <ModalUpdate  v-if="data.pendapatan_id" @refresh="getData()" :data="data" :list_unit="items" />
                  <ModalRegister v-else @refresh="getData()" :data="data"  :list_paket="list_paket"/>
                </div>
                <div class="m-1">
                  <ModalDelete  v-if="data.pendapatan_id&&data.status == 2 " @refresh="getData()" :data="data"/>
                  <ModalSelesai  v-else-if="data.pendapatan_id" @refresh="getData()" :data="data"/>

                </div>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import ModalRegister from './modalRegister'
import ModalUpdate from './modalUpdate'
import ModalDelete from './modalDelete'
import ModalSelesai from './modalSelesai'

export default {
  components: {
    ModalRegister,
    ModalUpdate,
    ModalSelesai,
    ModalDelete
  },
  data() {
    return {
      items: [],
      list_unit: [],
      list_ps: [],
      list_paket: [],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  async mounted() {
    const vm = this
    vm.getData()
    vm.startAutoUpdate(); // Memulai interval auto-update

  },
  methods: {
    async getData(){
      const vm = this
      const res = await vm.$axios.post('pendapatan/list_billing')
      vm.items = []
      if(res.data.status == 200){
          for (let i = 0; i < res.data.data[0].length; i++) {
            
            res.data.data[0][i].kalkulasi_biaya = res.data.data[0][i].harga_paket
            if (res.data.data[0][i].mulai) {
              res.data.data[0][i].jam_mulai= this.$moment(res.data.data[0][i].mulai ).format('M-D-YYYY  H:mm:ss')
            }
            if (res.data.data[0][i].selesai) {
              res.data.data[0][i].jam_selesai = this.$moment(res.data.data[0][i].selesai ).format('M-D-YYYY  H:mm:ss')
            }
            vm.items.push(res.data.data[0][i])
            console.log(res.data.data[0][i]);
            
          }
      }
      const ps = await vm.$axios.post('ps/list')
      vm.list_ps = []
      if(ps.data.status == 200){
        for (let i = 0; i <  ps.data.data[0].length; i++) {
          vm.list_ps.push({label:ps.data.data[0][i].nama_ps,value:ps.data.data[0][i].ps_id}) 
        }
      }
      const paket = await vm.$axios.post('paket/list')      
      vm.list_paket = []
      if(paket.data.status == 200){
        for (let i = 0; i <  paket.data.data.length; i++) {
          paket.data.data[i].value=paket.data.data[i].paket_id
          paket.data.data[i].label=`${paket.data.data[i].nama_paket} = ${paket.data.data[i].harga_paket}/${paket.data.data[i].time>=60?paket.data.data[i].time/60+'Jam':paket.data.data[i].time+'Menit'}`
          vm.list_paket.push(paket.data.data[i]) 
        }
      }      
    },
    calculatePrice(jam_mulai, harga_paket) {
      // Hitung selisih waktu dalam menit antara jam_mulai dan waktu sekarang
      const sekarang = this.$moment()
      const mulai = this.$moment(jam_mulai);
      const selisihMenit = sekarang.diff(mulai, 'minutes');      
      // Hitung harga berdasarkan selisih waktu dan harga paket
      return selisihMenit * harga_paket;
    },
    startAutoUpdate() {
      // Perbarui harga setiap 1 menit (60.000 ms)
      this.intervalId = setInterval(() => {
        this.items.forEach(item => {          
          if (item.jam_mulai&&item.nama_paket=='Reguler') {
            item.kalkulasi_biaya = this.calculatePrice(item.mulai, item.harga_paket);
          }else{
            item.kalkulasi_biaya = item.harga_paket
          }          
        });
      }, 6000);
    }
  },
};
</script>