<template>
  <div class="grid">
    <div class="col-12 lg:col-12 xl:col-12">
      <div class="card mb-0">
        <ModalRegister/>
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
          <Column field="nama" header="Nama" class="" style=""></Column>
          <Column field="kode" header="Kode" class="" style=""></Column>
          <Column field="actions" header="" bodyClass="text-center" style="width: 0px">
            <template #body="{ data }">
              <div class="flex sm:flex-row">
                <div class="m-1">
                  <ModalUpdate :data="data"/>
                </div>
                <div class="m-1">
                  <ModalDelete :data="data"/>
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
import ModalRegister from './modalRegister.vue'
import ModalUpdate from './modalUpdate.vue'
import ModalDelete from './modalDelete.vue'
export default {
  components: {
    ModalRegister,
    ModalUpdate,
    ModalDelete,
  },
  data() {
    return {
      items: [],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      // filters: {},
    };
  },
  async mounted() {
    const vm = this
    for (let i = 1; i <= 100; i++) {
      vm.items.push({no: i, nama: 'nama ' + i, kode: 'kode ' + i})
    }
  },
  methods: {
  },
};
</script>