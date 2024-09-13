<template>
  <div class="grid">
    <div class="col-12 lg:col-12 xl:col-12">
      <div class="card mb-0">
        <ModalRegister v-if="list_ps.length" @refresh="getData()" :list_ps="list_ps"/>
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
          <Column field="nama_ps" header="nama_ps" class="" style=""></Column>
          <Column field="actions" header="" bodyClass="text-center" style="width: 0px">
            <template #body="{ data , list_ps}">
              <div class="flex sm:flex-row">
                <div class="m-1">
                  <ModalUpdate  @refresh="getData()" :data="data" :list_ps="list_ps"/>
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
      list_ps: [],
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
      const res = await vm.$axios.post('unit/list')
      if(res.data.status == 200){
        vm.items = res.data.data
        console.log(vm.items)

      }
      const ps = await vm.$axios.post('ps/list')
      if(ps.data.status == 200){
        for (let i = 0; i <  ps.data.data[0].length; i++) {
          vm.list_ps.push({label:ps.data.data[0][i].nama_ps,value:ps.data.data[0][i].ps_id}) 

        }
      }
    }
  },
};
</script>