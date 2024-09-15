<template>
          <Toast />

  <div class="">
    <Button 
      label=""
      class=""
      size="small"
      severity="warning"
      icon="pi pi-pencil"
      @click="openModal()"
      v-tooltip.left="`Pindah Unit`"
    />
    <Dialog v-model:visible="visible" :modal="true" class="p-fluid" header="Pindah Unit" :breakpoints="{ '960px': '80vw' }" :style="{ width: '50vw' }" @hide="hideModal()">
      <div class="" style="">
        <div class="flex flex-column gap-2">
          <label for="unit_id">unit</label>
          <Dropdown id="inventoryStatus"   optionValue="unit_id"    v-model="dataForm.unit_id"  :options="list_unit" optionLabel="nama_unit" placeholder="Pilih unit" 
          class="w-full"    :class="{'p-invalid': v$.dataForm.$invalid && afterSubmit}"/>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-content-end">
          <Button 
            label="Save"
            class=""
            size="small"
            :disabled="!isValid && !isDirty"
            v-tooltip.left="`save`"
            @click="submit()"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
  props: [ 'data' ,'list_unit'],
  emits: [ 'refresh' ],
  components: {
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      visible: false,
      dataForm: {
        unit: null,
      },
    };
  },
  computed: {
    isValid() {
      return !this.v$.dataForm.$invalid;
    },
    isDirty() {
      return this.v$.dataForm.$anyDirty;
    },
  },
  validations () {
    return {
      dataForm: {
        unit_id: { required },
      }
    }
  },
  mounted() {
  },
  methods: {
    openModal(){
      const vm = this
      vm.visible = true
      vm.dataForm = JSON.parse(JSON.stringify(vm.data))
      vm.v$.$reset();
    },
    hideModal(){
      const vm = this
      vm.visible = false
    },
    async submit(){
      const vm = this
      const res = await vm.$axios.post('pendapatan/update', vm.dataForm)
      console.log(res.data);
      
      if(res.data.status == 200){
        vm.visible = false
        vm.$emit('refresh')
        vm.$toast.add({ severity: 'success', summary: 'Konfirmasi', detail: 'Berhasil Pindah Paket', life: 3000 });
      }else{
        vm.visible = false
        vm.$toast.add({ severity: 'error', summary: 'Konfirmasi', detail: 'Gagal Pindah Paket', life: 3000 });
      }
    },
  },
};
</script>