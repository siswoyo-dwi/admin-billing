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
          <Column field="harga_paket" header="Biaya" class="" style=""></Column>
          <Column field="jam_mulai" header="Start" class="" style=""></Column>
          <Column field="jam_selesai" header="End" class="" style=""></Column>

          <Column field="actions" header="" bodyClass="text-center" style="width: 0px">
            <template #body="{ data }">
              <div class="flex sm:flex-row">
                <div class="m-1">
                  <ModalUpdate  v-if="data.pendapatan_id" @refresh="getData()" :data="data" :list_unit="list_unit" :list_ps="list_ps" :list_paket="list_paket"/>
                  <ModalRegister v-else @refresh="getData()" :data="data"  :list_unit="list_unit" :list_ps="list_ps" :list_paket="list_paket"/>
                </div>
                <div class="m-1">
                  <ModalDelete  @refresh="getData()" :data="data"/>
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
export default {
  components: {
    ModalRegister,
    ModalUpdate,
    ModalDelete,
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
  },
  methods: {
    async getData(){
      const vm = this
      const res = await vm.$axios.post('pendapatan/list_billing')
      vm.list_unit = []
      if(res.data.status == 200){
          for (let i = 0; i < res.data.data[0].length; i++) {
            if (res.data.data[0][i].mulai) {
              res.data.data[0][i].jam_mulai = this.$moment(res.data.data[0][i].mulai ).format('MMMM Do YYYY, H:mm:ss')
            }
            if (res.data.data[0][i].selesai) {
              res.data.data[0][i].jam_selesai = this.$moment(res.data.data[0][i].selesai ).format('MMMM Do YYYY, H:mm:ss')
            }
            vm.items.push(res.data.data[0][i])
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
      console.log(paket.data.data );

      if(paket.data.status == 200){
        for (let i = 0; i <  paket.data.data.length; i++) {
          paket.data.data[i]
          paket.data.data[i].value=paket.data.data[i].paket_id
          paket.data.data[i].label=`${paket.data.data[i].nama_paket} = ${paket.data.data[i].harga_paket}/${paket.data.data[i].time/60}Jam`
          vm.list_paket.push(paket.data.data[i]) 
        }
      }      
    }
  },
};
</script>