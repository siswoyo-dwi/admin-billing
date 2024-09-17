<template>
            <Toast />

  <div class="grid">
    <div class="col-12 lg:col-12 xl:col-12">
      <div class="card mb-0">
        <ModalRegister @refresh="getData()" />
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
          <Column field="no_nota" header="No Nota" class="" style=""></Column>
          <Column field="atas_nama" header="Atas Nama" class="" style=""></Column>
          <Column field="total" header="Total" class="" style=""></Column>
          <Column field="actions" header="" bodyClass="text-center" style="width: 0px">
            <template #body="{ data }">
              <div class="flex sm:flex-row">
                <div class="m-1">
                  <ModalRegisterPembelian  @refresh="getData()" :data="data" :list_jajan="list_jajan" />
                </div>
                <div class="m-1">
                  <ModalUpdate  @refresh="getData()" :data="data"/>
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
import ModalRegisterPembelian from './modalRegisterPembelian'
import ModalUpdate from './modalUpdate'
import ModalDelete from './modalDelete'
export default {
  components: {
    ModalRegister,
    ModalUpdate,
    ModalDelete,
    ModalRegisterPembelian
  },
  data() {
    return {
      items: [],
      list_jajan:[],
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
      const res = await vm.$axios.post('nota/list')
      // console.log(res)
      if(res.data.status == 200){
        vm.items = res.data.data[0]
      }
      const res2 = await vm.$axios.post('jajan/list')
      // console.log(res2)
      if(res2.data.status == 200){
        vm.list_jajan = res2.data.data[0]
      }
    }
  },
};
</script>